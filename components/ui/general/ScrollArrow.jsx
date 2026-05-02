"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ScrollArrow({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      aria-label="Scroll Down"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
    >
      <motion.div
        animate={{
          y: hovered ? [0, 8, 0] : [0, 6, 0],
        }}
        transition={{
          duration: hovered ? 0.6 : 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-[3px]"
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            animate={{
              borderColor: hovered ? "#C9963A" : "#ffffff",
              opacity: hovered ? 1 : 0.9,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
            }}
            style={{
              width: "20px",
              height: "20px",
              borderRight: "2.5px solid",
              borderBottom: "2.5px solid",
              transform: "rotate(45deg)",
              display: "block",
            }}
          />
        ))}
      </motion.div>
    </button>
  );
}
