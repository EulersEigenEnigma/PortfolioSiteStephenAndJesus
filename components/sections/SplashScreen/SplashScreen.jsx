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
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <motion.video
            key={videoSrc}
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <source src={videoSrc} type="video/mp4" />
          </motion.video>
        </motion.div>
      )}
    </AnimatePresence>
  );
}