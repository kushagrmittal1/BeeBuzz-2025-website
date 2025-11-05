import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Example video URLs (replace with your own)
const VIDEO_URLS = [
  [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ],
  [
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ],
  [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ],
];

const ROW_SLIDE_DIRECTIONS = ["right", "left", "right"];

export const NewPreloader = ({ onFinish }: { onFinish?: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const rowRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const overlayRef = useRef<HTMLDivElement>(null);
  const endAnimPlayed = useRef(false);

  useEffect(() => {
    // For each row, create a continuous sliding animation
    rowRefs.forEach((rowRef, idx) => {
      const row = rowRef.current;
      if (!row) return;

      // Get width of one video block
      const videoBlock = row.querySelector(".video-block") as HTMLDivElement;
      if (!videoBlock) return;

      const blockWidth = videoBlock.offsetWidth;
      const numVideos = VIDEO_URLS[idx].length;

      // Duplicate the row's content for seamless looping
      // (If not already duplicated)
      if (row.childElementCount === numVideos) {
        for (let i = 0; i < numVideos; i++) {
          const clone = row.children[i].cloneNode(true);
          row.appendChild(clone);
        }
      }

      // Calculate total width to slide
      const totalWidth = blockWidth * numVideos;

      // Animate
      gsap.to(row, {
        x: ROW_SLIDE_DIRECTIONS[idx] === "right" ? `-=${totalWidth}` : `+=${totalWidth}`,
        duration: 8 + idx * 2,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            // Reset to 0 when past -totalWidth or +totalWidth
            const n = parseFloat(x);
            if (ROW_SLIDE_DIRECTIONS[idx] === "right") {
              return ((n % -totalWidth) || 0) + "px";
            } else {
              return ((n % totalWidth) || 0) + "px";
            }
          }),
        },
      });
    });

    // Overlay text animation
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );

    // End animation after a timeout (simulate loading)
    const timeout = setTimeout(() => {
      if (endAnimPlayed.current) return;
      endAnimPlayed.current = true;
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power2.in",
      });
      // Animate preloader out
      gsap.to(preloaderRef.current, {
        opacity: 0,
        scale: 1.08,
        duration: 0.7,
        delay: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (onFinish) onFinish();
        },
      });
    }, 3200);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black"
      style={{
        width: "100vw",
        height: "100vh",
        pointerEvents: "all",
        overflow: "hidden",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        {VIDEO_URLS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            ref={rowRefs[rowIdx]}
            className="flex flex-row gap-2 w-full justify-center"
            style={{
              width: "100%",
              height: "28vh",
              willChange: "transform",
              position: "relative",
              overflow: "hidden",
              opacity: 1,
            }}
          >
            {row.map((src, colIdx) => (
              <div
                key={colIdx}
                className="video-block overflow-hidden rounded-lg shadow-lg"
                style={{
                  width: "28vw",
                  height: "100%",
                  background: "#181818",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "28vw",
                  maxWidth: "28vw",
                }}
              >
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Overlay text */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-tight"
          style={{
            letterSpacing: "0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.25)",
          }}
        >
          Loading <span className="text-orange-500">BeeBuzz</span>
        </h1>
        <div className="mt-4 w-32 h-2 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full bg-orange-500 animate-pulse" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
};