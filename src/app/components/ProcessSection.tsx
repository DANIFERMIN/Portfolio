import { motion } from "motion/react";

const principles = [
  {
    title: "I write the press release before the spec.",
    body:
      "If I can't draft the launch announcement on day one, I don't understand the problem yet. The press release forces me to name the outcome a real human will feel — before I burn a sprint shipping the wrong thing.",
    accent: "#6366f1",
  },
  {
    title: "Research is a verb, not a phase.",
    body:
      "I don't run a research phase and hand off. I keep a live channel with users — async interviews, Hotjar replays, Maze tests — through every sprint. The team gets a steady drip of evidence instead of a stale 80-page deck.",
    accent: "#8b5cf6",
  },
  {
    title: "The worst version ships on day three.",
    body:
      "I'd rather put an ugly, end-to-end flow in front of users in 72 hours than a beautiful half-flow in three weeks. Real reactions beat predicted ones. Every time.",
    accent: "#ec4899",
  },
  {
    title: "Handoff is a product, not an afterthought.",
    body:
      "Engineers are users too. I version my Figma files, write spec like documentation, and stay in the PR review loop. Design intent that survives implementation is the only design intent that counts.",
    accent: "#f59e0b",
  },
  {
    title: "Internal tools deserve the same craft as external ones.",
    body:
      "Buddy Picker and AI Journey aren't side quests — they're proof that the same rigour I bring to OMEN GaaS makes the team I work with measurably faster. The best UX work is sometimes for the eight people sitting next to you.",
    accent: "#10b981",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-6 py-24 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-3xl"
        >
          <span
            className="inline-block text-muted-foreground mb-3 tracking-widest uppercase"
            style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}
            aria-hidden="true"
          >
            How I actually work
          </span>
          <h2
            id="process-heading"
            className="text-foreground mb-4"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Five principles, not a phase diagram.
          </h2>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            Every portfolio shows the same discover → define → design → deliver loop.
            Here's the part that actually changes how a project ships — the rules I
            hold myself to when nobody's watching.
          </p>
        </motion.div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Working principles">
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative p-6 rounded-2xl border border-border bg-card"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 right-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: p.accent,
                }}
              >
                0{i + 1}
              </span>
              <h3
                className="text-foreground mb-3 pr-8"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "0.88rem", lineHeight: 1.7 }}
              >
                {p.body}
              </p>
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full"
                style={{ background: p.accent }}
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
