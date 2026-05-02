"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Section2About() {
  return (
    <section
      id="about"
      className="w-screen min-h-screen flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 140 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex items-stretch gap-15"
        style={{ maxWidth: "1380px", marginTop: "7vh" }}
      >
        {/* Photo — left */}
        <div
          className="relative flex-shrink-0"
          style={{
            width: "clamp(225px, 23.5vw, 345px)",
            aspectRatio: "561 / 831",
            border: "9px solid #C9963A",
            marginLeft: "7vw",
          }}
        >
          <Image
            src="/images/sections/Section2/WebsiteProfilePicture.png"
            alt="Profile"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Text — right */}
        <div
          className="flex flex-col py-1"
          style={{
            flex: 1,
            maxWidth: "690px",
            marginTop: "6px",
            gap: "30px",
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
            About Me
          </motion.p>

          {/* Paragraph 1 */}
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
            Hey! My name is Stephen. I love design with a passion, and I consider
            it a blessing to do this with Jesus. I love creatively designing and
            visualizing innovative solutions to help people using my 2D and 3D skills.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.45 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(13.5px, 1.3vw, 23px)",
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "#ffffff",
              lineHeight: 1.82,
            }}
          >
            Currently, I specialize in Pitch Decks creation, Design Animations, and
            Graphic Designs. However, I am also willing to see how we can work
            creatively on a project as well!
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(13.5px, 1.3vw, 23px)",
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "#ffffff",
              lineHeight: 1.82,
            }}
          >
            As for me, I'm a simple guy. I love a good Tuna sandwich, some
            Oasis songs or Worship Music, Math, and Theology. I love meeting new
            people and making friends because that’s the beauty of life — people
            and culture! 
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}