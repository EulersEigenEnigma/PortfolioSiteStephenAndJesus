"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const POINTS = [
  {
    year: "1999",
    label: "Beginnings",
    detail:
      "Born And Raised In India. Studied All My School Years In India, Learning As Much As I Could.",
  },
  {
    year: "2017",
    label: "Philly Diaries",
    detail:
      "Started Studying Design And Mathematics At Drexel University, In Philadelphia — A Leap Across Continents!",
  },
  {
    year: "2021",
    label: "Graduated!",
    detail:
      "Graduated With A B.Sc In Computer Animation And Visual Effects. Began Working As A Freelancer!",
  },
  {
    year: "2022–23",
    label: "Zoic Studios",
    detail:
      "Worked As A Render Wrangler at Zoic Studios - Wrangled On Some Really Cool VFX Projects With The Best Folks! ",
  },
  {
    year: "2023–24",
    label: "Concentrix",
    detail:
      "Worked As a 3D Designer At Concentrix Catalyst, Developing Pipelines For Design And Technology.",
  },
  {
    year: "2025",
    label: "The Return",
    detail: "Moved back to India — New Grounds To Walk With The Lord!",
  },
  {
    year: "2026",
    label: "The Present",
    detail: "Creative Designer and Teacher— Just Working and Enjoying Life!",
  },
];

function Star({ active, hovered }) {
  const filled = active || hovered;
  return (
    <svg
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: 24,
        height: 24,
        flexShrink: 0,
        transition: "transform 0.3s",
        transform: filled
          ? "scale(1.4) rotate(15deg)"
          : "scale(1) rotate(0deg)",
      }}
    >
      <polygon
        points="9,1 10.8,7.2 17,9 10.8,10.8 9,17 7.2,10.8 1,9 7.2,7.2"
        fill={filled ? "#C9963A" : "#ffffff"}
        stroke="#C9963A"
        strokeWidth="1.5"
        style={{ transition: "fill 0.3s" }}
      />
    </svg>
  );
}

function TimelineNode({ point, index, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isOdd = index % 2 === 0;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: isOdd ? "column" : "column-reverse",
        alignItems: "center",
        cursor: "pointer",
        marginTop: isOdd ? "-100px" : "100px",
      }}
    >
      <div
        style={{
          background:
            active || hovered
              ? "rgba(201,150,58,0.14)"
              : "rgba(201,150,58,0.06)",
          border: `2px solid ${active || hovered ? "#C9963A" : "rgba(201,150,58,0.35)"}`,
          borderRadius: 10,
          padding: "14px 18px",
          width: 124,
          textAlign: "center",
          transition: "border-color 0.3s, background 0.3s",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: 15,
            fontWeight: 600,
            color: "#C9963A",
            letterSpacing: "0.08em",
          }}
        >
          {point.year}
        </div>
        <div
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: 13,
            color: "#ffffff",
            marginTop: 10,
            lineHeight: 1.4,
          }}
        >
          {point.label}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: 24,
          height: 76,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: isOdd ? 0 : -12,
            bottom: isOdd ? -12 : 0,
            width: 2,
            background:
              active || hovered
                ? "rgba(201,150,58,0.7)"
                : "rgba(201,150,58,0.35)",
            transition: "background 0.3s",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isOdd ? -12 : "auto",
            top: isOdd ? "auto" : -12,
            zIndex: 2,
          }}
        >
          <Star active={active} hovered={hovered} />
        </div>
      </div>
    </div>
  );
}

function ResumeButton() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    function reset() {
      setPressed(false);
    }
    document.addEventListener("click", reset);
    return () => document.removeEventListener("click", reset);
  }, []);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setPressed(true);

        // Opens your PDF resume
        window.open("/data/ResumeStephenAbraham.pdf", "_blank");
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
        boxShadow:
          hovered || pressed
            ? "0 0 24px rgba(201,150,58,0.45)"
            : "0 0 0px rgba(201,150,58,0)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
      }}
    >
      Resume
    </button>
  );
}

