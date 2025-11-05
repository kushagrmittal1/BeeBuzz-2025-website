import React, { useRef, useEffect } from "react";
import AnimatedSplitText from "./AnimatedSplitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactPlayer from "react-player";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  image: string;
  type: "image" | "video";
  title: string;
  hasSocialUI?: boolean;
  socialName?: string;
  projectLink?: string;
  orientation?: "horizontal" | "vertical";
}

const Row1Data: PortfolioItem[] = [
  {
    id: 1,
    image: "https://www.youtube.com/watch?v=1v9jAoy2Owo",
    type: "video",
    title: "Urban Company Native Water Purifier Advertisement",
    projectLink: "",
    orientation: "horizontal",
  },
  {
    id: 2,
    image: "https://www.youtube.com/shorts/KbfgjgZSMTk",
    type: "video",
    title: "Bombay Shaving Company Performance Marketing Video-1",
    orientation: "vertical",
  },
  {
    id: 3,
    image: "https://www.youtube.com/watch?v=EZLgmZKaqks",
    type: "video",
    title: "Building a ₹17 Cr Brand from Scratch | Kapil Thirani x Yogesh Jain | One in a Billion | Ep 1",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
  {
    id: 4,
    image: "https://www.youtube.com/watch?v=E1FjgufU9qg",
    type: "video",
    title: "Building AI Infrastructure from India for the World: Insights from Simplismart | Decoding AI Ep 3",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
  {
    id: 5,
    title:"1Finance 2008 Financial Crisis",
    image: "https://www.youtube.com/watch?v=nO_vgT_ZyJg",
    type: "video",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
  {
    id: 6,
    image: "https://www.youtube.com/watch?v=kndwM2PJ_Vc",
    type: "video",
    title: "Will Quick Commerce KILL India’s Kirana Stores? Experts Reveal | Manav Garg | Ep 4",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
  {
    id: 7,
    image: "https://www.youtube.com/watch?v=-lc-McHgs-Y",
    type: "video",
    title: "TNP | Ep. 01 | All things D2C ft. Ghazal, Chaitanya & Minu with ‪@tanmaybhat‬",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
  {
    id: 8,
    image: "https://www.youtube.com/watch?v=zpopRhUvvrI",
    type: "video",
    title: "Why Millionaires are skipping 5-star hotels for this",
    projectLink: "https://www.google.com",
    orientation: "horizontal",
  },
];

const Row2Data: PortfolioItem[] = [
  {
    id: 1,
    image: "https://www.youtube.com/watch?v=mg57lxiJDLE",
    type: "video",
    title: "4 STEPS to Buy the Perfect Car: | Don’t Make These Mistakes! | CAR Affordability Guide",
    orientation: "horizontal",
  },
  {
    id: 2,
    image: "https://www.youtube.com/shorts/_qXxDEbbxYE",
    type: "video",
    title: "Is your money losing value because of inflation? ABCD #shorts",
    projectLink: "https://www.google.com",
    orientation: "vertical",
  },
  {
    id: 3,
    image: "https://www.youtube.com/watch?v=nO_vgT_ZyJg",
    type: "video",
    title: "1Finance 2008 Financial Crisis",
    orientation: "horizontal",
  },{
    id: 4,
    image: "https://www.youtube.com/watch?v=V4uRwzUbiu0",
    type: "video",
    title: "Maximize Your Rewards: Credit Card Tips for 2025 | InvestEd by FYERS",
    orientation: "horizontal",
  }
];

const PortfolioSection: React.FC = () => {
  const portfolioRowRefs = useRef<Array<HTMLDivElement | null>>([]);



  const row1 = Row1Data.slice(0, 3);
  const row2 = Row1Data.slice(3, 6);
  const row3 = Row1Data.slice(6, 9);

  // Animate all rows from y axis, but trigger all on first row
  useEffect(() => {
    const rows = portfolioRowRefs.current;
    if (!rows[0]) return;

    gsap.set(rows, { opacity: 0, y: 80 });

    gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: rows[0],
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const PortfolioRow: React.FC<{
    items: PortfolioItem[];
    // direction: "left" | "right";
    rowIndex: number;
  }> = ({ items, direction, rowIndex }) => {
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
      <div
        className="relative flex overflow-hidden w-full mb-4"
        ref={el => {
          portfolioRowRefs.current[rowIndex] = el;
        }}
      >
        <div className={`whitespace-nowrap`}>
          {duplicatedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0 mx-2">
                <div className={`relative h-40 lg:h-80 rounded-lg overflow-hidden bg-gray-800 ${item.orientation === "horizontal" ? "w-full" : "w-45"}`}>
                <a href={item.projectLink} className="h-full w-full flex items-center justify-center bg-black">
                  {item.type === "image" ? (
                    <img className="h-full w-full object-cover" src={item.image} alt={item.alt} />
                  ) : (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      src={item.image}
                      controls={false}
                      // playing={true}
                      muted={true}
                      loop={true}
                      // light={true} 
                      style={{ aspectRatio: "16/9", width: "100%", height: "100%", pointerEvents: "none" }}
                      config={{
                        youtube: {
                          playerVars: {
                            // Set quality to 720p if possible
                            vq: "hd720"
                          }
                        }
                      }}
                    />
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* <div
          className={`flex animate-marquee-${direction} whitespace-nowrap absolute top-0`}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`duplicate-${item.id}-${index}`}
              className="flex-shrink-0 mx-2"
            >
              <div className="relative h-40 lg:h-80  rounded-lg overflow-hidden bg-gray-800">
              <a href={item.projectLink}>
                  {item.type === "image" ? (
                    <img className="h-full w-full object-cover" src={item.image} alt={item.alt} />
                  ) : (
                    <ReactPlayer className="h-full w-[500px] object-cover" src={item.image} playing={true} />
                  )}
                </a>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    );
  };

  return (
    <div className="w-full py-10 md:py-20 mt-8 md:mt-15 mb-40">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSplitText
            className="max-w-[320px] lg:max-w-4xl mx-auto text-2xl md:text-5xl lg:text-5xl text-white tracking-tight leading-[1.2] mb-6"
            type="lines"
            stagger={0.02}
            duration={1}
            tag="h2"
          >
            We turn simple ideas into bold content.
            Then make it go viral, fast.
          </AnimatedSplitText>
        </div>

        {/* Portfolio Grid with Infinite Scroll */}
        <div className="mb-12">
          {/* Row 1 - Slides Left */}
          <PortfolioRow items={Row1Data} direction="left" rowIndex={0} />

          {/* Row 2 - Slides Right */}
          <PortfolioRow items={row2} direction="right" rowIndex={1} />

          {/* Row 3 - Slides Left */}
          <PortfolioRow items={row3} direction="left" rowIndex={2} />
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className=" text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-full border border-white/50  hover:bg-gray-200 transition-colors">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
