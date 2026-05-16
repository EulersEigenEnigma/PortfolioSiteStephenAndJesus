"use client";
import { useState, useEffect } from "react";

import SplashScreen from "@/components/sections/SplashScreen/SplashScreen";
import Section1Main from "@/components/sections/Section1Main/Section1Main";
import Section1MainPhone from "@/components/sections/Section1Main/Section1MainPhone";
import Section2About from "@/components/sections/Section2About/Section2About";
import Section2AboutPhone from "@/components/sections/Section2About/Section2AboutPhone";
import Section3Work from "@/components/sections/Section3Work/Section3Work";
import ParallaxLayout from "@/components/ui/general/ParallaxLayout";
import NavBar from "@/components/ui/general/NavBar";
import NavBarPhone from "@/components/ui/general/NavBarPhone";
import Section2TimelineResume from "@/components/sections/Section2About/Section2TimelineResume";
import Section2TimelineResumePhone from "@/components/sections/Section2About/Section2TimelineResumePhone";
import Section4ContactMe from "@/components/sections/Section4ContactMe/Section4ContactMe";
import Section5Footer from "@/components/sections/Section5Footer/Section5Footer";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [textReady, setTextReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSplashComplete = () => {
    setSplashDone(true);
    setTimeout(() => setContentVisible(true), 100);
  };

  const handleSplashFreezing = () => {
    setContentVisible(true);
    setTimeout(() => setTextReady(true), 700);
  };

  // On desktop: snap each section. On mobile: free scroll, no snapping.
  const snap = isMobile ? {} : { scrollSnapAlign: "start" };

  return (
    <main className="w-screen min-h-screen overflow-x-hidden relative">
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {textReady && (isMobile ? <NavBarPhone /> : <NavBar />)}

        <ParallaxLayout>
          <div style={{ ...snap, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}>
            {isMobile
              ? <Section1MainPhone textReady={textReady} />
              : <Section1Main textReady={textReady} />
            }
          </div>
          <div style={{ ...snap, minHeight: isMobile ? "auto" : "100vh", overflow: "visible" }}>
            {isMobile ? <Section2AboutPhone /> : <Section2About />}
          </div>
          <div style={{ ...snap, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}>
            {isMobile ? <Section2TimelineResumePhone /> : <Section2TimelineResume />}
          </div>
          <div style={{ ...snap, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}>
            <Section3Work />
          </div>
          <div style={{ ...snap, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}>
            <Section4ContactMe />
          </div>
          <div style={{ ...snap, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}>
            <Section5Footer />
          </div>
        </ParallaxLayout>
      </div>

      {!splashDone && (
        <SplashScreen
          onComplete={handleSplashComplete}
          onFreezing={handleSplashFreezing}
        />
      )}
    </main>
  );
}