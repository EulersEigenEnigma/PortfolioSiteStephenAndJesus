"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Work", id: "work" },
  { label: "Contact Me", id: "contact" },
];

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);

  useEffect(() => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    if (!scrollEl) return;

    const handleScroll = () => {
      const currentY = scrollEl.scrollTop;
      const isHome = currentY < window.innerHeight * 0.9; // ← bigger buffer

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
        // Hide again once mouse leaves the top zone (only on non-home sections)
        const isHome = lastScrollY.current < window.innerHeight * 0.5;
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar"
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
            padding: "24px 48px",
          }}
        >
          {/* Left items */}
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "40px" }}
          >
            {NAV_ITEMS.slice(0, 2).map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                sectionId={item.id}
              />
            ))}
          </div>

          {/* Logo — dead center of viewport */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 48px",
            }}
          >
            <Image
              src="/images/sections/SplashScreen/Logo/SiteColorLogo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Right items */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "40px",
            }}
          >
            {NAV_ITEMS.slice(2).map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                sectionId={item.id}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function NavItem({ label, sectionId }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const scrollEl = document.querySelector("[data-scroll-container]");
    const target = document.getElementById(sectionId);
    if (!scrollEl || !target) return;
    target.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "10px 24px",
        fontFamily: "var(--font-primary)",
        fontSize: "clamp(11px, 1.1vw, 15px)",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#ffffff",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <motion.span
        aria-hidden
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#C9963A",
          borderRadius: "4px",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </button>
  );
}
