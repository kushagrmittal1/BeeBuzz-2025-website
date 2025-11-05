import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import  { useRef } from "react";


import { Link } from "react-router-dom";

const servicesData = [
  {
    name: "Website development ",
    info: "At Clever Studio, we create visually stunning and highly functional websites tailored to your business needs. Our expert developers ensure your site is responsive, user-friendly, and optimized for search engines to boost your online presence.",
    image: "https://plus.unsplash.com/premium_photo-1669824376679-268d3739acf3?q=80&w=1295&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundColor: "#DCAE96",
    addInfo: [
      {
        name: "Custom Website Design",
        info: "Tailored to your brand and business needs.",
      },
      {
        name: "E-commerce Solutions",
        info: "Secure, scalable, and optimized for sales.",
      },
      {
        name: "Responsive Design",
        info: "Ensuring a seamless experience across all devices.",
      },
    ],
    btnText: "Start Your Project",
  },
  {
    name: "App development",
    info: "Transform your business with custom mobile applications designed by Clever Studio. We build intuitive, engaging apps for both iOS and Android platforms, enhancing user experience and driving customer engagement.",
    image: "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundColor: "#d4f3b7",
    addInfo: [
      {
        name: "iOS and Android Development",
        info: "Custom apps for all major platforms.",
      },
      {
        name: "UI/UX Design",
        info: "Beautiful and user-friendly interfaces.",
      },
      {
        name: "Cross-Platform Development",
        info: "Maximize your reach with apps that work on multiple devices.",
      },
    ],
    btnText: "Learn More About Our Apps",
  },
  {
    name: "Video editing",
    info: "Bring your vision to life with Clever Studio's professional video editing services. We turn raw footage into polished, captivating videos that effectively communicate your brand’s story and message.",
    image: "https://plus.unsplash.com/premium_photo-1668896123844-be3aec7a4776?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundColor: "#dfc5fe",
    addInfo: [
      {
        name: "Promotional Videos",
        info: "Showcase your products and services.",
      },
      {
        name: "Corporate Videos",
        info: "Professional content for internal and external communications.",
      },
      {
        name: "Social Media Content",
        info: "Engaging videos for platforms like Instagram, Facebook, and YouTube.",
      },
    ],
    btnText: "Transform Your Videos",
  },
  {
    name: "Logo designing",
    info: "Your logo is the face of your brand. Clever Studio crafts unique, memorable logos that capture the essence of your business, helping you make a lasting impression and stand out in the marketplace.",
    image: "https://plus.unsplash.com/premium_photo-1669138512572-73dd57cc7cb6?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundColor: "#A0D9EF",
    addInfo: [
      {
        name: "Custom Logo Design",
        info: "Unique and tailored to your brand.",
      },
      {
        name: "Brand Identity Development",
        info: "Cohesive designs that tell your story.",
      },
      {
        name: "Multiple Concepts & Revisions",
        info: "Ensuring you get the perfect design.",
      },
      {
        name: "High-Resolution Files",
        info: "For all your branding needs.",
      },
    ],
    btnText: "Get Your Custom Logo",
  },
  {
    name: "Social media management",
    info: "Maximize your brand’s online presence with Clever Studio’s comprehensive social media management. We create and curate engaging content, manage your profiles, and implement strategies to grow your audience and increase engagement.",
    image: "https://plus.unsplash.com/premium_photo-1664369473396-15d857cf5e4b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundColor: "#FDFD96",
    addInfo: [
      {
        name: "Content Creation",
        info: "High-quality posts, stories, and videos.",
      },
      {
        name: "Community Management",
        info: "Engaging with your audience and building relationships.",
      },
      {
        name: "Strategy Development",
        info: "Tailored social media strategies for your brand.",
      },
    ],
    btnText: "Boost Your Social Media",
  },

];

