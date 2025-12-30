import AnimatedGridBg from "../components/AnimatedGridBg";
import MarqueeBrands from "../components/MarqueeBrands";
import WhatWeDo from "../components/WhatWeDo";
import WhyWorkWithUs from "../components/WhyWorkWithUs";
import Footer from "../components/Footer";
import Cta from "../components/Cta";
import SEO from "../components/SEO";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import CountUp from "react-countup";
import { PortfolioNew } from "../components/PortfolioNew";
import { usePreloader } from "../contexts/PreloaderContext";

export default function HomePage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLAnchorElement>(null);
  const heroStatsRef = useRef<HTMLDivElement[]>([]);
  const { isPreloaderComplete } = usePreloader();

  useGSAP(() => {
    // Only run animations when preloader is complete
    if (!isPreloaderComplete) return;

    // document.body.style.overflow = "hidden";

    const splitTitle = new SplitText(heroTextRef.current, {
      type: "words",
    });
    const splitDesc = new SplitText(heroDescRef.current, {
      type: "lines",
    });

    gsap.set([splitTitle.words, splitDesc.lines, heroBtnRef.current], {
      opacity: 0,
      y: 100,
      filter: "blur(10px)",
    });

    gsap.set(heroStatsRef.current, {
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.to(splitTitle.words, {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: "expo.out",
      stagger: 0.02,
      filter: "blur(0px)",
    });

    gsap.to(splitDesc.lines, {
      y: 0,
      stagger: 0.03,
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.8,
      ease: "expo.out",
    });

    gsap.to(heroBtnRef.current, {
      y: 0,
      delay: 0.2,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "expo.out",
    });

    gsap.to(heroStatsRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.2,
      stagger: 0.05,
      filter: "blur(0px)",
      duration: 1,
      ease: "expo.out",
    });
  }, [isPreloaderComplete]);

  return (
    <div className="relative ">
      <SEO
        title="BeeBuzz - BeeBuzz | Execution-First Media | Post, 3D & AI Video Systems"
        description="Execution partners for brands who care about conversions, not just creatives. We partner with startups, brands, and VCs to build video systems across post, 3D, and AI that drive real performance."
        keywords="video production, creative agency, post production, 3D animation, AI video, brand videos, startup videos, marketing videos, video marketing, creative services, video systems, BeeBuzz"
        url="https://beebuzz.co.in"
      />
      <div className="absolute inset-0 z-[-1]">
        <AnimatedGridBg />
      </div>

      <main className="relative mt-20 md:mt-0 z-10 flex flex-col items-center justify-center min-h-[100svh] px-8 text-center">
        <h1
          ref={heroTextRef}
          className="text-3xl md:text-6xl lg:text-[4.3vw] text-[#FFF7EA] max-w-6xl tracking-tight mb-4 md:mb-8"
        >
          Execution partners for brands who care about conversions, not just
          creatives.
        </h1>

        <p
          ref={heroDescRef}
          className="text-xs md:text-base text-white/70 max-w-2xl leading-relaxed mb-6 md:mb-12"
        >
          We partner with startups, brands, and VCs build video systems across
          post, 3D, and AI that don't just look good, but drive real
          performance.
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd4h0aDIi5hdXQzFDwWiNagrhRvYzgalKylhy7bhsVGIREvgg/viewform?usp=publish-editor"
          target="_blank"
          ref={heroBtnRef}
          className="bg-orange-500 text-sm md:text-base px-4 md:px-10 py-2 md:py-3 rounded-full text-white hover:bg-orange-600 transition-colors mb-8 cursor-pointer"
        >
          Book a call
        </a>

        <div className="relative mt-10 md:mt-0 md:absolute bottom-8 md:bottom-30 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4 md:gap-5 w-full md:w-auto justify-center items-center">
          <div
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                heroStatsRef.current[0] = el;
              }
            }}
            className="border border-white/20 rounded-full px-4 py-3 flex items-center space-x-3 h-fit min-w-fit"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2748 7.08006C11.3484 7.12268 11.4096 7.18392 11.4521 7.25764C11.4946 7.33136 11.517 7.41496 11.517 7.50006C11.517 7.58516 11.4946 7.66876 11.4521 7.74248C11.4096 7.8162 11.3484 7.87744 11.2748 7.92006L8.226 9.68406C8.15238 9.72666 8.06882 9.74909 7.98376 9.74909C7.8987 9.74909 7.81514 9.72666 7.74151 9.68407C7.66788 9.64147 7.60679 9.58022 7.56439 9.50648C7.52199 9.43274 7.49978 9.34912 7.5 9.26406V5.73606C7.49985 5.65111 7.52208 5.56762 7.56444 5.49398C7.6068 5.42035 7.66781 5.35917 7.74132 5.31659C7.81484 5.27402 7.89826 5.25156 7.98322 5.25147C8.06817 5.25137 8.15164 5.27365 8.22525 5.31606L11.2748 7.08006Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.25 15.75H12.75"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 2.25H3C2.17157 2.25 1.5 2.92157 1.5 3.75V11.25C1.5 12.0784 2.17157 12.75 3 12.75H15C15.8284 12.75 16.5 12.0784 16.5 11.25V3.75C16.5 2.92157 15.8284 2.25 15 2.25Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-white text-xs md:text-sm">
              <CountUp
                delay={isPreloaderComplete ? 0.3 : 4.3}
                duration={3}
                suffix="M+"
                end={250}
              />{" "}
              views
              <span className="min-w-fit"> generated</span>
            </span>
          </div>

          <div
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                heroStatsRef.current[1] = el;
              }
            }}
            className="border border-white/20 rounded-full px-4 py-3 flex items-center space-x-3 h-fit min-w-fit"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8327 17.5V15.8333C15.8327 14.9493 15.4815 14.1014 14.8564 13.4763C14.2312 12.8512 13.3834 12.5 12.4993 12.5H7.49935C6.61529 12.5 5.76745 12.8512 5.14233 13.4763C4.5172 14.1014 4.16602 14.9493 4.16602 15.8333V17.5"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-white text-xs md:text-sm ">
              <CountUp
                delay={isPreloaderComplete ? 0.3 : 4.3}
                duration={3}
                suffix="+"
                end={60}
              />{" "}
              <span className="min-w-fit">clients</span>
            </span>
          </div>

          <div
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                heroStatsRef.current[2] = el;
              }
            }}
            className="border border-white/20 rounded-full px-4 py-3 flex items-center space-x-3 h-fit min-w-fit"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8327 17.5V15.8333C15.8327 14.9493 15.4815 14.1014 14.8564 13.4763C14.2312 12.8512 13.3834 12.5 12.4993 12.5H7.49935C6.61529 12.5 5.76745 12.8512 5.14233 13.4763C4.5172 14.1014 4.16602 14.9493 4.16602 15.8333V17.5"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-white text-xs md:text-sm">
              <CountUp
                delay={isPreloaderComplete ? 0.3 : 4.3}
                duration={3}
                suffix="+"
                end={1000}
              />{" "}
              <span className="min-w-fit">videos created</span>
            </span>
          </div>
        </div>
      </main>

      <MarqueeBrands />

      <WhatWeDo />

      <PortfolioNew />

      <WhyWorkWithUs />

      <Cta />

      <Footer />
    </div>
  );
}
