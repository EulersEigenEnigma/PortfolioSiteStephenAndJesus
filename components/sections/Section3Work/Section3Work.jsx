"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section3DesignAnimation from "./Section3DesignAnimation";
import Section3GraphicDesign from "./Section3GraphicDesign";

const EASE = [0.76, 0, 0.24, 1];

const workItems = [
  {
    id: "pitch",
    label: "Pitch Decks",
    iconSvg: "/images/sections/Section3/SVGPitchDeck.svg",
    projects: [
      { id: "p1", name: "FinTech Seed Round",    image: "/projects/pitch-1.jpg",  url: "#", description: "Investor deck for a FinTech startup raising a seed round." },
      { id: "p2", name: "SaaS Product Launch",   image: "/projects/pitch-2.jpg",  url: "#", description: "Go-to-market pitch for a B2B SaaS platform launch." },
      { id: "p3", name: "HealthTech Series A",   image: "/projects/pitch-3.jpg",  url: "#", description: "Series A fundraising narrative for a HealthTech company." },
      { id: "p4", name: "Consumer Brand Story",  image: "/projects/pitch-4.jpg",  url: "#", description: "Brand storytelling deck for a D2C consumer app." },
    ],
  },
  {
    id: "motion",
    label: "Design Animations",
    iconSvg: "/images/sections/Section3/SVGDesignAnimations.svg",
    projects: [
      { id: "m1", name: "3D Logo Reveal",        image: "/projects/motion-1.jpg", url: "#", description: "Full 3D brand identity animation and logo reveal sequence." },
      { id: "m2", name: "UI Micro Transitions",  image: "/projects/motion-2.jpg", url: "#", description: "Smooth micro-interaction and transition system for a mobile app." },
      { id: "m3", name: "Product Reel",          image: "/projects/motion-3.jpg", url: "#", description: "High-energy product showcase reel for a consumer brand." },
      { id: "m4", name: "Explainer Animation",   image: "/projects/motion-4.jpg", url: "#", description: "2D explainer animation breaking down a crypto platform." },
    ],
  },
  {
    id: "graphic",
    label: "Graphic Designs",
    iconSvg: "/images/sections/Section3/SVGGraphicDesign.svg",
    projects: [
      { id: "g1", name: "Studio Rebrand",        image: "/projects/graphic-1.jpg", url: "#", description: "Complete visual identity overhaul for a creative studio." },
      { id: "g2", name: "Festival Poster Series", image: "/projects/graphic-2.jpg", url: "#", description: "Editorial poster series for a culture and arts festival." },
      { id: "g3", name: "Editorial Layout",      image: "/projects/graphic-3.jpg", url: "#", description: "Magazine spread and editorial layout design system." },
      { id: "g4", name: "Artisan Packaging",     image: "/projects/graphic-4.jpg", url: "#", description: "Packaging and label design for an artisan food brand." },
    ],
  },
];

function ViewProjectButton({ url }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    function reset() { setPressed(false); }
    document.addEventListener("click", reset);
    return () => document.removeEventListener("click", reset);
  }, []);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setPressed(true);
        window.open(url, "_blank");
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#ffffff",
        background: hovered || pressed ? "rgba(201,150,58,0.85)" : "#C9963A",
        border: "2px solid #C9963A",
        borderRadius: 8,
        padding: "14px 36px",
        cursor: "pointer",
        flexShrink: 0,
        boxShadow: hovered || pressed
          ? "0 0 24px rgba(201,150,58,0.45)"
          : "0 0 0px rgba(201,150,58,0)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
      }}
    >
      View Project
    </button>
  );
}

function WorkIcon({ item, index, onOpen }) {
  const [lit, setLit] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.0, delay: 0.1 + index * 0.14, ease: EASE }}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      onClick={() => onOpen(item.id)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "28px",
        cursor: "pointer",
        userSelect: "none",
        flex: 1,
      }}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: index * -1.25 }}
        style={{ position: "relative", width: "100%", maxWidth: "260px", aspectRatio: "1/1" }}
      >
        {/* Hover glow ring */}
        {lit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: "-10px", borderRadius: "50%",
              border: "1px solid rgba(201,150,58,0.5)", pointerEvents: "none",
            }}
          />
        )}

        {/* SVG icon — white by default, gold on hover via CSS filter */}
        <img
          src={item.iconSvg}
          alt={item.label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: lit
              ? "brightness(0) saturate(100%) invert(68%) sepia(52%) saturate(500%) hue-rotate(2deg) brightness(95%)"
              : "brightness(0) invert(1)",
            transition: "filter 0.35s ease",
          }}
        />
      </motion.div>

      <span style={{
        fontFamily: "var(--font-primary)",
        fontSize: "clamp(12px, 1.1vw, 16px)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: lit ? "#C9963A" : "#ffffff",
        transition: "color 0.35s ease",
      }}>
        {item.label}
      </span>
    </motion.div>
  );
}

