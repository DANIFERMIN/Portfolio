import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Project } from "./projects-data";

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
    {
      src: omenImg,
      objectPosition: "50% 2%",
      label: "Landing",
      caption: "'Elevate your game with one gaming subscription' — value prop and entry CTA designed to convert on first impression, with hardware previews above the fold.",
      isDesign: true,
    },
    {
      src: omenImg,
      objectPosition: "50% 27%",
      label: "Laptop Selection",
      caption: "Hardware catalogue with subscription tiers — card-based comparison reduces decision paralysis and surfaces the right device without overwhelming specs.",
      isDesign: true,
    },
    {
      src: omenImg,
      objectPosition: "50% 62%",
      label: "Value Proposition",
      caption: "'The OMEN Gaming Subscription difference' — social proof and trust signals designed to close hesitant users at the bottom of the funnel.",
      isDesign: true,
    },
  ],
  "next-gen-pc": [
    {
      src: pcPilotImg,
      objectPosition: "50% 0%",
      label: "Hero",
      caption: "HP Laptop Subscription — clear hero communicating the core benefit: premium hardware without the upfront cost, with immediate plan discovery CTA.",
      isDesign: true,
    },
    {
      src: pcPilotImg,
      objectPosition: "50% 28%",
      label: "Plan Discovery",
      caption: "'Discover your perfect plan' — card-based comparison with the recommended tier visually foregrounded, designed for fast scanning and confident selection.",
      isDesign: true,
    },
    {
      src: pcPilotImg,
      objectPosition: "50% 65%",
      label: "Getting Started",
      caption: "Onboarding steps and customer testimonials — reducing friction at the conversion point with social proof and a clear 3-step visual journey.",
      isDesign: true,
    },
  ],
  "create-pilot": [
    {
      src: createDesktopImg,
      objectPosition: "50% 0%",
      label: "Desktop Hero",
      caption: "HP Create desktop — 'Bring your images to life' hero with lifestyle imagery, designed for high-intent users landing from HP.com product pages.",
      isDesign: true,
    },
    {
      src: createMobileImg,
      objectPosition: "50% 2%",
      label: "Mobile View",
      caption: "HP Create mobile — the same product fully adapted for small screens. Single-column navigation, thumb-friendly CTAs, and a condensed category grid.",
      isDesign: true,
    },
    {
      src: createDesktopImg,
      objectPosition: "50% 30%",
      label: "Product Grid",
      caption: "Category grid: Prints, Photo Books, Mugs, Wall Art, AI Designer, Calendars — handoff covered all states, hover interactions, and responsive breakpoints.",
      isDesign: true,
    },
  ],
  "esign-redesign": [
    {
      src: esignImg,
      objectPosition: "50% 0%",
      label: "Overview",
      caption: "E-sign platform overview — entry point designed to serve three distinct user groups: document senders, signers, and enterprise IT admins simultaneously.",
      isDesign: true,
    },
    {
      src: esignImg,
      objectPosition: "50% 38%",
      label: "Signing Flow",
      caption: "Redesigned signing flow — progressive disclosure replaced the original 12-step linear process. Key actions surface contextually to reduce cognitive load.",
      isDesign: true,
    },
    {
      src: esignImg,
      objectPosition: "50% 72%",
      label: "Document Management",
      caption: "Document status view — streamlined to show what matters: pending signatures, completion status, and audit trail access in a single glance.",
      isDesign: true,
    },
  ],
  "ai-journey": [
    {
      src: aiJourneyQ2Img,
      objectPosition: "50% 40%",
      label: "Personalization",
      caption: "Step 2 of 6 — role selection. The entire learning plan changes based on your job: Product Designer, UX Researcher, Design Manager, or VX Designer each get a different module set.",
      isDesign: true,
    },
    {
      src: aiJourneyGoalsImg,
      objectPosition: "50% 30%",
      label: "Goals",
      caption: "Goal selection — designers pick what they actually want to learn, so the resulting plan reflects real intent rather than generic 'AI 101' modules.",
      isDesign: true,
    },
    {
      src: aiJourneyPathImg,
      objectPosition: "50% 50%",
      label: "Path Building",
      caption: "The 'aha moment' — as you answer, your personalized path takes shape in real time below the question. Modules appear live, building anticipation before you finish.",
      isDesign: true,
    },
    {
      src: aiJourneyPlanImg,
      objectPosition: "50% 0%",
      label: "Your Plan",
      caption: "The payoff: a named personal plan with 5 curated modules, tool tags (Claude, ChatGPT, Figma AI), time estimates, and a progress tracker — ready to open immediately.",
      isDesign: true,
    },
  ],
  "buddy-picker": [
    {
      src: buddyPickerHeroImg,
      objectPosition: "50% 0%",
      label: "Hero",
      caption: "Buddy Picker landing — the entry point that sets up the 'which AI tool should I use right now?' framing and invites the user into the matching flow.",
      isDesign: true,
    },
    {
      src: buddyPickerImg,
      objectPosition: "50% 0%",
      label: "Matching Engine",
      caption: "The 3-question matching engine — task type, output format, time available — surfaces the right AI tool in under 10 seconds.",
      isDesign: true,
    },
    {
      src: buddyPickerImg,
      objectPosition: "50% 50%",
      label: "Recommendation",
      caption: "Shipped on Vercel as a real React app. Used daily across the team — proof that designers building internal tools is a multiplier.",
      isDesign: true,
    },
  ],
};

