import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedSplitText from "./AnimatedSplitText";

gsap.registerPlugin(ScrollTrigger);

const getBgPattern = (pattern: string) => {
  switch (pattern) {
    case "concentric-circles":
      return (
        <div className="absolute right-0 top-2/4 -translate-y-1/2 z-[-1]">
          <svg
            width="120"
            viewBox="0 0 124 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M123.499 207.368C76.6276 207.368 38.6309 169.371 38.6309 122.5C38.6309 75.6294 76.6276 37.6326 123.499 37.6326"
              fill="#181818"
            />
            <path
              d="M28.877 122.5C28.877 70.2446 71.2422 27.8794 123.498 27.8794"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.498 217.121C71.2422 217.121 28.877 174.756 28.877 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
            <path
              d="M28.877 122.5C28.877 70.2446 71.2422 27.8794 123.498 27.8794"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.498 217.121C71.2422 217.121 28.877 174.756 28.877 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
            <path
              d="M20.1426 122.5C20.1426 65.4183 66.4182 19.1426 123.5 19.1426"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.5 225.858C66.4182 225.858 20.1426 179.582 20.1426 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
            <path
              d="M20.1426 122.5C20.1426 65.4183 66.4182 19.1426 123.5 19.1426"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.5 225.858C66.4182 225.858 20.1426 179.582 20.1426 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
            <path
              d="M11.4434 122.5C11.4434 60.6102 61.6112 10.4424 123.501 10.4424"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.501 234.558C61.6112 234.558 11.4434 184.39 11.4434 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
            <path
              d="M2 122.5C2 55.3989 56.3989 1 123.5 1"
              stroke="#282828"
              stroke-miterlimit="10"
            />
            <path
              d="M123.5 244C56.3989 244 2 189.601 2 122.5"
              stroke="#282828"
              stroke-width="4"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      );
    case "l-shapes":
      return (
        <div className="absolute right-0 top-0 z-[-1]">
          <svg
            width="180"
            viewBox="0 0 209 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M122.412 81.1022V0H36.752V81.1022V162.204H122.412H208.071V81.1022H122.412Z"
              fill="#1F1F1F"
            />
            <path
              d="M174.818 197H0V31.4832H89.1582V112.585H174.818V197ZM3.49846 193.688H171.319V115.898H85.6597V34.7955H3.49846V193.688Z"
              fill="#272727"
            />
            <path
              d="M140.342 0.877686H135.129V71.2645H140.342V0.877686Z"
              fill="#181818"
            />
            <path
              d="M153.617 0.861328H148.404V71.2482H153.617V0.861328Z"
              fill="#181818"
            />
            <path
              d="M166.877 0.877686H161.664V71.2645H166.877V0.877686Z"
              fill="#181818"
            />
            <path
              d="M180.137 0.877686H174.924V71.2645H180.137V0.877686Z"
              fill="#181818"
            />
            <path
              d="M193.396 0.861328H188.184V71.2482H193.396V0.861328Z"
              fill="#181818"
            />
            <path
              d="M206.497 0.877686H201.441V71.2645H206.497V0.877686Z"
              fill="#181818"
            />
          </svg>
        </div>
      );
    case "triangle-waves":
      return (
        <div className="absolute right-0 top-2/4 -translate-y-1/2 z-[-1]">
          <svg
            width="210"
            viewBox="0 0 276 157"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M252.006 128.521L228.582 151.831L205.144 128.521L181.72 151.831L158.297 128.521L137.637 149.082L116.963 128.521L93.5389 151.831L70.1007 128.521L46.6768 151.831L23.2529 128.521L0 151.66L2.59316 154.254L23.2529 133.694L46.6768 157.003L70.1007 133.694L93.5389 157.003L116.963 133.694L137.637 154.268L158.297 133.694L181.72 157.003L205.144 133.694L228.582 157.003L252.006 133.694L272.68 154.254L275.259 151.66L252.006 128.521Z"
              fill="#353535"
            />
            <path
              d="M70.8482 58.6217L97.3465 74.0253L70.8339 89.3858L70.8482 58.6217Z"
              fill="#353535"
            />
          </svg>
        </div>
      );
    case "grid-circles":
      return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-[-1]">
          <svg
            width="160"
            viewBox="0 0 179 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ...SVG paths... */}
            <path
              d="M30.13 11H18V23.13H30.13V11Z"
              stroke="#2D2D2D"
              stroke-width="2"
              stroke-miterlimit="10"
            />
            {/* ...rest of SVG omitted for brevity... */}
            <path
              d="M78.1157 145.889C83.9485 140.056 93.4372 140.056 99.2607 145.889L98.47 146.68C93.0744 141.284 84.302 141.284 78.9064 146.68C73.5108 152.076 73.5108 160.848 78.9064 166.244C84.302 171.639 93.0744 171.639 98.47 166.244C101.465 163.248 102.907 159.118 102.433 154.904L103.549 154.773C104.061 159.322 102.498 163.797 99.2607 167.034C93.4279 172.867 83.9392 172.867 78.1157 167.034C72.2922 161.201 72.2922 151.722 78.1157 145.889Z"
              fill="#202020"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const features = [
  {
    title: "Design-First Thinking",
    description:
      "We don't just edit, we elevate. Our dedicated design team ensures your brand stands out with visuals that build recall and authority.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="55"
        height="55"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M78.4203 85.9609C80.5029 85.9609 82.1915 84.2726 82.1915 82.1899C82.1915 80.1071 80.5029 78.4187 78.4203 78.4187H40.7087C38.6261 78.4187 36.9375 80.1071 36.9375 82.1899C36.9375 84.2726 38.6261 85.9609 40.7087 85.9609H78.4203Z"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M78.4303 89.6222V85.9711H40.7188V99.7725C40.7188 100.918 41.2396 102.002 42.134 102.717L58.3967 115.727C59.0853 116.278 60.0637 116.278 60.7523 115.727L77.0151 102.717C77.9094 102.002 78.4303 100.918 78.4303 99.7725V96.4681"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M55.7969 85.9605V98.5312"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M63.3359 85.9605V98.5312"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M41.1406 101.492L58.0977 98.1009C59.074 97.9056 60.0795 97.9056 61.056 98.1009L78.0129 101.492"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M51.8359 110.477H67.3006"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.7365 38.4263C23.9562 18.227 40.6173 2.33026 60.8064 3.02C79.4537 3.6578 95.3863 20.0482 95.3863 38.8248C95.3863 50.3894 89.906 60.6724 81.4015 67.2224C79.5319 68.6622 78.416 70.8714 78.416 73.2313V78.4219H40.7045V73.2318C40.7045 70.8696 39.5855 68.6604 37.7145 67.2188C29.1154 60.5932 23.6091 50.1506 23.7365 38.4263Z"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M55.8001 78.4219H48.2578V72.7007C48.2578 71.6948 49.073 70.8796 50.0789 70.8796H53.979C54.9847 70.8796 55.8001 71.6948 55.8001 72.7007V78.4219Z"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M70.8782 78.4219H63.3359V72.7007C63.3359 71.6948 64.1513 70.8796 65.157 70.8796H69.0571C70.0628 70.8796 70.8782 71.6948 70.8782 72.7007V78.4219Z"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M52.0234 70.8828V59.5693"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M67.1172 70.8828V59.5693"
          stroke="white"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M70.8838 19.9733C70.8838 16.849 68.3514 14.3165 65.2271 14.3165C62.103 14.3165 59.5703 16.849 59.5703 19.9733V50.1425C59.5703 55.3493 63.7914 59.5703 68.9983 59.5703C74.205 59.5703 78.4261 55.3493 78.4261 50.1425C78.4261 48.777 78.1336 47.4806 77.6114 46.3089C82.3136 45.7772 85.9686 41.7881 85.9686 36.9435C85.9686 31.7366 81.7475 27.5155 76.5406 27.5155"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M67.1172 25.6326C67.1172 22.5086 69.6496 19.9759 72.7739 19.9759C75.898 19.9759 78.4307 22.5086 78.4307 25.6326C78.4307 26.3397 78.3009 27.0167 78.064 27.6406"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M77.6167 46.3069C77.265 46.3467 76.9074 46.3672 76.5452 46.3672C71.3382 46.3672 67.1172 42.1461 67.1172 36.9394"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M48.2566 19.9733C48.2566 16.849 50.7891 14.3165 53.9134 14.3165C57.0374 14.3165 59.5701 16.849 59.5701 19.9733V50.1425C59.5701 55.3493 55.3491 59.5703 50.1421 59.5703C44.9354 59.5703 40.7144 55.3493 40.7144 50.1425C40.7144 48.777 41.0069 47.4806 41.5291 46.3089C36.8268 45.7772 33.1719 41.7881 33.1719 36.9435C33.1719 31.7366 37.3929 27.5155 42.5999 27.5155"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M59.5679 44.479C59.5679 46.5616 57.8795 48.25 55.7969 48.25"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M63.3413 48.25C61.2587 48.25 59.5703 46.5616 59.5703 44.479"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M52.0323 25.6326C52.0323 22.5086 49.4998 19.9759 46.3755 19.9759C43.2514 19.9759 40.7188 22.5086 40.7188 25.6326C40.7188 26.3397 40.8485 27.0167 41.0855 27.6406"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M41.5234 46.3069C41.8751 46.3467 42.2328 46.3672 42.5949 46.3672C47.8019 46.3672 52.0229 42.1461 52.0229 36.9394"
          stroke="#FF7F00"
          stroke-width="3.7"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    bgPattern: "concentric-circles",
  },
  {
    title: "Performance-Obsessed",
    description:
      "We're driven by metrics. Every edit is optimized for engagement, retention, and impact, not just delivery.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 120 120" fill="none">
      <path d="M52.1094 30.2073V17.7656" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M35.7644 39.8922L25.0312 33.6953" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M69.0703 39.537L79.0395 33.7812" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7721 116.566V96.9501C22.7721 87.0958 21.2648 85.3347 15.1398 77.0179C9.31178 69.1046 6.04688 59.4018 6.04688 49.2911C6.04688 20.2285 29.0722 4.26996 52.1095 2.68404C75.1388 1.10882 98.1483 13.8976 98.1483 42.3194C98.1483 49.9535 106.663 53.2701 110.995 57.6421C114.285 60.9616 113.443 64.831 110.123 66.7655C106.175 69.0655 102.306 70.4832 104.106 77.2636L102.051 80.8861C103.515 82.8199 103.101 85.2358 101.547 87.0441C100.456 91.1541 104.652 94.9244 100.584 98.9939C98.9655 100.614 96.1022 101.765 91.2327 101.765C78.2811 101.765 75.7191 106.504 75.7191 111.921V116.566H22.7721Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8953 65.6119C21.0364 60.6599 19.5312 55.0426 19.5312 49.3246C19.5312 31.3341 34.1154 16.75 52.1059 16.75C70.0963 16.75 84.6805 31.3341 84.6805 49.3246C84.6805 55.0426 83.1753 60.6599 80.3164 65.6119L67.7784 58.3731C69.3669 55.622 70.2031 52.5013 70.2029 49.3246C70.2029 39.3298 62.1007 31.2276 52.1059 31.2276C42.111 31.2276 34.0088 39.3298 34.0088 49.3246C34.0088 52.5013 34.845 55.622 36.4333 58.3731L23.8953 65.6119Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M53.0444 54.4762C55.8891 53.9598 57.7767 51.2351 57.2603 48.3903C56.7439 45.5455 54.0191 43.658 51.1744 44.1744C48.3296 44.6908 46.4421 47.4155 46.9584 50.2603C47.4748 53.1051 50.1996 54.9926 53.0444 54.4762Z" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M55.1641 44.0335L63.8166 29.0469" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    bgPattern: "l-shapes",
  },
  {
    title: "Built for Independence",
    description:
      "With streamlined SOPs and clear workflows, we reduce your dependency and slash turnaround times.",
    icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 120 120" fill="none">
<path d="M31.9487 31.9791L19.8438 19.8516" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.6672 44.4567L10.5625 41.8594" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M44.3972 22.6822L41.8047 10.5547" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M86.9688 87.1094L99.0737 99.2369" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M96.25 74.6328L108.355 77.2302" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M74.5156 96.4062L77.1081 108.534" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M30.7304 54.7656C29.5496 54.9376 28.3746 55.2098 27.2154 55.583C21.7717 57.3353 17.3364 61.1035 14.7268 66.1935L4.91644 85.3271C-0.474191 95.8413 3.67744 108.789 14.1711 114.189C19.2514 116.804 25.0471 117.279 30.4905 115.527C35.9342 113.774 40.3695 110.006 42.9792 104.916L52.7895 85.7825C57.0056 77.559 55.3845 67.8469 49.4571 61.4213L47.8775 60.0509" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.194 71.6562C26.1295 71.7693 26.0672 71.8845 26.0072 72.0015L16.1966 91.1354C14.0004 95.4187 15.6917 100.694 19.9671 102.894C24.2423 105.094 29.5073 103.4 31.7035 99.1159L41.5138 79.9823C41.9392 79.1526 42.2188 78.2859 42.3619 77.4115" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.6634 69.7906L33.8259 44.4531L40.5467 52.4353L51.012 48.0496L43.4919 74.634C42.8595 76.8386 41.4027 78.6674 39.3898 79.784C37.377 80.9006 35.0567 81.1666 32.8563 80.533L32.5485 80.4425C27.9943 79.1311 25.3546 74.3536 26.6634 69.7906Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M87.5744 63.5566C88.788 63.6003 89.7792 63.5559 90.3979 63.3825C95.9042 61.8396 100.48 58.2439 103.281 53.2576L113.813 34.5133C116.615 29.527 117.31 23.7427 115.771 18.2257C114.231 12.7087 110.642 8.1248 105.665 5.31757C100.688 2.51057 94.9148 1.81464 89.4083 3.35728C83.902 4.90015 79.3265 8.49569 76.5246 13.4822L65.9923 32.2268C63.1906 37.213 62.4956 42.9973 64.0353 48.5143C64.8962 51.5986 66.3976 54.3915 68.424 56.7452L70.1851 59.0627" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M92.1084 47.2347C92.1496 47.1659 92.19 47.0961 92.2296 47.0258L102.762 28.2814C105.12 24.0849 103.63 18.7494 99.4421 16.3871C95.2537 14.0247 89.9282 15.5171 87.5703 19.7134L77.038 38.458C76.8774 38.7439 76.7346 39.035 76.6094 39.3303" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M91.9033 47.3526L84.7408 72.6901L78.02 64.7079L67.5547 69.0936L75.0748 42.5093C75.7072 40.3047 77.164 38.4758 79.1768 37.3592C81.1897 36.2428 83.51 35.9767 85.7104 36.6102L86.0182 36.7007C90.5724 38.0121 93.2121 42.7896 91.9033 47.3526Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    ),
    bgPattern: "triangle-waves",
  },
  {
    title: "Quality Without Compromise",
    description:
      "From motion to 3D, our high-quality animation and post systems bring your storytelling to life sharper, stronger, smarter.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 120 120" fill="none">
      <path d="M28.0176 77.7422L14.75 106.194L29.3302 105.193L37.9347 117.006L50.3564 90.3676" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M69.6406 90.3676L82.0623 117.006L90.6668 105.193L105.247 106.194L91.9794 77.7422" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M59.9964 91.4225C84.4157 91.4225 104.212 71.6267 104.212 47.2073C104.212 22.788 84.4157 2.99219 59.9964 2.99219C35.577 2.99219 15.7812 22.788 15.7812 47.2073C15.7812 71.6267 35.577 91.4225 59.9964 91.4225Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M59.9959 78.3903C77.2181 78.3903 91.1794 64.429 91.1794 47.2069C91.1794 29.9847 77.2181 16.0234 59.9959 16.0234C42.7738 16.0234 28.8125 29.9847 28.8125 47.2069C28.8125 64.429 42.7738 78.3903 59.9959 78.3903Z" stroke="white" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M60.0194 27.1953L65.8968 39.1041L79.039 41.0139L69.5293 50.2835L71.7742 63.3727L60.0194 57.1928L48.2648 63.3727L50.5097 50.2835L41 41.0139L54.1422 39.1041L60.0194 27.1953Z" stroke="#FF7F00" stroke-width="3.7" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    bgPattern: "grid-circles",
  },
];

// Helper to detect if device is phone (mobile)
function isMobile() {
  if (typeof window === "undefined") return false;
  // Use a simple check for mobile devices
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    ) || window.innerWidth < 768
  );
}

