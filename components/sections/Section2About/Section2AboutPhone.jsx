"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Section2AboutPhone() {
  const textFade = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.3 },
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  };

  return (
    <section
      id="about"
      className="w-screen min-h-screen flex flex-col items-center justify-start px-6 py-10 overflow-y-auto"
    >
      {/* Photo — landscape crop, 80% width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        className="relative flex-shrink-0"
        style={{
          width: "80%",
          aspectRatio: "4 / 3",
          border: "6px solid #C9963A",
          marginTop: "4vh",
        }}
      >
        <Image
          src="/images/sections/Section2/WebsiteProfilePicture.png"
          alt="Profile"
          fill
          className="object-cover"
          style={{ objectPosition: "center 10%" }}
          priority
        />
      </motion.div>

      {/* Text block — all children share the same whileInView trigger */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center text-center w-full"
        style={{ marginTop: "4vh", gap: "2.5vh", paddingBottom: "5vh" }}
      >
        {/* Heading */}
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(26px, 6.5vw, 38px)",
            fontWeight: "900",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#ffffff",
            cursor: "default",
          }}
        >
          About Me
        </p>

        {/* Paragraph 1 — passion + faith + skills */}
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(13px, 3.4vw, 19.5px)",
            fontWeight: "500",
            letterSpacing: "0.025em",
            color: "#ffffff",
            lineHeight: 1.78,
            maxWidth: "200%",
            marginTop: "2vh",
          }}
        >
           Hey! I&apos;m Stephen — a designer who loves creating with purpose and
          doing it all with&nbsp;Jesus. I specialise in Pitch Decks for any
          design needs, Design Animations, and Graphic Design, using both 2D
          and 3D skills to achieve this! I&apos;m also flexible for other
          design needs if required.
        </p>
        {/* Paragraph 2 — personality */}
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(13px, 3.4vw, 19.5px)",
            fontWeight: "500",
            letterSpacing: "0.025em",
            color: "#ffffff",
            lineHeight: 1.78,
            maxWidth: "200%",
            marginTop: "3vh",
          }}
        >
          Outside of work I'm pretty simple — a good Tuna sandwich, Oasis or
          Worship Music, Maths, and Theology. I love meeting new people,
          because at the end of the day it's people and culture that make
          life beautiful.
        </p>
      </motion.div>
    </section>
  );
}