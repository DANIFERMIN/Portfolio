import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Project } from "./projects-data";
import { projects } from "./projects-data";

// ── Actual Figma design screenshots ───────────────────────────────────────────
import omenImg from "../../imports/image.png";
import esignImg from "../../imports/image-1.png";
import createMobileImg from "../../imports/image-2.png";
import createDesktopImg from "../../imports/image-3.png";
import pcPilotImg from "../../imports/image-4.png";
import aiJourneyQ2Img from "../../imports/image-6.png";
import aiJourneyGoalsImg from "../../imports/image-8.png";
import aiJourneyPathImg from "../../imports/image-9.png";
import aiJourneyPlanImg from "../../imports/image-11.png";
import buddyPickerImg from "../../imports/image-12.png";
import buddyPickerHeroImg from "../../imports/image-14.png";

// ── Frame type ────────────────────────────────────────────────────────────────
interface Frame {
  src: string;
  objectPosition: string;
  label: string;
  caption: string;
  isDesign?: boolean;
}

// ── Per-project design frame configs ─────────────────────────────────────────
const designFrames: Record<string, Frame[]> = {
  "omen-gaas": [
    { src: omenImg, objectPosition: "50% 2%", label: "Landing", caption: "'Elevate your game with one gaming subscription' — value prop and entry CTA designed to convert on first impression, with hardware previews above the fold.", isDesign: true },
    { src: omenImg, objectPosition: "50% 27%", label: "Laptop Selection", caption: "Hardware catalogue with subscription tiers — card-based comparison reduces decision paralysis and surfaces the right device without overwhelming specs.", isDesign: true },
    { src: omenImg, objectPosition: "50% 62%", label: "Value Proposition", caption: "'The OMEN Gaming Subscription difference' — social proof and trust signals designed to close hesitant users at the bottom of the funnel.", isDesign: true },
  ],
  "next-gen-pc": [
    { src: pcPilotImg, objectPosition: "50% 0%", label: "Hero", caption: "HP Laptop Subscription — clear hero communicating the core benefit: premium hardware without the upfront cost, with immediate plan discovery CTA.", isDesign: true },
    { src: pcPilotImg, objectPosition: "50% 28%", label: "Plan Discovery", caption: "'Discover your perfect plan' — card-based comparison with the recommended tier visually foregrounded, designed for fast scanning and confident selection.", isDesign: true },
    { src: pcPilotImg, objectPosition: "50% 65%", label: "Getting Started", caption: "Onboarding steps and customer testimonials — reducing friction at the conversion point with social proof and a clear 3-step visual journey.", isDesign: true },
  ],
  "create-pilot": [
    { src: createDesktopImg, objectPosition: "50% 0%", label: "Desktop Hero", caption: "HP Create desktop — 'Bring your images to life' hero with lifestyle imagery, designed for high-intent users landing from HP.com product pages.", isDesign: true },
    { src: createMobileImg, objectPosition: "50% 2%", label: "Mobile View", caption: "HP Create mobile — the same product fully adapted for small screens. Single-column navigation, thumb-friendly CTAs, and a condensed category grid.", isDesign: true },
    { src: createDesktopImg, objectPosition: "50% 30%", label: "Product Grid", caption: "Category grid: Prints, Photo Books, Mugs, Wall Art, AI Designer, Calendars — handoff covered all states, hover interactions, and responsive breakpoints.", isDesign: true },
  ],
  "esign-redesign": [
    { src: esignImg, objectPosition: "8% 20%", label: "Overview", caption: "E-sign platform overview — entry point designed to serve three distinct user groups: document senders, signers, and enterprise IT admins simultaneously.", isDesign: true },
    { src: esignImg, objectPosition: "42% 15%", label: "Signing Flow", caption: "Redesigned signing flow — progressive disclosure replaced the original 12-step linear process. Key actions surface contextually to reduce cognitive load.", isDesign: true },
    { src: esignImg, objectPosition: "78% 8%", label: "Document Management", caption: "Document status view — streamlined to show what matters: pending signatures, completion status, and audit trail access in a single glance.", isDesign: true },
  ],
  "ai-journey": [
    { src: aiJourneyQ2Img, objectPosition: "50% 40%", label: "Personalization", caption: "Step 2 of 6 — role selection. The entire learning plan changes based on your job: Product Designer, UX Researcher, Design Manager, or VX Designer each get a different module set.", isDesign: true },
    { src: aiJourneyGoalsImg, objectPosition: "50% 30%", label: "Goals", caption: "Goal selection — designers pick what they actually want to learn, so the resulting plan reflects real intent rather than generic 'AI 101' modules.", isDesign: true },
    { src: aiJourneyPathImg, objectPosition: "50% 50%", label: "Path Building", caption: "The 'aha moment' — as you answer, your personalized path takes shape in real time below the question. Modules appear live, building anticipation before you finish.", isDesign: true },
    { src: aiJourneyPlanImg, objectPosition: "50% 0%", label: "Your Plan", caption: "The payoff: a named personal plan with 5 curated modules, tool tags (Claude, ChatGPT, Figma AI), time estimates, and a progress tracker — ready to open immediately.", isDesign: true },
  ],
  "buddy-picker": [
    { src: buddyPickerHeroImg, objectPosition: "50% 0%", label: "Hero", caption: "Buddy Picker landing — the entry point that sets up the 'which AI tool should I use right now?' framing and invites the user into the matching flow.", isDesign: true },
    { src: buddyPickerImg, objectPosition: "50% 0%", label: "Matching Engine", caption: "The 3-question matching engine — task type, output format, time available — surfaces the right AI tool in under 10 seconds.", isDesign: true },
    { src: buddyPickerImg, objectPosition: "50% 50%", label: "Recommendation", caption: "Shipped on Vercel as a real React app. Used daily across the team — proof that designers building internal tools is a multiplier.", isDesign: true },
  ],
};

