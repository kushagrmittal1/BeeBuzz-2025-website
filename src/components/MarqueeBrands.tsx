import React, { useRef } from "react";
import AnimatedSplitText from "./AnimatedSplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Brand {
  logo: string;
}

const brands: Brand[] = [
  { logo: "/assets/brandslogo/BeeBuzz Logos 01.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 02.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 03.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 04.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 05.png" },
  // { logo: "/assets/brandslogo/BeeBuzz Logos 06.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 07.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 08.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 09.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 10.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 11.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 12.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 13.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 14.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 15.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 16.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 17.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 18.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 19.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 20.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 21.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 22.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 23.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 24.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 25.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 26.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 27.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 28.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 29.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 30.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 31.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 32.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 33.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 34.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 35.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 36.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 37.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 38.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 39.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 40.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 41.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 42.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 43.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 44.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 45.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 46.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 47.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 48.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 49.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 50.png" },
  { logo: "/assets/brandslogo/BeeBuzz Logos 51.png" },

];

const MarqueeBrands: React.FC = () => {
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);

  // Divide brands in 2 for both rows
  const half = Math.ceil(brands.length / 2);
  const brandsRow1 = brands.slice(0, half);
  const brandsRow2 = brands.slice(half);

  const repeatedBrandsRow1 = [...brandsRow1, ...brandsRow1];
  const repeatedBrandsRow2 = [...brandsRow2, ...brandsRow2];

  const SLOW_DURATION = 200;

  useGSAP(
    () => {
      const elLeft = marqueeLeftRef.current;
      if (elLeft) {
        const totalWidth = elLeft.scrollWidth / 2;
        gsap.fromTo(
          elLeft,
          { x: 0 },
          {
            x: -totalWidth,
            duration: SLOW_DURATION,
            ease: "linear",
            repeat: -1,
          }
        );
      }

      const elRight = marqueeRightRef.current;
      if (elRight) {
        const totalWidth = elRight.scrollWidth / 2;
        gsap.fromTo(
          elRight,
          { x: -totalWidth },
          {
            x: 0,
            duration: SLOW_DURATION,
            ease: "linear",
            repeat: -1,
          }
        );
      }
    },
    { dependencies: [] }
  );

  return (
    <div className="w-full bg-black py-16 overflow-hidden">
      <div className="text-center mb-12">
        <AnimatedSplitText
          className="text-lg md:text-2xl lg:text-3xl text-white tracking-tight"
          type="chars"
          stagger={0.01}
          duration={1}
          tag="h2"
        >
          Where the World's Leaders Collaborate
        </AnimatedSplitText>
      </div>

      {/* Marquee Left (Row 1) */}
      <div className="relative flex overflow-x-hidden mb-4 lg:mb-8 select-none">
        <div
          className="flex whitespace-nowrap"
          ref={marqueeLeftRef}
          style={{ willChange: "transform" }}
        >
          {repeatedBrandsRow1.map((brand, idx) => (
            <div key={`left-${idx}`} className="flex items-center lg:mx-6 mx-2 w-25 lg:w-30">
              <img
                src={brand.logo}
                alt=""
                className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Right (Row 2) */}
      <div className="relative flex overflow-x-hidden select-none">
        <div
          className="flex whitespace-nowrap"
          ref={marqueeRightRef}
          style={{ willChange: "transform" }}
        >
          {repeatedBrandsRow2.map((brand, idx) => (
            <div key={`right-${idx}`} className="flex items-center lg:mx-6 mx-2 w-25 lg:w-30">
              <img
                src={brand.logo}
                alt=""
                className="w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBrands;