export default function Section2TimelineResume() {
  const [active, setActive] = useState(null);
  const [paths, setPaths] = useState({ segments: "", arrow: "" });
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    function handleClickOutside(e) {
      const clickedNode = nodeRefs.current.some(
        (el) => el && el.contains(e.target),
      );
      if (!clickedNode) {
        setActive(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const drawLines = useCallback(() => {
    const track = trackRef.current;
    if (!track || nodeRefs.current.length < 2) return;

    const trackRect = track.getBoundingClientRect();

    const centers = nodeRefs.current
      .map((el) => {
        if (!el) return null;
        const star = el.querySelector("svg");
        if (!star) return null;
        const r = star.getBoundingClientRect();
        return {
          x: r.left - trackRect.left + r.width / 2,
          y: r.top - trackRect.top + r.height / 2,
        };
      })
      .filter(Boolean);

    if (centers.length < 2) return;

    let d = `M ${centers[0].x} ${centers[0].y}`;
    for (let i = 1; i < centers.length; i++) {
      d += ` L ${centers[i].x} ${centers[i].y}`;
    }

    const last = centers[centers.length - 1];
    const secondLast = centers[centers.length - 2];
    const ext = 40;
    const angle = Math.atan2(last.y - secondLast.y, last.x - secondLast.x);
    const midX = last.x + Math.cos(angle) * ext;
    const midY = last.y + Math.sin(angle) * ext;
    const arrowD = `M ${last.x} ${last.y} L ${midX} ${midY} L ${midX + 120} ${midY}`;

    setPaths({ segments: d, arrow: arrowD });

    const svgEl = track.querySelector("svg");
    if (svgEl)
      svgEl.setAttribute(
        "viewBox",
        `0 0 ${trackRect.width} ${trackRect.height}`,
      );
  }, []);

  useEffect(() => {
    const t = setTimeout(drawLines, 80);
    window.addEventListener("resize", drawLines);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", drawLines);
    };
  }, [drawLines]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="w-screen min-h-screen flex flex-col items-center justify-center px-6 md:px-16 overflow-hidden"
      style={{ paddingTop: "16vh", paddingBottom: "18vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        className="w-full"
        style={{ maxWidth: 1300 }}
      >
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "38px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ color: "#C9963A" }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(22px, 3.2vw, 56px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ffffff",
              cursor: "default",
              transition: "color 0.3s ease",
            }}
          >
            Timeline
          </motion.p>
        </div>
        {/* Track */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            minWidth: 700,
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              overflow: "visible",
            }}
          >
            <defs>
              <marker
                id="tl-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="12"
                markerHeight="12"
                orient="auto"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#C9963A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            {paths.segments && (
              <path
                d={paths.segments}
                fill="none"
                stroke="#C9963A"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            )}

            {paths.arrow && (
              <path
                d={paths.arrow}
                fill="none"
                stroke="#C9963A"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#tl-arrow)"
              />
            )}
          </svg>

          {POINTS.map((point, i) => (
            <div
              key={i}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
            >
              <TimelineNode
                point={point}
                index={i}
                active={active === i}
                onClick={() => setActive(active === i ? null : i)}
              />
            </div>
          ))}
        </div>
        {/* Detail panel */}
        <div style={{ height: 110, marginTop: 34, padding: "0 24px" }}>
          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#C9963A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {POINTS[active].year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(10px, 1.5vw, 20px)",
                    color: "#ffffff",
                    lineHeight: 1.8,
                    maxWidth: 560,
                    margin: "0 auto",
                  }}
                >
                  {POINTS[active].detail}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.8)",
                  textAlign: "center",
                }}
              >
                Select a point to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {/* Footer — two column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center", // centers the whole thing horizontally
            marginTop: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 100,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(13px, 1.2vw, 16px)",
                color: "#ffffff",
                lineHeight: 1.7,
                maxWidth: 260,
                margin: 0,
              }}
            >
              While this timeline is a fun way to show my various checkpoints in
              this adventure, feel free to check my resume over here.
            </p>

            <ResumeButton />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
