"use client";
import { useRef, useEffect } from "react";

export default function ParallaxLayout({ children }) {
  const videoRef = useRef(null);

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

  // Scroll → pan video vertically
  useEffect(() => {
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
  }, []);

  return (
    <div
      data-scroll-container
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        position: "relative",
        scrollbarWidth: "none",       // Firefox
        msOverflowStyle: "none",      // IE/Edge
      }}
    >
      {/* Hide webkit scrollbar */}
      <style>{`
        [data-scroll-container]::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Fixed video background — sits behind everything */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 0%",
          }}
        >
          <source src="/images/sections/BG/BGVideoLoop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content — snapping sections live here */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}