// For projects without design frames, convert project.frames to Frame[]
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

interface ProjectModalProps {
  project: Project | null;
  allProjects?: Project[];
  onClose: () => void;
  onNavigateNext?: (current: Project) => void;
}

export function ProjectModal({ project, allProjects, onClose, onNavigateNext }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // ── Swipe-to-dismiss on mobile ──
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartRef = useRef<{ y: number; scrollTop: number } | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const el = sheetRef.current;
    if (!el || !isMobile) return;
    touchStartRef.current = { y: e.touches[0].clientY, scrollTop: el.scrollTop };
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || !isMobile) return;
    const el = sheetRef.current;
    if (!el) return;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    // Only drag-to-dismiss when scrolled to the top and pulling down
    if (touchStartRef.current.scrollTop <= 0 && dy > 0) {
      setIsDragging(true);
      setDragY(dy);
    }
  }, [isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) { touchStartRef.current = null; return; }
    if (dragY > 120) {
      onClose();
    }
    setDragY(0);
    setIsDragging(false);
    touchStartRef.current = null;
  }, [isDragging, dragY, onClose]);

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
    // Only count horizontal swipes (dx bigger than dy, and at least 40px)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) {
        setActiveFrame(f => Math.min(f + 1, frames.length - 1));
      } else {
        setActiveFrame(f => Math.max(f - 1, 0));
      }
    }
  }, [isMobile, frames.length]);

  const nextProject =
    project && allProjects
      ? allProjects[(allProjects.findIndex((p) => p.id === project.id) + 1) % allProjects.length]
      : null;

  const frames = project ? getFrames(project) : [];
  const current = frames[activeFrame];

  useEffect(() => {
    setActiveFrame(0);
    setLightboxOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [project?.id]);

  useEffect(() => {
    // Reset zoom/pan whenever the lightbox closes or active frame changes
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [lightboxOpen, activeFrame]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        onClose(); return;
      }
      if (!project || frames.length === 0) return;
      if (e.key === "ArrowRight") setActiveFrame(f => Math.min(f + 1, frames.length - 1));
      if (e.key === "ArrowLeft") setActiveFrame(f => Math.max(f - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, project, frames.length, lightboxOpen]);

  useEffect(() => {
    if (project) setTimeout(() => closeButtonRef.current?.focus(), 50);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [project]);

  return (
    <AnimatePresence>
      {project && current && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            initial={{ opacity: 0, y: 56, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none"
          >
            <div
              ref={sheetRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="pointer-events-auto w-full md:max-w-3xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-card border border-border shadow-2xl flex flex-col"
              style={{
                transform: isDragging ? `translateY(${dragY}px)` : undefined,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >

              {/* ── Mobile drag handle + close bar ── */}
              <div className="md:hidden sticky top-0 z-10 bg-card rounded-t-3xl flex-shrink-0">
                {/* Drag pill */}
                <div className="flex justify-center pt-2.5 pb-1">
                  <div className="w-9 h-1 rounded-full bg-muted-foreground/30" />
                </div>
                {/* Close bar */}
                <div className="flex items-center justify-between px-4 pb-2">
                  <span
                    className="text-foreground/70 truncate max-w-[70%]"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
                  >
                    {project.company} · Case Study
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-medium active:bg-secondary/80 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem" }}
                    aria-label="Close case study"
                  >
                    <X size={14} aria-hidden="true" />
                    Close
                  </button>
                </div>
              </div>

              {/* ── Image viewer ── */}
              <div
                className="relative flex-shrink-0 overflow-hidden md:rounded-t-3xl bg-[#0a0a0a]"
                style={{ height: isMobile ? "clamp(180px, 32vh, 260px)" : "clamp(220px, 42vh, 380px)" }}
                onTouchStart={handleFrameSwipeStart}
                onTouchEnd={handleFrameSwipeEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.button
                    key={`${project.id}-${activeFrame}`}
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    initial={{ opacity: 0, scale: 1.012 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="w-full h-full block cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                    aria-label={`Expand image: ${project.title} — ${current.label}`}
                  >
                    <img
                      src={current.src}
                      alt={`${project.title} — ${current.label}`}
                      className="w-full h-full"
                      style={{ objectFit: "cover", objectPosition: current.objectPosition }}
                    />
                  </motion.button>
                </AnimatePresence>

                {/* Gradient — bottom-up scrim for caption readability (WCAG AA) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 22%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 70%, transparent 100%)",
                  }}
                />

                {/* Expand hint */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="hidden md:flex absolute top-4 right-16 items-center gap-1.5 px-3 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-black/75 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="View full image"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
                >
                  <Maximize2 size={13} aria-hidden="true" />
                  View full
                </button>

                {/* Close */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="hidden md:flex absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-black/75 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Close project details"
                >
                  <X size={16} aria-hidden="true" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {current.isDesign && (
                    <span
                      className="px-2 py-0.5 rounded-md text-white"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Design
                    </span>
                  )}
                  <span
                    className="px-3 py-1 rounded-full text-white"
                    style={{
                      background: `${project.accentColor}55`,
                      border: `1px solid ${project.accentColor}88`,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {current.label}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-5 pb-3 md:pb-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeFrame}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white mb-3 hidden md:block"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        lineHeight: 1.55,
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                        maxWidth: "calc(100% - 96px)",
                      }}
                    >
                      {current.caption}
                    </motion.p>
                  </AnimatePresence>

                  {/* Dot + Prev/Next row */}
                  <div className="flex items-center justify-center md:justify-between">
                    <div className="flex items-center gap-1 md:gap-1.5" role="tablist" aria-label="Frames">
                      {frames.map((_, i) => (
                        <button
                          key={i}
                          role="tab"
                          aria-selected={i === activeFrame}
                          aria-label={`Frame ${i + 1}: ${frames[i].label}`}
                          onClick={() => setActiveFrame(i)}
                          className="relative flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                          style={{
                            /* 44px touch target via min dimensions + padding */
                            minWidth: "44px",
                            minHeight: "44px",
                          }}
                        >
                          <span
                            className="block rounded-full transition-all duration-200"
                            style={{
                              width: i === activeFrame ? "20px" : "8px",
                              height: "8px",
                              background: i === activeFrame ? project.accentColor : "rgba(255,255,255,0.55)",
                            }}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                      <button
                        onClick={() => setActiveFrame(f => Math.max(f - 1, 0))}
                        disabled={activeFrame === 0}
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        aria-label="Previous frame"
                      >
                        <ChevronLeft size={14} aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => setActiveFrame(f => Math.min(f + 1, frames.length - 1))}
                        disabled={activeFrame === frames.length - 1}
                        className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        aria-label="Next frame"
                      >
                        <ChevronRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Case study content ── */}
              <div className="p-5 md:p-8">
                {/* Lead: metric → title → meta */}
                <div className="mb-6">
                  <div
                    className="inline-flex items-baseline gap-2 mb-4 px-3.5 py-1.5 rounded-full"
                    style={{
                      background: `${project.accentColor}14`,
                      border: `1px solid ${project.accentColor}33`,
                    }}
                    aria-label={`Key result: ${project.metric.value} ${project.metric.label}`}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        letterSpacing: "-0.02em",
                        color: project.accentColor,
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {project.metric.value}
                    </span>
                    <span
                      className="text-muted-foreground"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
                      aria-hidden="true"
                    >
                      {project.metric.label}
                    </span>
                  </div>
                  <h2
                    id="modal-title"
                    className="text-foreground mb-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem" }}
                  >
                    {project.company} · {project.year} · {project.role}
                  </p>
                </div>

                {/* Context */}
                <div className="mb-5">
                  <h3
                    className="text-muted-foreground mb-2 uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
                  >
                    Context
                  </h3>
                  <p
                    className="text-foreground"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.72 }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* The challenge */}
                <div
                  className="mb-5 p-4 rounded-xl border-l-4"
                  style={{ background: `${project.accentColor}0D`, borderColor: project.accentColor }}
                >
                  <h3
                    className="mb-1.5 uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em", color: project.accentColor }}
                  >
                    The challenge
                  </h3>
                  <p
                    className="text-foreground"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", lineHeight: 1.68 }}
                  >
                    {project.challenge}
                  </p>
                </div>

                {/* The move — the decisive design decision */}
                <div className="mb-5">
                  <h3
                    className="text-muted-foreground mb-2 uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
                  >
                    The move
                  </h3>
                  <p
                    className="text-foreground"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "1rem",
                      lineHeight: 1.55,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.keyMove}
                  </p>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h3
                    className="text-muted-foreground mb-3 uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.1em" }}
                  >
                    Artifacts &amp; outcomes
                  </h3>
                  <ul className="space-y-2.5">
                    {project.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: project.accentColor }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-muted-foreground"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.855rem", lineHeight: 1.62 }}
                        >
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer actions: external link + next case study */}
                <div className="pt-5 border-t border-border flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3 md:justify-between">
                  {project.externalLink ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      style={{
                        background: project.accentColor,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.855rem",
                      }}
                    >
                      View live product
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  ) : (
                    <span />
                  )}

                  {nextProject && onNavigateNext && (
                    <button
                      type="button"
                      onClick={() => onNavigateNext(project)}
                      className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border text-foreground hover:bg-secondary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.82rem" }}
                      aria-label={`Open next case study: ${nextProject.title}`}
                    >
                      <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                        Next case
                      </span>
                      <span>{nextProject.title}</span>
                      <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Lightbox: full image viewer with zoom/pan ── */}
          {lightboxOpen && (
            <motion.div
              key="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`Full image: ${project.title} — ${current.label}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxOpen(false)}
              onWheel={(e) => {
                e.preventDefault();
                const next = Math.min(5, Math.max(1, zoom + (e.deltaY < 0 ? 0.25 : -0.25)));
                setZoom(next);
                if (next === 1) setPan({ x: 0, y: 0 });
              }}
              className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center overflow-hidden select-none"
              style={{ cursor: zoom > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-out" }}
            >
              <img
                src={current.src}
                alt={`${project.title} — ${current.label} (full size)`}
                draggable={false}
                className="max-w-[95vw] max-h-[92vh] object-contain"
                onClick={(e) => {
                  e.stopPropagation();
                  if (zoom === 1) {
                    setZoom(2);
                  } else {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                  }
                }}
                onPointerDown={(e) => {
                  if (zoom <= 1) return;
                  e.stopPropagation();
                  (e.target as Element).setPointerCapture(e.pointerId);
                  dragRef.current = { startX: e.clientX, startY: e.clientY, baseX: pan.x, baseY: pan.y };
                }}
                onPointerMove={(e) => {
                  if (!dragRef.current) return;
                  setPan({
                    x: dragRef.current.baseX + (e.clientX - dragRef.current.startX),
                    y: dragRef.current.baseY + (e.clientY - dragRef.current.startY),
                  });
                }}
                onPointerUp={(e) => {
                  if (!dragRef.current) return;
                  (e.target as Element).releasePointerCapture(e.pointerId);
                  dragRef.current = null;
                }}
                style={{
                  cursor: zoom > 1 ? "grab" : "zoom-in",
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transition: dragRef.current ? "none" : "transform 0.18s ease-out",
                  transformOrigin: "center center",
                }}
              />

              {/* Zoom controls */}
              <div
                className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-1.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.max(1, zoom - 0.5);
                    setZoom(next);
                    if (next === 1) setPan({ x: 0, y: 0 });
                  }}
                  disabled={zoom <= 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/15 disabled:opacity-30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Zoom out"
                >
                  <span style={{ fontSize: "1.1rem", lineHeight: 1 }} aria-hidden="true">−</span>
                </button>
                <span
                  className="text-white tabular-nums px-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500, minWidth: "3rem", textAlign: "center" }}
                  aria-live="polite"
                >
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(5, zoom + 0.5))}
                  disabled={zoom >= 5}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/15 disabled:opacity-30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Zoom in"
                >
                  <span style={{ fontSize: "1.1rem", lineHeight: 1 }} aria-hidden="true">+</span>
                </button>
                <span aria-hidden="true" className="w-px h-5 bg-white/20 mx-1" />
                <button
                  type="button"
                  onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                  className="px-2.5 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500 }}
                  aria-label="Reset zoom"
                >
                  Fit
                </button>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                className="fixed top-4 right-4 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close full image"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
