import { useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { Portfolio } from "./pages/Portfolio";
import { Outlet, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { HelmetProvider } from "react-helmet-async";

// Import gsap and ScrollTrigger for refresh
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./components/Preloader";
import { PreloaderProvider, usePreloader } from "./contexts/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const LenisController = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const { isPreloaderActive } = usePreloader();

  useEffect(() => {
    // Create Lenis instance only once
    if (!lenisRef.current) {
      lenisRef.current = new Lenis();
    }
    const lenis = lenisRef.current;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handler for window resize/height change
    function handleResize() {
      // Refresh ScrollTrigger
      if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.refresh) {
        ScrollTrigger.refresh();
      }
      // Update Lenis
      if (lenis && typeof lenis.resize === "function") {
        lenis.resize();
      }
    }

    window.addEventListener("resize", handleResize);

    // Some browsers fire orientationchange, which can affect height
    window.addEventListener("orientationchange", handleResize);

    // Optionally, listen to visualViewport resize for mobile browsers
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Control Lenis based on preloader state
  useEffect(() => {
    if (lenisRef.current) {
      if (isPreloaderActive) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isPreloaderActive]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <HelmetProvider>
      <PreloaderProvider>
        <LenisController />
        <Preloader/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/work" element={<Portfolio />} />
          </Route>
        </Routes>
      </PreloaderProvider>
    </HelmetProvider>
  );
}

export default App;
