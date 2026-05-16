"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete, onFreezing }) {
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // iOS Safari fix: React's `muted` prop doesn't reliably set the HTML
  // attribute via Framer Motion's motion.video wrapper, so Safari sees an
  // "unmuted" video and blocks autoplay with a play button.
  // Setting muted + playsinline imperatively on the DOM element forces it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Must be set as a property AND attribute for full Safari compat
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    // Attempt play — iOS requires a direct .play() call too
    video.play().catch(() => {
      // Silently fail; user interaction will unblock if needed
    });
  }, [isMobile]); // re-run when src changes (mobile/desktop switch)

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.duration - video.currentTime < 0.1) {
      video.pause();
      onFreezing?.();
      setTimeout(() => setDone(true), 700);
    }
  };

  if (isMobile === null) return null;

  const videoSrc = isMobile
    ? "/images/sections/SplashScreen/Logo/SplashScreenPhoneRender.mp4"
    : "/images/sections/SplashScreen/Logo/SplashScreenDesktopRender.mp4";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/*
            Use a plain <video> instead of <motion.video> so React's
            muted prop handling doesn't interfere. Framer motion animate
            is handled by the parent div's opacity instead.
          */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <video
              key={videoSrc}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}