import React, { useRef, useState } from "react";
import AnimatedSplitText from "./AnimatedSplitText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// useGSAP(() => {
//   const container = containerRef.current;
//   const cards = cardsRef.current;

//   if (!container || !cards.length) return;

//   cards.forEach((card, idx) => {
//     if (!card) return;
//     if (idx < cards.length) {
//       let endTrigger;

//       if (idx === 0 && cards[idx + 3]) {
//         endTrigger = cards[idx + 3];
//       } else if ((idx === 2 || idx === 3) && cards[idx + 1]) {
//         endTrigger = cards[idx + 1];
//       } else if (cards[idx + 2]) {
//         endTrigger = cards[idx + 2];
//       } else {
//         endTrigger = cards[cards.length - 1];
//       }

//       ScrollTrigger.create({
//         trigger: card,
//         start: "top 10%",
//         endTrigger: endTrigger,
//         end: "top 10%",
//         pin: true,
//         pinSpacing: false,
//         scrub: false,
//       });
//     }
//   });

//   // Pin the last card until its bottom leaves the container
//   const lastIdx = cards.length;
//   if (cards[lastIdx]) {
//     ScrollTrigger.create({
//       trigger: cards[lastIdx],
//       start: "top 10%",
//       end: () => {
//         // End when the last card's bottom reaches the container's bottom
//         if (!container || !cards[lastIdx]) return "bottom bottom";
//         const containerRect = container.getBoundingClientRect();
//         const lastCardRect = cards[lastIdx]!.getBoundingClientRect();
//         // The offset from the last card's top to its bottom within the container
//         const offset =
//           lastCardRect.height - (containerRect.bottom - lastCardRect.top);
//         // If offset is negative, just use the height
//         return `+=${Math.max(lastCardRect.height, offset)}`;
//       },
//       pin: true,
//       pinSpacing: true,
//       scrub: false,
//     });
//   }

//   // Cleanup triggers on unmount
//   return () => {
//     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   };
// });

const features = [
  {
    title: "Design-First Thinking",
    description:
      "We don't just edit, we elevate. Our dedicated design team ensures your brand stands out with visuals that build recall and authority.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bgPattern: "concentric-circles",
  },
  {
    title: "Performance-Obsessed",
    description:
      "We're driven by metrics. Every edit is optimized for engagement, retention, and impact, not just delivery.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L12 22"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bgPattern: "l-shapes",
  },
  {
    title: "Built for Independence",
    description:
      "With streamlined SOPs and clear workflows, we reduce your dependency and slash turnaround times.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L12 22"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
          stroke="url(#gradient3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bgPattern: "triangle-waves",
  },
  {
    title: "Quality Without Compromise",
    description:
      "From motion to 3D, our high-quality animation and post systems bring your storytelling to life sharper, stronger, smarter.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L12 22"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bgPattern: "grid-circles",
  },
];

