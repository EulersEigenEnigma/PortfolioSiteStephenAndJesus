"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const projects = [
  {
    id: "m1",
    name: "Smile! It Gets Better With Him!",
    description: "A Logo I Made Using After Effects. I Drew the Logo and Animated It In After Effects. For Those Who Need Hope, Jesus Gives It To Us.",
    vimeo: "1188871423",
    url: "https://drive.google.com/file/d/1yPFAc0SzBOAerYqvSDTD9RfU4RT39FsU/view?usp=drive_link",
  },
  {
    id: "m2",
    name: "Website Logo",
    description: "A Logo I Made Using After Effects. I Drew the Logo and Animated It In After Effects.",
    vimeo: "1188374253",
    url: "https://drive.google.com/file/d/1hAJbeo44lCkHEgY9S8uqdIIaHrbKh776/view?usp=drive_link",
  },
  {
    id: "m3",
    name: "Rhythmic Renders Logo",
    description: "I Designed A Logo For My Senior Thesis Film. Was Inspired By Love For Music and Animation!",
    vimeo: "1188377175",
    hasAudio: true,
    url: "https://drive.google.com/file/d/1dl5lkwodg6u_KNNUNTR_Mmtm7qaccZmZ/view?usp=drive_link",
  },
  {
    id: "m4",
    name: "FLCL Guitar 3D Design",
    description: "A Fun Project Of Mine! Built this 3D Model, Based On A RickenBacker Guitar From An Animated Show Called FLCL.",
    vimeo: "1188377234",
    hasAudio: false,
    url: "https://drive.google.com/file/d/1uHkGI4PU7HPYM78tf1IY2yf7beTWLJV1/view?usp=drive_link",
  },
  {
    id: "m5",
    name: "FLCL Guitar 3D Design",
    description: "A Logo Animation Created for the Web Solely through Framer Motion, Javascript and React!",
    vimeo: "1189874844",
    hasAudio: false,
    url: "https://drive.google.com/file/d/1IcrOaXrQ8mKIHJlCIW62Jzu7A6zf-oLi/view?usp=drive_link",
  }
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

function ProjectPreview({ project }) {
  const [muted, setMuted] = useState(true);

  if (project.vimeo) {
    const src = `https://player.vimeo.com/video/${project.vimeo}?background=1&autoplay=1&loop=1&muted=${muted ? 1 : 0}&byline=0&title=0&portrait=0&controls=0`;

    return (
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        border: "2.5px solid rgba(201,150,58,1)",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        background: "#000",
      }}>
        <iframe
          key={src}
          src={src}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "100%", height: "100%",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {project.hasAudio && (
          <button
            onClick={() => setMuted((m) => !m)}
            title={muted ? "Unmute" : "Mute"}
            style={{
              position: "absolute",
              bottom: "14px",
              right: "14px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,1)",
              border: "1px solid rgba(201,150,58,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
              transition: "border-color 0.2s ease, background 0.2s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C9963A";
              e.currentTarget.style.background = "rgba(201,150,58,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,150,58,0.5)";
              e.currentTarget.style.background = "rgba(0,0,0,0.55)";
            }}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#C9963A" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      aspectRatio: "16/9",
      border: "2.5px solid rgba(201,150,58,1)",
      borderRadius: "4px",
      overflow: "hidden",
      position: "relative",
      background: "rgba(255,255,255,0.03)",
    }}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
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
            {project.name}
          </span>
          <span style={{
            fontFamily: "var(--font-primary)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}>
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
}

export default function Section3DesignAnimation({ onBack }) {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId);

  return (
    <motion.div
      key="design-animation-view"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vh, 36px)",
        marginTop: "8vh",
      }}
    >
      {/* back + category title */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
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
          Design Animations
        </span>
      </div>

      {/* main grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "clamp(32px, 6vw, 80px)",
        alignItems: "start",
        minHeight: "60vh",
      }}>

        {/* left: project list */}
        <div style={{ display: "flex", flexDirection: "column", paddingTop: "clamp(8px, 1.5vh, 20px)" }}>
          {projects.map((project, i) => {
            const isActive = activeId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }}
                onMouseEnter={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
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

        {/* right: preview + description + button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            paddingTop: "clamp(32px, 5vh, 64px)",
          }}
        >
          {/* video */}
          <div style={{ width: "100%", flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-preview"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <ProjectPreview project={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* description — fixed height so button stays put */}
          <div style={{ minHeight: "52px" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id + "-desc"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
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
          </div>

          {/* button — small top gap from description */}
          <div style={{ flexShrink: 0, marginTop: "8px" }}>
            <ViewProjectButton url={active.url} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}