export default function WhyWorkWithUs() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);

  // Only run GSAP animations if not on mobile
  useGSAP(() => {
    if (isMobile()) return;

    const container = containerRef.current;
    const cards = cardsRef.current;

    if (!container || !cards.length) return;

    cards.forEach((card, idx) => {
      if (!card) return;
      if (idx < cards.length) {
        let endTrigger;

        if (idx === 0 && cards[idx + 3]) {
          endTrigger = cards[idx + 3];
        } else if ((idx === 2 || idx === 3) && cards[idx + 1]) {
          endTrigger = cards[idx + 1];
        } else if (cards[idx + 2]) {
          endTrigger = cards[idx + 2];
        } else {
          endTrigger = cards[cards.length - 1];
        }

        // Animate scale and opacity on pin
        ScrollTrigger.create({
          trigger: card,
          start: "top 25%",
          endTrigger: endTrigger,
          end: "top 25%",
          pin: true,
          pinSpacing: false,
          scrub: false,
          onEnter: () => {
            gsap.to(card, { scale: 0.97, duration: 0.25, overwrite: "auto" });
          },
          onLeave: () => {
            gsap.to(card, { scale: 1, duration: 0.25, overwrite: "auto" });
          },
          onEnterBack: () => {
            gsap.to(card, { scale: 0.97, duration: 0.25, overwrite: "auto" });
          },
          onLeaveBack: () => {
            gsap.to(card, { scale: 1, duration: 0.25, overwrite: "auto" });
          },
        });
      }
    });

    // Pin the last card until its bottom leaves the container
    const lastIdx = cards.length;
    if (cards[lastIdx]) {
      ScrollTrigger.create({
        trigger: cards[lastIdx],
        start: `top 25%`,
        end: () => {
          // End when the last card's bottom reaches the container's bottom
          if (!container || !cards[lastIdx]) return "bottom bottom";
          const containerRect = container.getBoundingClientRect();
          const lastCardRect = cards[lastIdx]!.getBoundingClientRect();
          // The offset from the last card's top to its bottom within the container
          const offset =
            lastCardRect.height - (containerRect.bottom - lastCardRect.top);
          // If offset is negative, just use the height
          return `+=${Math.max(lastCardRect.height, offset)}`;
        },
        pin: true,
        pinSpacing: false,
        scrub: false,
        onEnter: () => {
          gsap.to(cards[lastIdx], {
            scale: 0.97,
            duration: 0.25,
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(cards[lastIdx], {
            scale: 1,
            duration: 0.25,
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(cards[lastIdx], {
            scale: 0.97,
            duration: 0.25,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(cards[lastIdx], {
            scale: 1,
            duration: 0.25,
            overwrite: "auto",
          });
        },
      });
    }

    ScrollTrigger.create({
      trigger: textWrapperRef.current,
      start: "top 25%",
      pin: true,
      scrub: false,
      end: () => {
        // End when the last card reaches top 30% of viewport
        if (!container || !cardsRef.current.length) return "bottom bottom";
        const lastCard = cardsRef.current[cardsRef.current.length - 1];
        if (!lastCard) return "bottom bottom";
        // Calculate the distance from the top of the textWrapper to the top of the last card
        const textRect = textWrapperRef.current!.getBoundingClientRect();
        const lastCardRect = lastCard.getBoundingClientRect();
        // The offset from the top of the textWrapper to the top of the last card
        const offset = lastCardRect.top - textRect.top;
        // Adjust for 30% of viewport height
        const thirtyVh = window.innerHeight * 0.01;
        return `+=${offset - thirtyVh}`;
      },
    });

    // Cleanup triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  // If on mobile, use a stacked layout and no animation wrappers
  const isMobileDevice = typeof window !== "undefined" ? isMobile() : false;

  return (
    <div
      id="why-work-with-us"
      className={`w-full flex mb-15 lg:mb-40 ${isMobileDevice ? "flex-col px-5" : ""}`}
      ref={containerRef}
    >
      {/* <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src="/assets/shapes/Grid 5.png"
          alt=""
          className="w-full object-cover opacity-80"
        />
      </div> */}

      <div
        className={
          isMobileDevice
            ? "w-full flex justify-start lg:justify-center mb-8"
            : "w-1/2 flex justify-center"
        }
        ref={textWrapperRef}
      >
        <div className="space-y-3">
          {isMobileDevice ? (
            <div className="mx-5">
              <h2 className="text-3xl text-white font-semibold leading-tight">
                Why Work With <span className="text-[#FF8C00]">BeeBuzz?</span>
              </h2>
              <p className="text-white/70 text-sm font-light leading-relaxed max-w-lg">
                Execution isn't a service for us, it's our product. In less than
                a year, BeeBuzz has delivered. We're not warming up. We're
                already in the game, producing campaigns, videos, and visual
                assets weekly.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-4xl lg:text-5xl text-white font-semibold leading-tight">
                <AnimatedSplitText
                  className="inline"
                  type="chars"
                  stagger={0.01}
                  duration={1}
                >
                  Why work with <span className="text-[#FF8C00]">BeeBuzz?</span>
                </AnimatedSplitText>
              </h2>
              <AnimatedSplitText
                className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-lg"
                type="lines"
                stagger={0.03}
                duration={1}
                tag="p"
              >
                Execution isn't a service for us, it's our product. In less than
                a year, BeeBuzz has delivered. We're not warming up. We're
                already in the game, producing campaigns, videos, and visual
                assets weekly.
              </AnimatedSplitText>
            </>
          )}
        </div>
      </div>

      <div className={isMobileDevice ? "w-full" : "w-1/2"}>
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el || null;
            }}
            className={`relative h-[250px] w-[80%] flex items-center justify-center bg-[#101010] rounded-lg mb-10 p-5 md:p-10 shadow-[-1px_-15px_11px_0px_rgba(0,_0,_0,_0.1)] ${
              isMobileDevice ? "mx-5 w-[90%]" : ""
            }`}
          >
            <div className="flex flex-col items-start space-y-4">
              <div className="flex-shrink-0 mt-1">{feature.icon}</div>
              <div className="flex-1 max-w-[90%] md:max-w-2/3">
                <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
            {getBgPattern(feature.bgPattern)}
          </div>
        ))}
      </div>
    </div>
  );
}