// const getBgPattern = (pattern: string) => {
//   switch (pattern) {
//     case "concentric-circles":
//       return (
//         <div className="absolute right-0 top-2/4 -translate-y-1/2 z-[-1]">
//           <svg
//             width="120"
//             viewBox="0 0 124 246"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M123.499 207.368C76.6276 207.368 38.6309 169.371 38.6309 122.5C38.6309 75.6294 76.6276 37.6326 123.499 37.6326"
//               fill="#181818"
//             />
//             <path
//               d="M28.877 122.5C28.877 70.2446 71.2422 27.8794 123.498 27.8794"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.498 217.121C71.2422 217.121 28.877 174.756 28.877 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M28.877 122.5C28.877 70.2446 71.2422 27.8794 123.498 27.8794"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.498 217.121C71.2422 217.121 28.877 174.756 28.877 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M20.1426 122.5C20.1426 65.4183 66.4182 19.1426 123.5 19.1426"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.5 225.858C66.4182 225.858 20.1426 179.582 20.1426 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M20.1426 122.5C20.1426 65.4183 66.4182 19.1426 123.5 19.1426"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.5 225.858C66.4182 225.858 20.1426 179.582 20.1426 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M11.4434 122.5C11.4434 60.6102 61.6112 10.4424 123.501 10.4424"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.501 234.558C61.6112 234.558 11.4434 184.39 11.4434 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M2 122.5C2 55.3989 56.3989 1 123.5 1"
//               stroke="#282828"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M123.5 244C56.3989 244 2 189.601 2 122.5"
//               stroke="#282828"
//               stroke-width="4"
//               stroke-miterlimit="10"
//             />
//           </svg>
//         </div>
//       );
//     case "l-shapes":
//       return (
//         <div className="absolute right-0 top-0 z-[-1]">
//           <svg
//             width="180"
//             viewBox="0 0 209 197"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M122.412 81.1022V0H36.752V81.1022V162.204H122.412H208.071V81.1022H122.412Z"
//               fill="#1F1F1F"
//             />
//             <path
//               d="M174.818 197H0V31.4832H89.1582V112.585H174.818V197ZM3.49846 193.688H171.319V115.898H85.6597V34.7955H3.49846V193.688Z"
//               fill="#272727"
//             />
//             <path
//               d="M140.342 0.877686H135.129V71.2645H140.342V0.877686Z"
//               fill="#181818"
//             />
//             <path
//               d="M153.617 0.861328H148.404V71.2482H153.617V0.861328Z"
//               fill="#181818"
//             />
//             <path
//               d="M166.877 0.877686H161.664V71.2645H166.877V0.877686Z"
//               fill="#181818"
//             />
//             <path
//               d="M180.137 0.877686H174.924V71.2645H180.137V0.877686Z"
//               fill="#181818"
//             />
//             <path
//               d="M193.396 0.861328H188.184V71.2482H193.396V0.861328Z"
//               fill="#181818"
//             />
//             <path
//               d="M206.497 0.877686H201.441V71.2645H206.497V0.877686Z"
//               fill="#181818"
//             />
//           </svg>
//         </div>
//       );
//     case "triangle-waves":
//       return (
//         <div className="absolute right-0 top-2/4 -translate-y-1/2 z-[-1]">
//           <svg
//             width="210"
//             viewBox="0 0 276 157"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M252.006 128.521L228.582 151.831L205.144 128.521L181.72 151.831L158.297 128.521L137.637 149.082L116.963 128.521L93.5389 151.831L70.1007 128.521L46.6768 151.831L23.2529 128.521L0 151.66L2.59316 154.254L23.2529 133.694L46.6768 157.003L70.1007 133.694L93.5389 157.003L116.963 133.694L137.637 154.268L158.297 133.694L181.72 157.003L205.144 133.694L228.582 157.003L252.006 133.694L272.68 154.254L275.259 151.66L252.006 128.521Z"
//               fill="#353535"
//             />
//             <path
//               d="M252.009 86.8457L228.585 110.156L205.147 86.8457L181.723 110.156L158.299 86.8457L139.719 105.34L139.705 110.526L158.299 92.0178L181.723 115.328L205.147 92.0178L228.585 115.328L252.009 92.0178L272.683 112.578L275.262 109.97L252.009 86.8457Z"
//               fill="#252525"
//             />
//             <path
//               d="M173 -0.00341797V54.9966H229V-0.00341797H173ZM221.203 47.3392H180.797V7.65392H221.203V47.3392Z"
//               fill="#252525"
//             />
//             <path
//               d="M31.0278 59.9966L31 87.9966L54 74.0112L31.0278 59.9966Z"
//               fill="#1B1B1B"
//             />
//             <path
//               d="M63.0428 44.9966L63 102.997L113 74.0396L63.0428 44.9966ZM70.8482 58.6217L97.3465 74.0253L70.8339 89.3858L70.8482 58.6217Z"
//               fill="#353535"
//             />
//           </svg>
//         </div>
//       );
//     case "grid-circles":
//       return (
//         <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[-1]">
//           <svg
//             width="160"
//             viewBox="0 0 179 246"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M30.13 11H18V23.13H30.13V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M52.5695 11H40.4395V23.13H52.5695V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M74.9991 11H62.8691V23.13H74.9991V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M97.4406 11H85.3105V23.13H97.4406V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M119.87 11H107.74V23.13H119.87V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M142.3 11H130.17V23.13H142.3V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M164.739 11H152.609V23.13H164.739V11Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M30.13 30.79H18V42.92H30.13V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M52.5695 30.79H40.4395V42.92H52.5695V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M74.9991 30.79H62.8691V42.92H74.9991V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M97.4406 30.79H85.3105V42.92H97.4406V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M119.87 30.79H107.74V42.92H119.87V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M142.3 30.79H130.17V42.92H142.3V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M164.739 30.79H152.609V42.92H164.739V30.79Z"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//             />
//             <path
//               d="M18 1H30.13"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//               stroke-linecap="square"
//             />
//             <path
//               d="M40.4395 1H52.5594"
//               stroke="#2D2D2D"
//               stroke-width="2"
//               stroke-miterlimit="10"
//               stroke-linecap="square"
//             />
//             <path
//               d="M0 168.514L1.10702 168.365C3.71178 187.659 12.3912 205.157 26.1964 218.962C47.5834 240.349 78.0219 249.27 107.614 242.814L107.856 243.912C77.8916 250.452 47.0717 241.419 25.415 219.762C11.4237 205.771 2.64197 188.049 0 168.514Z"
//               fill="#202020"
//             />
//             <path
//               d="M25.4062 93.1709C60.3007 58.2764 117.084 58.2764 151.979 93.1709C186.873 128.065 186.873 184.849 151.979 219.744L151.188 218.953C185.645 184.496 185.645 128.419 151.188 93.9616C116.731 59.5043 60.6542 59.5043 26.1969 93.9616C15.7872 104.371 8.08452 117.293 3.94481 131.321L2.875 131.005C7.07052 116.8 14.8569 103.72 25.4062 93.1709Z"
//               fill="#202020"
//             />
//             <path
//               d="M69.9277 77.7935C97.4824 71.2444 125.874 79.282 145.875 99.2828L144.294 100.864C124.851 81.4216 97.2405 73.6073 70.4487 79.9704L69.9277 77.7935Z"
//               fill="#202020"
//             />
//             <path
//               d="M31.517 99.2825C37.787 93.0125 44.9501 87.8588 52.8295 83.9609L53.8249 85.9703C46.1687 89.7565 39.201 94.7707 33.1077 100.864C4.46468 129.507 2.1483 174.737 27.7122 206.078L25.9819 207.492C-0.32622 175.267 2.05528 128.744 31.517 99.2825Z"
//               fill="#202020"
//             />
//             <path
//               d="M42.6916 220.237C57.6597 231.065 76.107 236.256 94.638 234.861C113.364 233.447 130.993 225.354 144.287 212.06C155.013 201.334 162.371 187.854 165.543 173.082C169.246 155.872 167.05 137.713 159.357 121.954L161.366 120.968C169.283 137.173 171.544 155.844 167.729 173.547C164.464 188.738 156.901 202.599 145.859 213.632C132.184 227.307 114.053 235.633 94.7868 237.084C75.7349 238.517 56.7573 233.177 41.3613 222.042L42.6916 220.237Z"
//               fill="#202020"
//             />
//             <path
//               d="M47.3978 115.163C70.1708 92.3897 107.224 92.3897 129.997 115.163C139.216 124.382 144.965 136.066 146.621 148.96L144.397 149.248C142.797 136.847 137.271 125.619 128.406 116.754C106.507 94.855 70.8778 94.855 48.9792 116.754C45.0907 120.642 41.8161 125.042 39.23 129.833L37.2578 128.773C39.9463 123.777 43.3511 119.209 47.3978 115.163Z"
//               fill="#202020"
//             />
//             <path
//               d="M30.3448 153.899L32.5868 153.992C31.8984 169.695 37.88 185.063 48.9781 196.17C56.8017 203.994 66.6347 209.287 77.4258 211.483L76.9793 213.678C65.7602 211.39 55.5273 205.883 47.3967 197.752C35.8427 186.207 29.6285 170.225 30.3448 153.899Z"
//               fill="#202020"
//             />
//             <path
//               d="M95.0723 212.265C107.798 210.813 119.324 205.25 128.404 196.18C136.358 188.226 141.697 178.198 143.828 167.193L146.023 167.621C143.809 179.063 138.265 189.492 129.985 197.762C120.543 207.204 108.561 212.981 95.3234 214.488L95.0723 212.265Z"
//               fill="#202020"
//             />
//             <path
//               d="M54.4856 122.26C60.0486 116.697 66.9327 112.539 74.3934 110.241L74.719 111.311C67.4257 113.562 60.6998 117.618 55.2671 123.051C40.2711 138.047 37.1082 161.378 47.5737 179.788L46.5969 180.337C35.8988 161.49 39.1361 137.61 54.4856 122.26Z"
//               fill="#202020"
//             />
//             <path
//               d="M88.6816 108.092C101.603 108.092 113.752 113.125 122.897 122.26C141.754 141.117 141.754 171.807 122.897 190.663C104.04 209.52 73.3507 209.52 54.4941 190.663L55.2849 189.872C73.7042 208.292 103.687 208.292 122.106 189.872C140.526 171.453 140.526 141.47 122.106 123.051C113.176 114.12 101.315 109.209 88.6909 109.209V108.092H88.6816Z"
//               fill="#202020"
//             />
//             <path
//               d="M67.416 135.192C79.1467 123.461 98.2359 123.461 109.967 135.192C121.697 146.922 121.697 166.012 109.967 177.742L108.385 176.161C119.241 165.304 119.241 147.639 108.385 136.773C97.5289 125.917 79.8631 125.917 69.0068 136.773C58.1505 147.629 58.1505 165.295 69.0068 176.151L67.4253 177.733C55.6853 166.002 55.6853 146.922 67.416 135.192Z"
//               fill="#202020"
//             />
//             <path
//               d="M78.1157 145.889C83.9485 140.056 93.4372 140.056 99.2607 145.889L98.47 146.68C93.0744 141.284 84.302 141.284 78.9064 146.68C73.5108 152.076 73.5108 160.848 78.9064 166.244C84.302 171.639 93.0744 171.639 98.47 166.244C101.465 163.248 102.907 159.118 102.433 154.904L103.549 154.773C104.061 159.322 102.498 163.797 99.2607 167.034C93.4279 172.867 83.9392 172.867 78.1157 167.034C72.2922 161.201 72.2922 151.722 78.1157 145.889Z"
//               fill="#202020"
//             />
//           </svg>
//         </div>
//       );
//     default:
//       return null;
//   }
// };

const WhyWorkWithUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray(cardsRef.current);
    const newCards = cards.slice(1);

    // Animate each card with increasing yPercent: -100, -200, -300, etc.
    // newCards.forEach((card, i) => {
    //   gsap.to(card as any, {
    //     yPercent: -(100 * (i + 1)),
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: containerRef.current,
    //       start: "top top",
    //       end: "bottom bottom",
    //       pin: true,
    //       scrub: true,
    //     },
    //   });
    // });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      // pin: imageWrapperRef.current,
      scrub: true,
      // animation: animation,
    });
  }, []);

  return (
    <section className="relative py-20 px-4 md:px-8 pt-20 md:pt-50 border border-red-500" ref={containerRef}>
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src="/assets/shapes/Grid 5.png"
          alt=""
          className="w-full object-cover opacity-80"
        />
      </div>

      <div className="mx-0 md:mx-5 lg:mx-8 xl:mx-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-3">
            <AnimatedSplitText
              className="text-4xl lg:text-5xl text-white font-semibold leading-tight"
              type="chars"
              stagger={0.01}
              duration={1}
              tag="h2"
            >
              Why Work With <span className="text-[#FF8C00]">BeeBuzz?</span>
            </AnimatedSplitText>
            <AnimatedSplitText
              className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-lg"
              type="lines"
              stagger={0.03}
              duration={1}
              tag="p"
            >
              Execution isn't a service for us, it's our product. In less than a
              year, BeeBuzz has delivered. We're not warming up. We're already
              in the game, producing campaigns, videos, and visual assets
              weekly.
            </AnimatedSplitText>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {features.map((feature, index) => {

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) {
                      cardsRef.current[index] = el;
                    }
                  }}
                  className="relative bg-[#101010] backdrop-blur-sm rounded-lg min-h-[250px] flex items-center p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col items-start space-y-4">
                    {/* <div className="flex-shrink-0 mt-1">
                      <svg
                        width="45"
                        viewBox="0 0 59 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.9062 7.375C10.4613 7.375 8.11646 8.34626 6.38761 10.0751C4.65876 11.804 3.6875 14.1488 3.6875 16.5938V42.4062C3.6875 44.8512 4.65876 47.196 6.38761 48.9249C8.11646 50.6537 10.4613 51.625 12.9062 51.625H29.5C29.989 51.625 30.458 51.4307 30.8037 51.085C31.1495 50.7392 31.3438 50.2702 31.3438 49.7812C31.3438 49.2923 31.1495 48.8233 30.8037 48.4775C30.458 48.1318 29.989 47.9375 29.5 47.9375H12.9062C11.4393 47.9375 10.0324 47.3547 8.99507 46.3174C7.95776 45.2801 7.375 43.8732 7.375 42.4062V22.125H51.625V31.3438C51.625 31.8327 51.8193 32.3017 52.165 32.6475C52.5108 32.9932 52.9798 33.1875 53.4688 33.1875C53.9577 33.1875 54.4267 32.9932 54.7725 32.6475C55.1182 32.3017 55.3125 31.8327 55.3125 31.3438V16.5938C55.3125 14.1488 54.3412 11.804 52.6124 10.0751C50.8835 8.34626 48.5387 7.375 46.0938 7.375H12.9062ZM12.9062 16.5938C13.3952 16.5938 13.8642 16.3995 14.21 16.0537C14.5557 15.708 14.75 15.239 14.75 14.75C14.75 14.261 14.5557 13.792 14.21 13.4463C13.8642 13.1005 13.3952 12.9062 12.9062 12.9062C12.4173 12.9062 11.9483 13.1005 11.6025 13.4463C11.2568 13.792 11.0625 14.261 11.0625 14.75C11.0625 15.239 11.2568 15.708 11.6025 16.0537C11.9483 16.3995 12.4173 16.5938 12.9062 16.5938ZM18.4375 16.5938C18.9265 16.5938 19.3955 16.3995 19.7412 16.0537C20.087 15.708 20.2812 15.239 20.2812 14.75C20.2812 14.261 20.087 13.792 19.7412 13.4463C19.3955 13.1005 18.9265 12.9062 18.4375 12.9062C17.9485 12.9062 17.4795 13.1005 17.1338 13.4463C16.788 13.792 16.5938 14.261 16.5938 14.75C16.5938 15.239 16.788 15.708 17.1338 16.0537C17.4795 16.3995 17.9485 16.5938 18.4375 16.5938V16.5938ZM25.8125 14.75C25.8125 15.239 25.6182 15.708 25.2725 16.0537C24.9267 16.3995 24.4577 16.5938 23.9688 16.5938C23.4798 16.5938 23.0108 16.3995 22.665 16.0537C22.3193 15.708 22.125 15.239 22.125 14.75C22.125 14.261 22.3193 13.792 22.665 13.4463C23.0108 13.1005 23.4798 12.9062 23.9688 12.9062C24.4577 12.9062 24.9267 13.1005 25.2725 13.4463C25.6182 13.792 25.8125 14.261 25.8125 14.75Z"
                          fill="url(#paint0_linear_56_18)"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M46.0945 36.875C45.6055 36.875 45.1366 37.0693 44.7908 37.415C44.445 37.7608 44.2508 38.2298 44.2508 38.7188C44.2508 39.2077 44.445 39.6767 44.7908 40.0225C45.1366 40.3682 45.6055 40.5625 46.0945 40.5625H49.6345L45.4584 45.7803L41.1459 44.344C40.8211 44.236 40.4726 44.2205 40.1395 44.2993C39.8063 44.3781 39.5017 44.5481 39.2598 44.7902L35.5722 48.4777C35.2364 48.8255 35.0506 49.2912 35.0548 49.7746C35.059 50.258 35.2529 50.7205 35.5947 51.0623C35.9366 51.4042 36.399 51.5981 36.8824 51.6023C37.3658 51.6065 37.8316 51.4206 38.1793 51.0848L41.0611 48.203L45.5119 49.6872C45.8697 49.8064 46.2554 49.8131 46.6171 49.7063C46.9787 49.5995 47.2989 49.3843 47.5345 49.0898L51.6258 43.9181V46.0938C51.6258 46.5827 51.82 47.0517 52.1658 47.3975C52.5116 47.7432 52.9805 47.9375 53.4695 47.9375C53.9585 47.9375 54.4275 47.7432 54.7733 47.3975C55.119 47.0517 55.3133 46.5827 55.3133 46.0938V38.7188C55.3133 38.2298 55.119 37.7608 54.7733 37.415C54.4275 37.0693 53.9585 36.875 53.4695 36.875H46.0945Z"
                          fill="white"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_56_18"
                            x1="40.7125"
                            y1="17.3476"
                            x2="21.0007"
                            y2="46.988"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#9DE8EE" />
                            <stop offset="0.0001" stop-color="#9DE8EE" />
                            <stop offset="0.490049" stop-color="#FA7C0B" />
                            <stop offset="1" stop-color="#9F8CED" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div> */}
                    <div className="flex-1 max-w-3/4 md:max-w-2/3">
                      <h3 className="text-2xl font-medium text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 text-sm font-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {/* {getBgPattern(feature.bgPattern)} */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