function ProjectView({ item, onBack }) {
  const [activeProject, setActiveProject] = useState(item.projects[0].id);
  const active = item.projects.find((p) => p.id === activeProject);

  return (
    <motion.div
      key="project-view"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(28px, 4vh, 48px)",
      }}
    >
      {/* back + category */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <motion.button
          whileHover={{ x: -4 }}
          transition={{ duration: 0.25 }}
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(11px, 1vw, 14px)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#ffffff",
            transition: "color 0.25s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#C9963A"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M17 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </motion.button>

        <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.3)" }} />

        <span style={{
          fontFamily: "var(--font-primary)",
          fontSize: "clamp(11px, 1vw, 14px)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C9963A",
        }}>
          {item.label}
        </span>
      </div>

      {/* main grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "center",
      }}>

        {/* left: project list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {item.projects.map((project, i) => {
            const isActive = activeProject === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }}
                onMouseEnter={() => setActiveProject(project.id)}
                onClick={() => setActiveProject(project.id)}
                style={{
                  padding: "clamp(16px, 2.2vh, 26px) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(11px, 0.9vw, 13px)",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: isActive ? "#C9963A" : "#ffffff",
                    transition: "color 0.3s ease",
                    minWidth: "28px",
                  }}>
                    0{i + 1}
                  </span>

                  <span style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(18px, 2.4vw, 36px)",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: isActive ? "#C9963A" : "#ffffff",
                    transition: "color 0.3s ease",
                    lineHeight: 1.1,
                  }}>
                    {project.name}
                  </span>
                </div>

                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M1 5H19M19 5L15 1M19 5L15 9" stroke="#C9963A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* right: image + description + button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{
            width: "100%",
            aspectRatio: "16/9",
            border: "2.5px solid rgba(201,150,58)",
            overflow: "hidden",
            position: "relative",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "4px",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ position: "absolute", inset: 0 }}
              >
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "10px",
                }}>
                  <span style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(201,150,58,0.6)",
                  }}>
                    {active.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.2)",
                    textTransform: "uppercase",
                  }}>
                    Image goes here
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active.id + "-desc"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(13px, 1.1vw, 16px)",
                letterSpacing: "0.04em",
                color: "#ffffff",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {active.description}
            </motion.p>
          </AnimatePresence>

          <div>
            <ViewProjectButton url={active.url} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Section3Work() {
  const [headingLit, setHeadingLit] = useState(false);
  const [openId, setOpenId] = useState(null);
  const openItem = workItems.find((w) => w.id === openId);

  return (
    <section
      id="work"
      className="w-screen min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-20 overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!openId ? (
          <motion.div
            key="icons-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.0, ease: EASE }}
              onMouseEnter={() => setHeadingLit(true)}
              onMouseLeave={() => setHeadingLit(false)}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(28px, 4vw, 64px)",
                fontWeight: 1000,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: headingLit ? "#C9963A" : "#ffffff",
                lineHeight: 1.0,
                marginBottom: "clamp(10px, 1.5vh, 18px)",
                marginTop: "-6vh",
                cursor: "default",
                transition: "color 0.35s ease",
              }}
            >
              Work
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(13px, 1.3vw, 18px)",
                letterSpacing: "0.1em",
                color: "#ffffff",
                lineHeight: 1.7,
                marginBottom: "clamp(72px, 12vh, 140px)",
                textAlign: "center",
              }}
            >
              Check out some of the work I have done!
            </motion.p>

            <div style={{
              display: "flex",
              gap: "clamp(24px, 5vw, 64px)",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
              maxWidth: "1200px",
              padding: "0 clamp(16px, 4vw, 64px)",
            }}>
              {workItems.map((item, i) => (
                <WorkIcon key={item.id} item={item} index={i} onOpen={(id) => setOpenId(id)} />
              ))}
            </div>
          </motion.div>
        ) : openId === "motion" ? (
          <Section3DesignAnimation
            key="design-animation-view"
            onBack={() => setOpenId(null)}
          />
        ) : openId === "graphic" ? (
          <Section3GraphicDesign
            key="graphic-design-view"
            onBack={() => setOpenId(null)}
          />
        ) : (
          <ProjectView key="project-view" item={openItem} onBack={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}