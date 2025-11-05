import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedGridBg = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const squares = containerRef.current.querySelectorAll(".grid-square");

    squares.forEach((square) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 4 });

      tl.to(square, {
        opacity: gsap.utils.random(0.1, 0.55),
        duration: gsap.utils.random(1, 3),
        ease: "power2.inOut",
      }).to(square, {
        opacity: 0,
        duration: gsap.utils.random(1, 3),
        ease: "power2.inOut",
      });
    });
  }, []);

  const rows = 12;
  const cols = 18;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 grid justify-center items-center max-h-screen overflow-hidden z-[-1]"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="grid-square aspect-square bg-[#251a0e] border border-[#2d2d2d] opacity-0"
        />
      ))}
    </div>
  );
};

export default AnimatedGridBg;
