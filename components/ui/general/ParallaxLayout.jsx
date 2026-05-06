"use client";
import { useRef, useEffect, useState } from "react";

export default function ParallaxLayout({ children }) {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Force play on iOS — needs to be triggered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => setVideoFailed(true));
    };

    // Try immediately
    tryPlay();

    // Also try on first user interaction (iOS fallback)
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, []);

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
        {videoFailed ? (
          // Fallback if video fails entirely
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: "url(/images/sections/BG/BGFallback.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <video
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
              objectPosition: "center 0%",
            }}
            onError={() => setVideoFailed(true)}
          >
            <source src="/images/sections/BG/BGVideoLoop.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}