"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

const projects = [
  {
    id: "pd1",
    name: "Asia Adventure: Tokyo and Taipei City!",
    description: "A Short Travel Review Of Two Great Cities!",
    embedUrl: "https://docs.google.com/presentation/d/e/2PACX-1vRMJgxWMQEXIDITb6Z5-gvgQoZz_lMuJsvJCtzcBdIbK2J7l_toeLGKAkyViw6moA_h_EF3z9p411XV/pubembed?start=true&loop=true&delayms=3000", 
    pdfUrl: "https://drive.google.com/file/d/1b84gUbrt9K4rGoISm1C2PTwouHjmy953/view?usp=drive_link",      // swap with your PDF link
    creditsUrl: "https://docs.google.com/document/d/1H8nS9YAgPvWVHyDCA8rxW-u5Sqkaiesqo4UrIknPqy0/edit?usp=drive_link",  // swap with your Credits link
  },
  {
    id: "pd2",
    name: "Design Tech Teachin Demo Slide Deck!",
    description: "A Deck Focused On Design Theory. Used For A Educational Demo!",
    embedUrl: "https://docs.google.com/presentation/d/e/2PACX-1vQFTNpfCUXt0l_E02a8qjqqYl4Fc_obv_V02BtBKE6WqEwtUfYZOVPywRuIz3wcPwbiry8pBk0CC15B/pubembed?start=false&loop=false&delayms=10000", 
    pdfUrl: "https://drive.google.com/file/d/1OzJEapHmaRU4LuoUA3FtSuYrkHEQM7QC/view?usp=drive_link",      // swap with your PDF link,  // swap with your Credits link
  },
  // Add more decks here as needed
];

function DeckButton({ url, label }) {
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
      {label}
    </button>
  );
}

function DeckEmbed({ project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          border: "2.5px solid #C9963A",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        <iframe
          src={project.embedUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Section3PitchDeck({ onBack }) {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId);

  return (
    <motion.div
      key="pitch-deck-view"
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
          Pitch Decks
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

        {/* right: embed + description + button */}
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
          {/* deck embed */}
          <div style={{ width: "100%", flexShrink: 0 }}>
            <DeckEmbed project={active} />
          </div>

          {/* description */}
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

          {/* PDF + Credits buttons */}
          <div style={{ flexShrink: 0, marginTop: "8px", display: "flex", gap: "16px" }}>
            <DeckButton url={active.pdfUrl} label="PDF" />
            {active.creditsUrl && <DeckButton url={active.creditsUrl} label="Credits" />}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}