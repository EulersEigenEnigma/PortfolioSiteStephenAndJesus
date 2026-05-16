"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      "Worked As A Render Wrangler at Zoic Studios - Wrangled On Some Really Cool VFX Projects With The Best Folks!",
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
        width: 18,
        height: 18,
        flexShrink: 0,
        display: "block",
        transition: "transform 0.3s",
        transform: filled ? "scale(1.4) rotate(15deg)" : "scale(1) rotate(0deg)",
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

function Card({ point, active, hovered }) {
  return (
    <div
      style={{
        background: active || hovered ? "rgba(201,150,58,0.14)" : "rgba(201,150,58,0.06)",
        border: `1.5px solid ${active || hovered ? "#C9963A" : "rgba(201,150,58,0.3)"}`,
        borderRadius: 8,
        padding: "6px 10px",
        transition: "border-color 0.3s, background 0.3s",
        textAlign: "center",
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: 10.5,
          fontWeight: 700,
          color: "#C9963A",
          letterSpacing: "0.07em",
          whiteSpace: "nowrap",
        }}
      >
        {point.year}
      </div>
      <div
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: 10,
          color: "#ffffff",
          marginTop: 3,
          lineHeight: 1.3,
          letterSpacing: "0.02em",
        }}
      >
        {point.label}
      </div>
    </div>
  );
}

function ResumeButton() {
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
        window.open("/data/ResumeStephenAbraham.pdf", "_blank");
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#ffffff",
        background: hovered || pressed ? "rgba(201,150,58,0.85)" : "#C9963A",
        border: "2px solid #C9963A",
        borderRadius: 7,
        padding: "10px 32px",
        cursor: "pointer",
        boxShadow: hovered || pressed ? "0 0 20px rgba(201,150,58,0.4)" : "none",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
      }}
    >
      Resume
    </button>
  );
}

function ZigZagRow({ point, isLeft, isFirst, active, onClick, starRef }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: isFirst ? 0 : "1.9vh",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      {/* Left slot */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 12 }}>
        {isLeft && <Card point={point} active={active} hovered={hovered} />}
      </div>

      {/* Star — centre spine */}
      <div
        ref={starRef}
        style={{
          width: 24,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Star active={active} hovered={hovered} />
      </div>

      {/* Right slot */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-start", paddingLeft: 12 }}>
        {!isLeft && <Card point={point} active={active} hovered={hovered} />}
      </div>
    </div>
  );
}

export default function Section2TimelineResumePhone() {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);
  const starRefs = useRef([]);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      const first = starRefs.current[0];
      const last = starRefs.current[POINTS.length - 1];
      if (!track || !first || !last) return;

      const trackRect = track.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const top = firstRect.top + firstRect.height / 2 - trackRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - trackRect.top;
      setLineStyle({ top, height: bottom - top });
    }

    const id = requestAnimationFrame(() => setTimeout(measure, 50));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="timeline"
      className="w-screen flex flex-col items-center px-4"
      style={{
        height: "100vh",
        justifyContent: "center",
        paddingTop: "5vh",
        paddingBottom: "5vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex flex-col items-center"
        style={{ gap: 0 }}
      >
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          whileHover={{ color: "#C9963A" }}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(22px, 5.5vw, 32px)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ffffff",
            cursor: "default",
            marginBottom: "2.5vh",
            transition: "color 0.3s ease",
          }}
        >
          Timeline
        </motion.p>

        {/* Zig-zag track */}
        <div ref={trackRef} style={{ position: "relative", width: "100%" }}>
          {/* Spine line anchored first→last star */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: lineStyle.top,
              height: lineStyle.height,
              width: 2,
              background: "rgba(201,150,58,0.38)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {POINTS.map((point, i) => (
            <ZigZagRow
              key={i}
              point={point}
              isLeft={i % 2 === 0}
              isFirst={i === 0}
              active={active === i}
              onClick={() => setActive(active === i ? null : i)}
              starRef={(el) => { starRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Detail panel — fixed height so layout doesn't jump */}
        <div
          style={{
            height: 56,
            width: "100%",
            marginTop: "2vh",
            textAlign: "center",
            padding: "0 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{ textAlign: "center" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#C9963A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {POINTS[active].year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(11px, 3vw, 13px)",
                    color: "#ffffff",
                    lineHeight: 1.65,
                    maxWidth: "88%",
                    margin: "0 auto",
                  }}
                >
                  {POINTS[active].detail}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                Tap a point to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Thin divider */}
        <div
          style={{
            width: "90%",
            height: 1,
            background: "rgba(201,150,58,0.2)",
            margin: "2vh 0",
          }}
        />

        {/* Blurb + Resume button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.6vh",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(11px, 3vw, 13px)",
              color: "#ffffff",
              lineHeight: 1.7,
              maxWidth: "80%",
            }}
          >
            While this timeline is a fun way to show my various checkpoints in
            this adventure, feel free to check my resume over here.
          </p>

          <ResumeButton />
        </motion.div>
      </motion.div>
    </section>
  );
}