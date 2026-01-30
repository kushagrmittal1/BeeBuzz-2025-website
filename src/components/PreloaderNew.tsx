import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePreloader } from "../contexts/PreloaderContext";

export default function PreloaderNew() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const { setPreloaderComplete, setPreloaderActive } = usePreloader();

  useEffect(() => {
    // Disable scroll only while preloader is running (don't re-apply after completion)
    if (!completedRef.current) {
      document.body.style.overflow = "hidden";
    }

    const preloader = preloaderRef.current;
    const videoDesktop = videoDesktopRef.current;
    const videoMobile = videoMobileRef.current;

    if (!preloader) return;

    // Handle video end event (only run once)
    const handleVideoEnd = () => {
      if (completedRef.current) return;
      completedRef.current = true;

      gsap.to(preloader, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          document.body.style.removeProperty("overflow");
          setPreloaderComplete(true);
          setPreloaderActive(false);
        },
      });
    };

    videoDesktop?.addEventListener("ended", handleVideoEnd);
    videoMobile?.addEventListener("ended", handleVideoEnd);

    return () => {
      videoDesktop?.removeEventListener("ended", handleVideoEnd);
      videoMobile?.removeEventListener("ended", handleVideoEnd);
      document.body.style.removeProperty("overflow");
    };
  }, [setPreloaderComplete, setPreloaderActive]);

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed top-0 left-0 w-full h-full z-[99999999] bg-[#000000] overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center">
        {/* Mobile: 1x1 video, full width and centered */}
        <video
          ref={videoMobileRef}
          src="/assets/videos/preloader/BeeBuzz logo 1x1  animation alpha(Transparent BG)_1.mp4"
          autoPlay
          muted
          playsInline
          className="md:hidden w-full h-full object-contain"
        />
        {/* Desktop: 16x9 video */}
        <video
          ref={videoDesktopRef}
          src="/assets/videos/preloader/BeeBuzz logo 16x9 animation alpha(Transparent BG)_1.mp4"
          autoPlay
          muted
          playsInline
          className="hidden md:block w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