function getFrames(project: Project): Frame[] {
  const design = designFrames[project.id];
  if (design) return design;
  return project.frames.map((f) => ({
    src: f.url,
    objectPosition: "center",
    label: f.label,
    caption: f.caption,
    isDesign: false,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

export function ProjectPage({ project, onBack }: ProjectPageProps) {
  const [activeFrame, setActiveFrame] = useState(0);
  const frames = getFrames(project);
  const current = frames[activeFrame];

  // ── Mobile detection ──
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // ── Swipe left/right on image to change frames ──
  const frameSwipeRef = useRef<{ startX: number; startY: number } | null>(null);

  const handleFrameSwipeStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    frameSwipeRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, [isMobile]);

  const handleFrameSwipeEnd = useCallback((e: React.TouchEvent) => {
    if (!frameSwipeRef.current || !isMobile) return;
    const dx = e.changedTouches[0].clientX - frameSwipeRef.current.startX;
    const dy = e.changedTouches[0].clientY - frameSwipeRef.current.startY;
    frameSwipeRef.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) {
        setActiveFrame(f => Math.min(f + 1, frames.length - 1));
      } else {
        setActiveFrame(f => Math.max(f - 1, 0));
      }
    }
  }, [isMobile, frames.length]);

  // Reset frame when project changes
  useEffect(() => {
    setActiveFrame(0);
    window.scrollTo(0, 0);
  }, [project.id]);

  // Keyboard nav for frames
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveFrame(f => Math.min(f + 1, frames.length - 1));
      if (e.key === "ArrowLeft") setActiveFrame(f => Math.max(f - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frames.length]);

  const nextProject = projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky back bar ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            All projects
          </button>
          <span
            className="text-foreground/70 truncate max-w-[50%]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
          >
            {project.company} · {project.year}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* ── Hero: metric + title ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-baseline gap-2 mb-4 px-3.5 py-1.5 rounded-full"
            style={{
              background: `${project.accentColor}14`,
              border: `1px solid ${project.accentColor}33`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "-0.02em",
                color: project.accentColor,
                lineHeight: 1,
              }}
            >
              {project.metric.value}
            </span>
            <span
              className="text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
            >
              {project.metric.label}
            </span>
          </div>
          <h1
            className="text-foreground mb-2"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            {project.title}
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem" }}
          >
            {project.company} · {project.year} · {project.role}
          </p>
        </motion.div>

        {/* ── Image viewer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative rounded-t-2xl overflow-hidden bg-[#0a0a0a]"
          style={{ height: isMobile ? "clamp(240px, 45vh, 360px)" : "clamp(300px, 50vh, 480px)" }}
          onTouchStart={handleFrameSwipeStart}
          onTouchEnd={handleFrameSwipeEnd}
        >
          <img
            src={current.src}
            alt={`${project.title} — ${current.label}`}
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: current.objectPosition }}
          />

          {/* Gradient scrim — top only for badges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 35%, transparent 100%)",
            }}
          />

          {/* Badges — solid opaque backgrounds */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {current.isDesign && (
              <span
                className="px-2.5 py-1 rounded-md text-white"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                Design
              </span>
            )}
            <span
              className="px-3 py-1 rounded-full text-white"
              style={{
                background: project.accentColor,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              {current.label}
            </span>
          </div>
        </motion.div>

        {/* Caption + dots — solid dark bar below image */}
        <div
          className="rounded-b-2xl px-4 md:px-6 pt-3 pb-3 mb-8"
          style={{ background: "#111111" }}
        >
          <p
            className="text-white/90 mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "0.75rem" : "0.82rem",
              lineHeight: 1.55,
            }}
          >
            {current.caption}
          </p>
          <div className="flex items-center justify-center md:justify-between">
            {/* Dots */}
            <div className="flex items-center gap-1 md:gap-1.5" role="tablist" aria-label="Frames">
              {frames.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeFrame}
                  aria-label={`Frame ${i + 1}: ${frames[i].label}`}
                  onClick={() => setActiveFrame(i)}
                  className="relative flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{ minWidth: "44px", minHeight: "44px" }}
                >
                  <span
                    className="block rounded-full transition-all duration-200"
                    style={{
                      width: i === activeFrame ? "20px" : "8px",
                      height: "8px",
                      background: i === activeFrame ? project.accentColor : "rgba(255,255,255,0.4)",
                    }}
                  />
                </button>
              ))}
            </div>
              {/* Arrows — desktop only */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setActiveFrame(f => Math.max(f - 1, 0))}
                  disabled={activeFrame === 0}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous frame"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setActiveFrame(f => Math.min(f + 1, frames.length - 1))}
                  disabled={activeFrame === frames.length - 1}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next frame"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

        {/* ── Case study content ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Context */}
          <div className="mb-6">
            <h2
              className="text-muted-foreground mb-2 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
            >
              Context
            </h2>
            <p
              className="text-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", lineHeight: 1.72 }}
            >
              {project.description}
            </p>
          </div>

          {/* The challenge */}
          <div
            className="mb-6 p-4 md:p-5 rounded-xl border-l-4"
            style={{ background: `${project.accentColor}0D`, borderColor: project.accentColor }}
          >
            <h2
              className="mb-1.5 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em", color: project.accentColor }}
            >
              The challenge
            </h2>
            <p
              className="text-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.68 }}
            >
              {project.challenge}
            </p>
          </div>

          {/* The move */}
          <div className="mb-6">
            <h2
              className="text-muted-foreground mb-2 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
            >
              The move
            </h2>
            <p
              className="text-foreground"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "1.02rem",
                lineHeight: 1.55,
                letterSpacing: "-0.01em",
              }}
            >
              {project.keyMove}
            </p>
          </div>

          {/* Outcomes */}
          <div className="mb-8">
            <h2
              className="text-muted-foreground mb-3 uppercase"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
            >
              Artifacts &amp; outcomes
            </h2>
            <ul className="space-y-2.5">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: project.accentColor }}
                  />
                  <span
                    className="text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", lineHeight: 1.62 }}
                  >
                    {outcome}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer actions */}
          <div className="pt-6 border-t border-border flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3 md:justify-between">
            {project.externalLink ? (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
                style={{
                  background: project.accentColor,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                View live product
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => {
                window.location.hash = `#/project/${nextProject.id}`;
              }}
              className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border text-foreground hover:bg-secondary transition-all"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.85rem" }}
              aria-label={`Open next case study: ${nextProject.title}`}
            >
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                Next case
              </span>
              <span>{nextProject.title}</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
