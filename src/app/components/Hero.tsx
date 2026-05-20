import { motion } from "motion/react";
import { ArrowDown, Download, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6"
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-5"
        >
          {/* Availability pill */}
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{
              borderColor: "rgba(16,185,129,0.4)",
              background: "rgba(16,185,129,0.08)",
            }}
            aria-label="Currently available for senior roles, responds within 24 hours"
          >
            <span className="relative flex w-2 h-2" aria-hidden="true">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "#10b981" }}
              />
              <span
                className="relative inline-flex w-2 h-2 rounded-full"
                style={{ background: "#10b981" }}
              />
            </span>
            <span
              className="text-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
            >
              Available for senior roles · responds in 24h
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={13} aria-hidden="true" />
            <span
              className="tracking-widest uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.12em" }}
            >
              Barcelona · Open to remote
            </span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-foreground mb-1"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          Daniela Fermin Rennola
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-foreground mb-6 max-w-4xl"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="sr-only">
            Product Designer and Researcher turning user insights into products that ship.
          </span>
          <span aria-hidden="true">
            Product Designer
            <br />
            &amp; Researcher turning
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              insight into impact.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-muted-foreground max-w-xl mb-10"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          Senior UX Designer at HP with a strong background in UX research and project
          management. I uncover user insights, align business goals with user needs, and
          lead multidisciplinary teams to deliver user-centered digital products — across
          healthcare, tech, and consumer sectors. Strategic mindset, creative
          problem-solving, deep empathy for users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            View my work
          </a>
          <a
            href="/CV_Daniela_Fermin_Bunge.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-all hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            <Download size={15} aria-hidden="true" />
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-all hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-border"
          role="list"
          aria-label="Key highlights"
        >
          {[
            { value: "7+", label: "Years of experience" },
            { value: "3", label: "Product lines at HP" },
            { value: "2", label: "Live AI tools shipped" },
            { value: "4", label: "Languages spoken" },
          ].map((stat) => (
            <div key={stat.label} role="listitem">
              <div
                className="text-foreground"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>
              <div
                className="text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
                aria-hidden="true"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
