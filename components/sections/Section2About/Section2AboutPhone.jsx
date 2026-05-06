"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Section2AboutPhone() {
  return (
    <section
      id="about"
      className="w-screen min-h-screen flex flex-col items-center justify-start px-6 py-12 overflow-y-auto"
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
          style = {{objectPosition: "center 10%" }}
          priority
        />
      </motion.div>

      {/* Text — below photo */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="flex flex-col items-center text-center w-full"
        style={{ marginTop: "4vh", gap: "3vh" }}
      >
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
          whileHover={{ color: "#C9963A" }}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(28px, 7vw, 42px)",
            fontWeight: "900",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#ffffff",
            cursor: "default",
          }}
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
            fontSize: "clamp(14.5px, 3.8vw, 17px)",
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
            fontSize: "clamp(14.5px, 3.8vw, 17px)",
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
            fontSize: "clamp(14.5px, 3.8vw, 17px)",
            fontWeight: "500",
            letterSpacing: "0.03em",
            color: "#ffffff",
            lineHeight: 1.82,
            paddingBottom: "4vh",
          }}
        >
          As for me, I'm a simple guy. I love a good Tuna sandwich, some
          Oasis songs or Worship Music, Math, and Theology. I love meeting new
          people and making friends because that's the beauty of life — people
          and culture!
        </motion.p>
      </motion.div>
    </section>
  );
}