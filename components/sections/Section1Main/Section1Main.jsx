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

export default function Section1Main({ textReady }) {
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <section
      id="home"
      className="w-screen h-screen flex flex-col items-center justify-end pb-10"
    >
      <motion.div
        className="text-center px-6 flex flex-col items-center"
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
            fontSize: "clamp(36px, 6vw, 192px)",
            fontWeight: "1000",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.08,
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
            fontSize: "clamp(16px, 2.8vw, 30px)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: "30px",
          }}
        >
          A Creative Designer Inspired By The Lord Jesus
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "150px",
          }}
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
      </motion.div>
    </section>
  );
}
