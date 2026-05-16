"use client";
import { useRef, useEffect, useState } from "react";

export default function ParallaxLayout({ children }) {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Force play on iOS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    tryPlay();
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, [isMobile]);

  // Smooth loop reset
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.5) {
        video.currentTime = 0;
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Scroll → pan video vertically — DESKTOP ONLY
  // iOS Safari doesn't support fixed video inside scroll containers properly,
  // so on mobile we leave objectPosition static at "center 50%"
  useEffect(() => {
    if (isMobile) {
      // Reset to centre and do nothing
      const video = videoRef.current;
      if (video) video.style.objectPosition = "center 50%";
      return;
    }

    const scrollEl = document.querySelector("[data-scroll-container]");
    const video = videoRef.current;
    if (!scrollEl || !video) return;

    const handleScroll = () => {
      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
      const progress = scrollEl.scrollTop / maxScroll;
      const percent = progress * 100;
      video.style.objectPosition = `center ${percent}%`;
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const videoSrc = isMobile
    ? "/images/sections/BG/BGPhoneVideo.mp4"
    : "/images/sections/BG/BGVideoLoop.mp4";

  return (
    <div
      data-scroll-container
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: isMobile ? "none" : "y mandatory",
        scrollBehavior: "smooth",
        position: "relative",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        [data-scroll-container]::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Fixed video background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 50%",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}