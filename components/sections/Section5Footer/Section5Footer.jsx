"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Section5Footer() {
  return (
    <section
      id="footer"
      className="w-screen flex flex-col"
      style={{ minHeight: "100vh", position: "relative", scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      {/* Verse — centered in the section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(24px, 8vw, 160px)",
          paddingBottom: "clamp(40px, 6vh, 80px)",
          paddingTop: "clamp(60px, 12vh, 140px)",
        }}
      >
        <motion.p
          whileHover={{ color: "#C9963A" }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(20px, 2.6vw, 42px)",
            fontWeight: "500",
            letterSpacing: "0.07em",
            color: "#ffffff",
            lineHeight: 1.75,
            marginBottom: "16px",
            fontStyle: "italic",
            cursor: "default",
          }}
        >
          "If we are faithless, He is Faithful —
          <br />
          For He cannot deny Himself."
        </motion.p>
        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(13px, 1.1vw, 19px)",
            fontWeight: "700",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C9963A",
          }}
        >
          2 Timothy 2:13
        </p>
      </motion.div>

      {/* Footer bar */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        style={{
          width: "100%",
          background: "#000000",
          borderTop: "2px solid #C9963A",
          padding: "clamp(28px, 4vh, 52px) clamp(24px, 7vw, 100px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexShrink: 0,
        }}
      >
        {/* Left — contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { text: "Stephen Abraham", bold: true },
            { text: "lkjmo12@gmail.com", bold: false },
            { text: "+91-9220901193", bold: false },
            { text: "linkedin.com/in/sa3465", bold: false },
          ].map(({ text, bold }, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(13px, 1.1vw, 17px)",
                fontWeight: bold ? "700" : "500",
                letterSpacing: bold ? "0.1em" : "0.04em",
                textTransform: bold ? "uppercase" : "none",
                color: "#C9963A",
                margin: 0,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Right — site logo */}
        <div
          style={{
            position: "relative",
            width: "clamp(80px, 9vw, 140px)",
            aspectRatio: "1 / 1",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/sections/SplashScreen/Logo/SiteColorLogo.png"
            alt="Site logo"
            fill
            className="object-contain"
          />
        </div>
      </motion.footer>
    </section>
  );
}