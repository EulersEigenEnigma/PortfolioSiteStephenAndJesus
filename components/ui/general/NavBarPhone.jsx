"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "home", icon: (hovered) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={hovered ? "#C9963A" : "none"} stroke={hovered ? "#C9963A" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )},
  { id: "about", icon: (hovered) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={hovered ? "#C9963A" : "none"} stroke={hovered ? "#C9963A" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )},
  { id: "work", icon: (hovered) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={hovered ? "#C9963A" : "none"} stroke={hovered ? "#C9963A" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  )},
  { id: "contact", icon: (hovered) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={hovered ? "#C9963A" : "none"} stroke={hovered ? "#C9963A" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )},
];

export default function NavBarPhone() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    if (!scrollEl) return;

    const handleScroll = () => {
      const currentY = scrollEl.scrollTop;
      const vh = window.innerHeight;
      const isHome = currentY < vh * 0.9;

      lastScrollY.current = currentY;

      if (isHome) {
        setVisible(true);
        clearTimeout(hideTimer.current);
      } else {
        clearTimeout(hideTimer.current);
        setVisible(false);
      }
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 80) {
        setVisible(true);
        clearTimeout(hideTimer.current);
      } else {
        const isHome = lastScrollY.current < window.innerHeight * 0.9;
        if (!isHome) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => setVisible(false), 400);
        }
      }
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const handleClick = (id) => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    const target = document.getElementById(id);
    if (!scrollEl || !target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };

  const leftItems = NAV_ITEMS.slice(0, 2);
  const rightItems = NAV_ITEMS.slice(2);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar-phone"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 999,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "16px 24px",
          }}
        >
          {/* Left icons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "32px" }}>
            {leftItems.map((item) => (
              <NavIcon key={item.id} item={item} onClick={handleClick} />
            ))}
          </div>

          {/* Logo center */}
          <div style={{ display: "flex", justifyContent: "center", padding: "0 24px" }}>
            <Image
              src="/images/sections/SplashScreen/Logo/SiteColorLogo.png"
              alt="Logo"
              width={60}
              height={60}
              className="object-contain"
              onClick={() => handleClick("home")}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* Right icons */}
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "32px" }}>
            {rightItems.map((item) => (
              <NavIcon key={item.id} item={item} onClick={handleClick} />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function NavIcon({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {item.icon(hovered)}
      </motion.div>
    </button>
  );
}