const Services = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const contents = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    const images = gsap.utils.toArray(".image:not(:first-child)");
    const body = document.body;

    mm.add("(min-width: 768px)", () => {
      gsap.set(images, { yPercent: 100 });

      const animation = gsap.to(images, {
        yPercent: -100,
        duration: 1,
        stagger: 1,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageWrapperRef.current,
        scrub: true,
        animation: animation,
      });
    });

    contents.current.forEach((element, index) => {
      if (!element) return;
      ScrollTrigger.create({
        trigger: element,
        start: "top 30%",
        end: "bottom 30%",
      });
    });
  });

  return (
    <div
      ref={containerRef}
      id="services"
      className="flex justify-between mx-[6rem] mt-[5rem] max-md:mx-4 max-md:mt-8 max-md:flex-col"
    >
      <div className="w-1/2 flex flex-col justify-center items-center max-md:w-full">
        {servicesData.map((item, index) => (
          <div
            key={item.name}
            ref={el => (contents.current[index] = el)}
            className={`
              w-[90%] h-[100svh] flex flex-col justify-center
              max-md:w-full max-md:h-fit max-md:mb-12
              ${index === servicesData.length - 1 ? "max-md:mb-0" : ""}
            `}
          >
            <img
              src={item.image}
              alt=""
              className="hidden max-md:block h-[40vh] object-cover rounded-2xl"
            />
            <h1 className="text-white text-[4rem] font-semibold uppercase pb-4 max-md:mt-6 max-md:text-[1.7rem] max-md:pb-2">
              {item.name}
            </h1>
            <p className="text-white text-[1.1rem] font-normal pb-4 leading-[1.6] max-md:text-[0.9rem] max-md:leading-[1.2]">
              {item.info}
            </p>
            <div className="more_info">
              {item.addInfo.map((add, idx) => (
                <div
                  className={`
                    info flex items-center
                    max-md:block
                  `}
                  key={add.name}
                >
                  <p
                    className={`
                      service_add_info text-white pr-2 font-semibold min-w-fit
                      max-md:pr-0
                    `}
                  >
                    • {add.name}:
                  </p>
                  <p
                    className={`
                      ${idx === item.addInfo.length - 1 ? "max-md:pl-2" : ""}
                      text-[1rem] pb-3 max-md:pb-0
                    `}
                  >
                    {add.info}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/quote"
              className="border border-black/70 px-6 py-3 w-max rounded-2xl mt-4 text-base font-medium transition hover:bg-black hover:text-white max-md:mt-6 max-md:px-4 max-md:py-2"
            >
              {item.btnText}
            </Link>
          </div>
        ))}
      </div>
      <div className="w-1/2 h-[100vh] flex items-center justify-center max-md:hidden">
        <div
          ref={imageWrapperRef}
          className="h-[70%] w-[80%] relative flex items-center justify-center rounded-2xl"
        >
          {servicesData.map((item, index) => (
            <div
              key={item.name}
              className="image absolute w-full h-full"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;


// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";

// const servicesData = [
//   {
//     name: "App development",
//     info: "Transform your business with custom mobile applications designed by Clever Studio. We build intuitive, engaging apps for both iOS and Android platforms, enhancing user experience and driving customer engagement.",
//     image: "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     backgroundColor: "#d4f3b7",
//     addInfo: [
//       {
//         name: "iOS and Android Development",
//         info: "Custom apps for all major platforms.",
//       },
//       {
//         name: "UI/UX Design",
//         info: "Beautiful and user-friendly interfaces.",
//       },
//       {
//         name: "Cross-Platform Development",
//         info: "Maximize your reach with apps that work on multiple devices.",
//       },
//     ],
//     btnText: "Learn More About Our Apps",
//   },

//   {
//     name: "Logo designing",
//     info: "Your logo is the face of your brand. Clever Studio crafts unique, memorable logos that capture the essence of your business, helping you make a lasting impression and stand out in the marketplace.",
//     image: "https://plus.unsplash.com/premium_photo-1669138512572-73dd57cc7cb6?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     backgroundColor: "#A0D9EF",
//     addInfo: [
//       {
//         name: "Custom Logo Design",
//         info: "Unique and tailored to your brand.",
//       },
//       {
//         name: "Brand Identity Development",
//         info: "Cohesive designs that tell your story.",
//       },
//       {
//         name: "Multiple Concepts & Revisions",
//         info: "Ensuring you get the perfect design.",
//       },
//       {
//         name: "High-Resolution Files",
//         info: "For all your branding needs.",
//       },
//     ],
//     btnText: "Get Your Custom Logo",
//   },
//   {
//     name: "Social media management",
//     info: "Maximize your brand’s online presence with Clever Studio’s comprehensive social media management. We create and curate engaging content, manage your profiles, and implement strategies to grow your audience and increase engagement.",
//     image: "https://plus.unsplash.com/premium_photo-1664369473396-15d857cf5e4b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     backgroundColor: "#FDFD96",
//     addInfo: [
//       {
//         name: "Content Creation",
//         info: "High-quality posts, stories, and videos.",
//       },
//       {
//         name: "Community Management",
//         info: "Engaging with your audience and building relationships.",
//       },
//       {
//         name: "Strategy Development",
//         info: "Tailored social media strategies for your brand.",
//       },
//     ],
//     btnText: "Boost Your Social Media",
//   },
//   {
//     name: "Professional shoots",
//     info: "Showcase your products in the best light with our high-quality product photography. Clever Studio’s skilled photographers capture detailed, vibrant images that highlight the features and benefits of your products.",
//     image: "https://plus.unsplash.com/premium_photo-1669138512572-73dd57cc7cb6?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     backgroundColor: "#f4978e",
//     addInfo: [
//       {
//         name: "Studio Photography",
//         info: "Perfect lighting and settings for professional results.",
//       },
//       {
//         name: "Lifestyle Photography",
//         info: "Showcasing products in real-life scenarios.",
//       },
//       {
//         name: "High-Resolution Images",
//         info: "Ready for print and digital use.",
//       },
//     ],
//     btnText: "Book Your Product Shoot",
//   },
// ];


// const Conatiner = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 0 6rem;
//   margin-top: 5rem;
//     height: 300vh;
//   @media (max-width: 768px) {
//     margin: 0 1rem;
//     margin-top: 2rem;
//   }
// `;

// const ContentWrapper = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 300vh;
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const Content = styled.div`
//   width: 90%;
//   height: 100svh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   img {
//     display: none;
//   }
//   h1 {
//     font-size: 4rem;
//     font-weight: 500;
//     text-transform: uppercase;
//     font-weight: 600;
//     padding-bottom: 1rem;
//   }
//   p {
//     font-size: 1.1rem;
//     font-weight: 400;
//     padding-bottom: 1rem;
//     line-height: 1.6;
//   }
//   .more_info {
//     .info {
//       display: flex;
//       align-items: center;
//       p {
//         padding: 0;
//         font-size: 1rem;
//         padding-bottom: 0.7rem;
//       }
//       .service_add_info {
//         padding-right: 0.5rem;
//         font-weight: 600;
//         min-width: fit-content;
//       }
//     }
//   }
//   @media (max-width: 768px) {
//     width: 100%;
//     height: fit-content;
//     margin-bottom: 3rem;
//     &:last-child {
//       margin-bottom: 0;
//     }
//     img {
//       display: block;
//       height: 40vh;
//       object-fit: cover;
//       border-radius: 2rem;
//     }
//     h1 {
//       margin-top: 1.5rem;
//       font-size: 1.7rem;
//       padding-bottom: 0.5rem;
//     }
//     p {
//       font-size: 0.9rem;
//       line-height: 1.2;
//     }
//     .more_info {
//       .info {
//         display: block;
//         p {
//           padding-right: 0;
//           &:last-child {
//             padding-left: 0.6rem;
//           }
//         }
//       }
//     }
//   }
// `;

// const RightContainer = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const ImageWrapper = styled.div`
//   height: 70%;
//   width: 50%;
// //   overflow: hidden;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 2rem;
// //   overflow: hidden;
// `;

// const Image = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
// //   overflow: hidden;
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

// const Button = styled(Link)`
//   border: 1px solid #000000b5;
//   padding: 0.8rem 1.5rem;
//   width: max-content;
//   border-radius: 2rem;
//   @media (max-width: 768px) {
//     margin-top: 1.5rem;
//     padding: 0.5rem 1rem;
//   }
// `;



// const Services = () => {
//   const containerRef = useRef(null);
//   const imageWrapperRef = useRef(null);
//   const contents = useRef([]);
//   const cardsRef = useRef<HTMLDivElement[]>([]);

//   useGSAP(() => {
//     let mm = gsap.matchMedia();
//     const images = gsap.utils.toArray(".image:not(:first-child)");

//     mm.add("(min-width: 768px)", () => {
//       gsap.set(images, { yPercent: 100 });

//       const animation = gsap.to(images, {
//         yPercent: -100 ,
//         duration: 1,
//         stagger: 1,
//       });

//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top top",
//         end: "bottom bottom",
//         pin: imageWrapperRef.current,
//         scrub: true,
//         animation: animation,
//       });
//     });

//     contents?.current.forEach((element, index) => {
//       ScrollTrigger.create({
//         trigger: element,
//         start: "top 30%",
//         end: "bottom 30%",
//       });
//     });
//   });

//   return (
//     <Conatiner ref={containerRef} id="services">
//       {/*  <ContentWrapper>
//        {servicesData.map((item, index) => (
//           <Content
//             key={item.name}
//             // ref={(element) => (contents[index] = element)}
//           >
//             <img src={item.image} alt="" />
//             <h1 className="text-white">{item.name}</h1>
//             <p>{item.info}</p>
//             <div className="more_info">
//               {item.addInfo.map((item, index) => (
//                 <div className="info" key={item.name}>
//                   <p className="service_add_info">• {item.name}:</p>
//                   <p>{item.info}</p>
//                 </div>
//               ))}
//             </div>
//             <Button to="/quote">{item.btnText}</Button>
//           </Content>
//         ))} */}

//         {/* <h1 className="text-white text-[4rem] font-semibold uppercase pb-4 max-md:mt-6 max-md:text-[1.7rem] max-md:pb-2">Hello</h1> 
//       </ContentWrapper>*/}
//       <RightContainer>
//         <ImageWrapper ref={imageWrapperRef}>
//             <h1 className="text-white text-[4rem] font-semibold uppercase pb-4 max-md:mt-6 max-md:text-[1.7rem] max-md:pb-2 relative z-10">Hello</h1>
//           {servicesData.map((item, index) => (
//             // <Image key={item.name} className="image">
//             //   <img src={item.image} alt="" />
//             // </Image>

            
//                 <div
//                   key={index}
//                   ref={(el) => {
//                     if (el) {
//                       cardsRef.current[index] = el;
//                     }
//                   }}
//                   className="relative bg-[#101010] backdrop-blur-sm rounded-lg min-h-[250px] flex items-center p-4 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
//                 >
//                   <div className="flex flex-col items-start space-y-4">
//                     {/* <div className="flex-shrink-0 mt-1">
//                       <svg
//                         width="45"
//                         viewBox="0 0 59 59"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           clip-rule="evenodd"
//                           d="M12.9062 7.375C10.4613 7.375 8.11646 8.34626 6.38761 10.0751C4.65876 11.804 3.6875 14.1488 3.6875 16.5938V42.4062C3.6875 44.8512 4.65876 47.196 6.38761 48.9249C8.11646 50.6537 10.4613 51.625 12.9062 51.625H29.5C29.989 51.625 30.458 51.4307 30.8037 51.085C31.1495 50.7392 31.3438 50.2702 31.3438 49.7812C31.3438 49.2923 31.1495 48.8233 30.8037 48.4775C30.458 48.1318 29.989 47.9375 29.5 47.9375H12.9062C11.4393 47.9375 10.0324 47.3547 8.99507 46.3174C7.95776 45.2801 7.375 43.8732 7.375 42.4062V22.125H51.625V31.3438C51.625 31.8327 51.8193 32.3017 52.165 32.6475C52.5108 32.9932 52.9798 33.1875 53.4688 33.1875C53.9577 33.1875 54.4267 32.9932 54.7725 32.6475C55.1182 32.3017 55.3125 31.8327 55.3125 31.3438V16.5938C55.3125 14.1488 54.3412 11.804 52.6124 10.0751C50.8835 8.34626 48.5387 7.375 46.0938 7.375H12.9062ZM12.9062 16.5938C13.3952 16.5938 13.8642 16.3995 14.21 16.0537C14.5557 15.708 14.75 15.239 14.75 14.75C14.75 14.261 14.5557 13.792 14.21 13.4463C13.8642 13.1005 13.3952 12.9062 12.9062 12.9062C12.4173 12.9062 11.9483 13.1005 11.6025 13.4463C11.2568 13.792 11.0625 14.261 11.0625 14.75C11.0625 15.239 11.2568 15.708 11.6025 16.0537C11.9483 16.3995 12.4173 16.5938 12.9062 16.5938ZM18.4375 16.5938C18.9265 16.5938 19.3955 16.3995 19.7412 16.0537C20.087 15.708 20.2812 15.239 20.2812 14.75C20.2812 14.261 20.087 13.792 19.7412 13.4463C19.3955 13.1005 18.9265 12.9062 18.4375 12.9062C17.9485 12.9062 17.4795 13.1005 17.1338 13.4463C16.788 13.792 16.5938 14.261 16.5938 14.75C16.5938 15.239 16.788 15.708 17.1338 16.0537C17.4795 16.3995 17.9485 16.5938 18.4375 16.5938V16.5938ZM25.8125 14.75C25.8125 15.239 25.6182 15.708 25.2725 16.0537C24.9267 16.3995 24.4577 16.5938 23.9688 16.5938C23.4798 16.5938 23.0108 16.3995 22.665 16.0537C22.3193 15.708 22.125 15.239 22.125 14.75C22.125 14.261 22.3193 13.792 22.665 13.4463C23.0108 13.1005 23.4798 12.9062 23.9688 12.9062C24.4577 12.9062 24.9267 13.1005 25.2725 13.4463C25.6182 13.792 25.8125 14.261 25.8125 14.75Z"
//                           fill="url(#paint0_linear_56_18)"
//                         />
//                         <path
//                           fill-rule="evenodd"
//                           clip-rule="evenodd"
//                           d="M46.0945 36.875C45.6055 36.875 45.1366 37.0693 44.7908 37.415C44.445 37.7608 44.2508 38.2298 44.2508 38.7188C44.2508 39.2077 44.445 39.6767 44.7908 40.0225C45.1366 40.3682 45.6055 40.5625 46.0945 40.5625H49.6345L45.4584 45.7803L41.1459 44.344C40.8211 44.236 40.4726 44.2205 40.1395 44.2993C39.8063 44.3781 39.5017 44.5481 39.2598 44.7902L35.5722 48.4777C35.2364 48.8255 35.0506 49.2912 35.0548 49.7746C35.059 50.258 35.2529 50.7205 35.5947 51.0623C35.9366 51.4042 36.399 51.5981 36.8824 51.6023C37.3658 51.6065 37.8316 51.4206 38.1793 51.0848L41.0611 48.203L45.5119 49.6872C45.8697 49.8064 46.2554 49.8131 46.6171 49.7063C46.9787 49.5995 47.2989 49.3843 47.5345 49.0898L51.6258 43.9181V46.0938C51.6258 46.5827 51.82 47.0517 52.1658 47.3975C52.5116 47.7432 52.9805 47.9375 53.4695 47.9375C53.9585 47.9375 54.4275 47.7432 54.7733 47.3975C55.119 47.0517 55.3133 46.5827 55.3133 46.0938V38.7188C55.3133 38.2298 55.119 37.7608 54.7733 37.415C54.4275 37.0693 53.9585 36.875 53.4695 36.875H46.0945Z"
//                           fill="white"
//                         />
//                         <defs>
//                           <linearGradient
//                             id="paint0_linear_56_18"
//                             x1="40.7125"
//                             y1="17.3476"
//                             x2="21.0007"
//                             y2="46.988"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop stop-color="#9DE8EE" />
//                             <stop offset="0.0001" stop-color="#9DE8EE" />
//                             <stop offset="0.490049" stop-color="#FA7C0B" />
//                             <stop offset="1" stop-color="#9F8CED" />
//                           </linearGradient>
//                         </defs>
//                       </svg>
//                     </div> */}
//                     <div className="">
//                       <h3 className="text-2xl font-medium text-white mb-3">
//                         {item.name}
//                       </h3>
//                       <p className="text-white/60 text-sm font-light leading-relaxed">
//                         {item.info}
//                       </p>
//                     </div>
//                   </div>
//                   {/* {getBgPattern(feature.bgPattern)} */}
//                 </div>
//           ))}
//         </ImageWrapper>
//       </RightContainer>
//     </Conatiner>
//   );
// };

// export default Services;

// const GALLERY_VIDEOS = [
//   // Horizontal
//   {
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     style: {
//       top: "10%",
//       left: "8%",
//       width: "200px",
//       height: "120px",
//       transform: "rotate(-8deg) scale(1)",
//       zIndex: 2,
//       aspect: "horizontal",
//     },
//   },
//   // Vertical
//   {
//     src: "https://www.w3schools.com/html/movie.mp4",
//     style: {
//       top: "18%",
//       left: "38%",
//       width: "120px",
//       height: "200px",
//       transform: "rotate(6deg) scale(1.05)",
//       zIndex: 2,
//       aspect: "vertical",
//     },
//   },
//   // Horizontal

//   // Vertical
//   {
//     src: "https://www.w3schools.com/html/movie.mp4",
//     style: {
//       top: "38%",
//       left: "12%",
//       width: "120px",
//       height: "200px",
//       transform: "rotate(10deg) scale(1.08)",
//       zIndex: 2,
//       aspect: "vertical",
//     },
//   },
//   {
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     style: {
//       top: "8%",
//       left: "70%",
//       width: "200px",
//       height: "120px",
//       transform: "rotate(-4deg) scale(0.98)",
//       zIndex: 2,
//       aspect: "horizontal",
//     },
//   },
//   // Horizontal
//   {
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     style: {
//       top: "32%",
//       left: "60%",
//       width: "200px",
//       height: "120px",
//       transform: "rotate(-12deg) scale(1.02)",
//       zIndex: 2,
//       aspect: "horizontal",
//     },
//   },
//   // Vertical
//   {
//     src: "https://www.w3schools.com/html/movie.mp4",
//     style: {
//       top: "55%",
//       left: "25%",
//       width: "120px",
//       height: "200px",
//       transform: "rotate(7deg) scale(0.97)",
//       zIndex: 2,
//       aspect: "vertical",
//     },
//   },
//   // Horizontal
//   {
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     style: {
//       top: "60%",
//       left: "70%",
//       width: "200px",
//       height: "120px",
//       transform: "rotate(-6deg) scale(1.04)",
//       zIndex: 2,
//       aspect: "horizontal",
//     },
//   },
//   // Vertical
//   {
//     src: "https://www.w3schools.com/html/movie.mp4",
//     style: {
//       top: "75%",
//       left: "12%",
//       width: "120px",
//       height: "200px",
//       transform: "rotate(4deg) scale(1.01)",
//       zIndex: 2,
//       aspect: "vertical",
//     },
//   },
//   // Horizontal
//   {
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     style: {
//       top: "78%",
//       left: "55%",
//       width: "200px",
//       height: "120px",
//       transform: "rotate(-9deg) scale(0.99)",
//       zIndex: 2,
//       aspect: "horizontal",
//     },
//   },
// ];