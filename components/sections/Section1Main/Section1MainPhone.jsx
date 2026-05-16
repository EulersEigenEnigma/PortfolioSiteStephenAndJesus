"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollArrow from "@/components/ui/general/ScrollArrow";

// Gold color: #C9963A

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

export default function Section1MainPhone({ textReady }) {
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <section
      id="home"
      className="w-screen h-screen flex flex-col items-center justify-end pb-10"
    >
      return (
      <section
        id="home"
        className="w-screen h-screen flex flex-col items-center justify-between py-10"
      >
        {/* Spacer to push text to center */}
        <div />

        <motion.div
          className="text-center pt-20 px-8 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate={textReady ? "visible" : "hidden"}
        >
          <motion.h1
            variants={itemVariants}
            animate={{
              color: arrowHovered ? "#C9963A" : "#ffffff",
            }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(32px, min(10.5vw, 8vh), 68px)",
              fontWeight: "1000",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            Stephen Abraham
          </motion.h1>

          <motion.p
            variants={itemVariants}
            animate={{
              color: arrowHovered ? "#C9963A" : "#ffffff",
            }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(10px, min(3.5vw, 2.5vh), 17px)",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              marginTop: "2.5vh",
            }}
          >
            A Creative Designer Inspired By The Lord Jesus
          </motion.p>
        </motion.div>

        {/* Arrow pinned to bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={textReady ? "visible" : "hidden"}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
        >
          <ScrollArrow
            onClick={() => {
              const target = document.getElementById("about");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </motion.div>
      </section>
      );
    </section>
  );
}
