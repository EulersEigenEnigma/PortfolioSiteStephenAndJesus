"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function SendButton({ status }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const [label, setLabel] = useState("Send Message");
  const isLoading = status === "loading";
  const prevStatus = useRef(status);

  useEffect(() => {
    if (prevStatus.current !== "success" && status === "success") {
      setLabelVisible(false);
      setTimeout(() => { setLabel("Sent ✓"); setLabelVisible(true); }, 300);
      setTimeout(() => { setLabelVisible(false); }, 2800);
      setTimeout(() => { setLabel("Send Message"); setLabelVisible(true); }, 3100);
    }
    prevStatus.current = status;
  }, [status]);

  useEffect(() => {
    function reset() { setPressed(false); }
    document.addEventListener("click", reset);
    return () => document.removeEventListener("click", reset);
  }, []);

  return (
    <button
      type="submit"
      disabled={isLoading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); setPressed(true); }}
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
        cursor: isLoading ? "default" : "pointer",
        flexShrink: 0,
        boxShadow:
          hovered || pressed
            ? "0 0 24px rgba(201,150,58,0.45)"
            : "0 0 0px rgba(201,150,58,0)",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "background 0.3s, box-shadow 0.3s, transform 0.2s",
        opacity: isLoading ? 0.6 : 1,
        minWidth: "180px",
      }}
    >
      <span style={{ opacity: labelVisible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        {isLoading ? "Sending..." : label}
      </span>
    </button>
  );
}

export default function Section4ContactMe() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    fontFamily: "var(--font-primary)",
    fontSize: "clamp(13px, 1.1vw, 17px)",
    fontWeight: "500",
    letterSpacing: "0.03em",
    color: "#ffffff",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid #ffffff40",
    padding: "10px 0",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease",
    WebkitBoxShadow: "0 0 0px 1000px transparent inset",
    WebkitTextFillColor: "#ffffff",
  };

  const labelStyle = {
    fontFamily: "var(--font-primary)",
    fontSize: "clamp(10px, 0.85vw, 13px)",
    fontWeight: "700",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#C9963A",
  };

  return (
    <section
      id="contact"
      className="w-screen min-h-screen flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden"
    >
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
          -webkit-text-fill-color: #ffffff !important;
          transition: background-color 9999s ease-in-out 0s;
          caret-color: #ffffff;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 140 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex items-stretch gap-15"
        style={{ maxWidth: "1380px", marginTop: "7vh" }}
      >

        {/* Text — left */}
        <div
          className="flex flex-col py-1"
          style={{
            flex: 1,
            maxWidth: "690px",
            marginTop: "6px",
            gap: "30px",
            marginLeft: "7vw",
          }}
        >
          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(21.5px, 3.1vw, 84px)",
              fontWeight: "900",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#ffffff",
              marginBottom: "6px",
              cursor: "default",
            }}
            whileHover={{ color: "#C9963A" }}
          >
            Contact Me
          </motion.p>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(13.5px, 1.3vw, 23px)",
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "#ffffff",
              lineHeight: 1.82,
            }}
          >
            Have a project in mind or just want to say hello? Drop me a message
            and I'll get back to you.
          </motion.p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Stephen"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#C9963A")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#ffffff40")}
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="hello@example.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#C9963A")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "#ffffff40")}
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  autoComplete="off"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={3}
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(13px, 1.1vw, 17px)",
                    fontWeight: "500",
                    letterSpacing: "0.03em",
                    color: "#ffffff",
                    background: "transparent",
                    border: "2px solid #ffffff40",
                    padding: "12px",
                    outline: "none",
                    width: "100%",
                    resize: "none",
                    transition: "border-color 0.3s ease",
                    WebkitTextFillColor: "#ffffff",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9963A")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff40")}
                />
              </motion.div>

              {/* Submit row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
                <SendButton status={status} />

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "clamp(12px, 1vw, 15px)",
                      fontWeight: "500",
                      letterSpacing: "0.05em",
                      color: "#ff4444",
                      margin: 0,
                    }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </motion.div>

            </div>
          </form>
        </div>

        {/* Photo — right */}
        <div
          className="relative flex-shrink-0"
          style={{
            width: "clamp(225px, 23.5vw, 345px)",
            aspectRatio: "992 / 1580",
            border: "9px solid #C9963A",
            transform: "scale(1.0)"
          }}
        >
          <Image
            src="/images/sections/Section4Contact/SelahBeachCroppedForSite.png"
            alt="Contact photo"
            fill
            className="object-cover object-top"
          />
        </div>

      </motion.div>
    </section>
  );
}