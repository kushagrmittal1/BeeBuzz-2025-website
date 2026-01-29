import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePreloader } from "../contexts/PreloaderContext";

export default function PreloaderNew() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setPreloaderComplete, setPreloaderActive } = usePreloader();

  useEffect(() => {
    // Disable scroll when preloader starts
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    const preloader = preloaderRef.current;

    if (!video || !preloader) return;

    // Handle video end event
    const handleVideoEnd = () => {
      // Animate preloader to y: -100%
      gsap.to(preloader, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          setPreloaderComplete(true);
          setPreloaderActive(false);
          // Re-enable scroll when preloader completes
          document.body.style.overflow = 'unset';
        },
      });
    };

    video.addEventListener("ended", handleVideoEnd);

    // Cleanup function
    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      document.body.style.overflow = 'unset';
    };
  }, [setPreloaderComplete, setPreloaderActive]);

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed top-0 left-0 w-full h-full z-[99999999] bg-[#000000] overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          src="/assets/videos/preloader/BeeBuzz logo 16x9 animation alpha(Transparent BG)_1.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
