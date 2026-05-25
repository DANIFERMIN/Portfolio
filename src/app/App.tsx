import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, ArrowUpRight, Figma, Download, Globe, GraduationCap, Briefcase, Quote } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectPage } from "./components/ProjectPage";
import { ProcessSection } from "./components/ProcessSection";
import { projects, type Project, type FilterGroup } from "./components/projects-data";

export type ThemeMode = "light" | "dark" | "auto";

function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem("portfolio-theme-mode") as ThemeMode | null;
      if (stored === "light" || stored === "dark" || stored === "auto") return stored;
    } catch {}
    return "auto";
  });

  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const isDark = mode === "dark" || (mode === "auto" && systemDark);

  const cycle = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : prev === "dark" ? "auto" : "light";
      try { localStorage.setItem("portfolio-theme-mode", next); } catch {}
      return next;
    });
  };

  return { isDark, mode, cycle };
}

// Document meta — OG / favicon / title (for Slack previews)
function useDocumentMeta() {
  useEffect(() => {
    document.title =
      "Daniela Fermin Rennola — Senior UX Designer · HP · Barcelona";

    const ensureMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
    };

    ensureMeta('meta[name="description"]', {
      name: "description",
      content:
        "Senior UX Designer at HP with 7+ years shipping service systems and internal AI tools. Portfolio of OMEN GaaS, Next-Gen PC, e-sign, AI Journey, Buddy Picker.",
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: "Daniela Fermin Rennola — Senior UX Designer",
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content:
        "I design service systems that make hardware feel like software. 7+ years at HP, shipping end-to-end UX from research to handoff.",
    });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="theme-color"]', { name: "theme-color", content: "#6366f1" });
  }, []);
}

const FILTERS: ("All" | FilterGroup)[] = [
  "All",
  "Service Design",
  "Enterprise UX",
  "Design Systems",
  "Internal Tools",
];

const skills = [
  "End-to-End UX Design",
  "User Research & Discovery",
  "Wireframing & Prototyping",
  "Design Systems",
  "Interaction Design",
  "Usability Testing",
  "A/B Testing",
  "Data-Driven Design",
  "Accessibility & WCAG",
  "Responsive Design",
  "Workshop Facilitation",
  "Stakeholder Management",
  "Agile / Scrum",
  "UX Writing",
];

const tools = [
  { name: "Figma / FigJam", category: "Design" },
  { name: "Hotjar", category: "Research" },
  { name: "Maze", category: "Research" },
  { name: "UserTesting", category: "Research" },
  { name: "Miro / Mural", category: "Collaboration" },
  { name: "Adobe Creative Suite", category: "Design" },
  { name: "Rally", category: "Agile" },
  { name: "Microsoft Suite", category: "Productivity" },
];

const languages = [
  { name: "Spanish", level: "Native", width: "100%" },
  { name: "English", level: "Fluent", width: "90%" },
  { name: "Italian", level: "Intermediate", width: "55%" },
  { name: "Catalan", level: "Intermediate", width: "50%" },
];

const education = [
  { school: "UXER School", degree: "Master in UX Design", year: "2020" },
  { school: "UXER School", degree: "UX Writing Certificate", year: "2021" },
  { school: "Universidad Católica Andrés Bello", degree: "Bachelor's in Communications", year: "2009" },
  { school: "Miami Ad School", degree: "Copywriting Portfolio", year: "2011" },
];

export default function App() {
  const { isDark, mode, cycle } = useTheme();
  useDocumentMeta();
  const [activeFilter, setActiveFilter] = useState<"All" | FilterGroup>("All");

  // ── Hash-based routing for project pages ──
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/project\/(.+)$/);
      setCurrentProjectId(match ? match[1] : null);
    };
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  const currentProject = currentProjectId
    ? projects.find((p) => p.id === currentProjectId) ?? null
    : null;

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.filterGroup === activeFilter),
    [activeFilter]
  );

  const navigateToProject = (project: Project) => {
    window.location.hash = `#/project/${project.id}`;
  };

  const navigateBack = () => {
    window.location.hash = "";
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateToProject(project);
    }
  };

  return (
    <div
      className={`min-h-screen bg-background text-foreground${isDark ? " dark" : ""}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {currentProject ? (
        <ProjectPage project={currentProject} onBack={navigateBack} />
      ) : (
      <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:text-foreground focus:border focus:border-border focus:shadow-lg"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "0.875rem" }}
      >
        Skip to main content
      </a>

      <Navbar isDark={isDark} themeMode={mode} onToggleTheme={cycle} />

      <main id="main-content">
        {/* Hero */}
        <Hero />

        {/* Projects Section */}
        <section id="work" aria-labelledby="work-heading" className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <span
                className="inline-block text-muted-foreground mb-3 tracking-widest uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}
                aria-hidden="true"
              >
                Selected work
              </span>
              <h2
                id="work-heading"
                className="text-foreground mb-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                Six case studies, outcome-first.
              </h2>

              {/* Filter row */}
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Filter case studies"
              >
                {FILTERS.map((f) => {
                  const isActive = activeFilter === f;
                  const count =
                    f === "All"
                      ? projects.length
                      : projects.filter((p) => p.filterGroup === f).length;
                  return (
                    <button
                      key={f}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveFilter(f)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                        isActive
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                      }`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                      }}
                    >
                      {f}
                      <span
                        className="opacity-60"
                        style={{ fontSize: "0.7rem" }}
                        aria-hidden="true"
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              role="list"
              aria-label="Project case studies"
            >
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => handleCardKeyDown(e, project)}
                  className={`focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded-2xl ${
                    project.featured ? "md:col-span-2" : ""
                  }`}
                  aria-label={`View case study: ${project.title}`}
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    onClick={navigateToProject}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process / Methodology */}
        <ProcessSection />

        {/* About Section */}
        <section id="about" aria-labelledby="about-heading" className="px-6 py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <span
                className="inline-block text-muted-foreground mb-3 tracking-widest uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}
                aria-hidden="true"
              >
                About
              </span>
              <h2
                id="about-heading"
                className="text-foreground"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                Designer, researcher, Scrum Master.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left: Bio + Experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-muted-foreground mb-5"
                  style={{ fontSize: "0.95rem", lineHeight: 1.8 }}
                >
                  I'm a Senior UX Designer & Researcher with 7+ years of experience
                  leading user-centered design across complex digital products at HP
                  and as a freelance consultant. I own UX workstreams end-to-end —
                  from discovery and user research through high-fidelity prototypes
                  and developer handoffs.
                </p>
                <p
                  className="text-muted-foreground mb-5"
                  style={{ fontSize: "0.95rem", lineHeight: 1.8 }}
                >
                  I've served as Scrum Master for my design team, mentored junior
                  designers, and volunteered as communications manager for HP's Pride
                  Business Group. Design isn't just what I do — it's how I think.
                </p>
                <p
                  className="text-muted-foreground mb-8"
                  style={{ fontSize: "0.95rem", lineHeight: 1.8 }}
                >
                  Based in Barcelona, Spain. Fluent in English, native Spanish,
                  intermediate in Italian and Catalan. Open to global and remote roles.
                </p>

                {/* Experience timeline */}
                <div aria-label="Work experience">
                  <h3
                    className="text-foreground mb-5 flex items-center gap-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <Briefcase size={15} aria-hidden="true" />
                    Experience
                  </h3>
                  <ol className="space-y-5 border-l border-border pl-5">
                    {[
                      { role: "Lead Product Designer & UX Researcher", company: "HP", period: "Apr 2022 – Present" },
                      { role: "UX Design Consultant & Researcher", company: "Freelance", period: "Jan 2018 – 2023" },
                      { role: "Production & Digital Technology Coordinator", company: "Bunin Murray Productions", period: "Feb 2012 – Dec 2017" },
                    ].map((job) => (
                      <li key={job.company} className="relative">
                        <span
                          className="absolute -left-[1.4rem] top-1.5 w-2 h-2 rounded-full bg-border border-2 border-background"
                          aria-hidden="true"
                        />
                        <p
                          className="text-foreground"
                          style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "-0.01em" }}
                        >
                          {job.role}
                        </p>
                        <p
                          className="text-muted-foreground"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {job.company} · {job.period}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>

              {/* Right: Skills, Tools, Languages, Education */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8"
              >
                {/* Core skills */}
                <div>
                  <h3
                    className="text-foreground mb-4 flex items-center gap-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Core Skills
                  </h3>
                  <div className="flex flex-wrap gap-2" aria-label="Core skills list">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 400 }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3
                    className="text-foreground mb-4"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Tools
                  </h3>
                  <div className="grid grid-cols-2 gap-2" role="list" aria-label="Design tools">
                    {tools.map((tool) => (
                      <div
                        key={tool.name}
                        role="listitem"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary border border-border"
                      >
                        <span
                          className="text-foreground"
                          style={{ fontSize: "0.78rem", fontWeight: 400 }}
                        >
                          {tool.name}
                        </span>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "0.65rem", fontWeight: 500 }}
                        >
                          {tool.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3
                    className="text-foreground mb-4 flex items-center gap-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <Globe size={14} aria-hidden="true" />
                    Languages
                  </h3>
                  <dl className="space-y-3">
                    {languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between mb-1">
                          <dt
                            className="text-foreground"
                            style={{ fontSize: "0.82rem", fontWeight: 400 }}
                          >
                            {lang.name}
                          </dt>
                          <dd
                            className="text-muted-foreground"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {lang.level}
                          </dd>
                        </div>
                        <div
                          className="h-1 rounded-full bg-border overflow-hidden"
                          role="progressbar"
                          aria-valuenow={parseInt(lang.width)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${lang.name} proficiency: ${lang.level}`}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: lang.width }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Education */}
                <div>
                  <h3
                    className="text-foreground mb-4 flex items-center gap-2"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <GraduationCap size={14} aria-hidden="true" />
                    Education
                  </h3>
                  <ol className="space-y-3">
                    {education.map((edu) => (
                      <li
                        key={`${edu.school}-${edu.year}`}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p
                            className="text-foreground"
                            style={{ fontSize: "0.82rem", fontWeight: 500 }}
                          >
                            {edu.degree}
                          </p>
                          <p
                            className="text-muted-foreground"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {edu.school}
                          </p>
                        </div>
                        <span
                          className="text-muted-foreground flex-shrink-0"
                          style={{ fontSize: "0.72rem" }}
                        >
                          {edu.year}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial — single quote, high signal */}
        <section
          aria-label="Testimonial"
          className="px-6 py-20 border-t border-border"
        >
          <div className="max-w-3xl mx-auto">
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Quote
                size={32}
                aria-hidden="true"
                className="mb-4"
                style={{ color: "#6366f1", opacity: 0.4 }}
              />
              <blockquote
                className="text-foreground mb-6"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                "Daniela owned UX end-to-end on OMEN GaaS — the rare designer who
                can run discovery, ship pixels, and keep three engineering teams
                aligned without losing a single user need along the way."
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                  aria-hidden="true"
                >
                  HP
                </span>
                <div>
                  <p
                    className="text-foreground"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Product &amp; engineering partners
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "0.75rem" }}
                  >
                    HP OMEN — paraphrased from project retrospective feedback
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          </div>
        </section>

        {/* Live AI tools — demoted: compact single-row strip */}
        <section
          aria-labelledby="ai-tools-heading"
          className="px-6 py-14 bg-secondary border-y border-border"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex items-baseline justify-between gap-4 flex-wrap"
            >
              <h2
                id="ai-tools-heading"
                className="text-foreground"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.02em",
                }}
              >
                AI tools I've built &amp; shipped for my team
              </h2>
              <span
                className="text-muted-foreground"
                style={{ fontSize: "0.78rem" }}
              >
                Side projects with real adoption
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  title: "AI Journey",
                  description:
                    "A personalized AI learning plan generator for HP designers — 6 questions, role-based modules, browser-saved progress. Built in Figma Sites to meet the team where they already work.",
                  link: null,
                  accent: "#6366f1",
                  label: "HP Internal tool",
                  internal: true,
                },
                {
                  title: "Buddy Picker",
                  description:
                    "A guided AI pair-matching tool that recommends the right AI companion for any creative or analytical task. Built and shipped on Vercel as a real React app.",
                  link: "https://buddy-picker-eu3i.vercel.app/",
                  accent: "#06b6d4",
                  label: "Open live app",
                  internal: false,
                },
              ].map((tool, i) => {
                const commonClasses =
                  "group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-foreground transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";
                const inner = (
                  <>
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: tool.internal ? "#6366f1" : "#10b981" }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className="text-foreground"
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {tool.title}
                        </h3>
                        <span
                          className="text-muted-foreground"
                          style={{ fontSize: "0.65rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}
                        >
                          {tool.internal ? "HP Internal" : "Live"}
                        </span>
                      </div>
                      <p
                        className="text-muted-foreground"
                        style={{ fontSize: "0.78rem", lineHeight: 1.55 }}
                      >
                        {tool.description}
                      </p>
                    </div>
                    {!tool.internal && (
                      <ArrowUpRight
                        size={15}
                        className="flex-shrink-0 mt-1 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                if (tool.internal || !tool.link) {
                  return (
                    <motion.div
                      key={tool.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={commonClasses}
                      aria-label={`${tool.title} — ${tool.label}`}
                    >
                      {inner}
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={tool.title}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={commonClasses}
                    aria-label={`${tool.title} — ${tool.label} (opens in new tab)`}
                  >
                    {inner}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-heading" className="px-6 py-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-muted-foreground mb-4 tracking-widest uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.12em" }}
                aria-hidden="true"
              >
                Let's connect
              </span>
              <h2
                id="contact-heading"
                className="text-foreground mb-6 mx-auto max-w-2xl"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                Have a project in mind?
              </h2>
              <p
                className="text-muted-foreground mb-10 max-w-md mx-auto"
                style={{ fontSize: "0.95rem", lineHeight: 1.75 }}
              >
                I'm always open to discussing new opportunities, collaborations,
                or just talking design. Based in Barcelona — open to remote and relocation.
              </p>

              {/* Primary CTA — single high-emphasis action */}
              <div className="flex justify-center mb-6">
                <a
                  href="mailto:fermin.daniela@gmail.com"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white transition-all hover:opacity-90 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  <Mail size={18} aria-hidden="true" />
                  fermin.daniela@gmail.com
                </a>
              </div>

              {/* Secondary actions — demoted to text links */}
              <div
                className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-muted-foreground"
                aria-label="More ways to reach me"
              >
                <a
                  href="https://www.linkedin.com/in/daniela-fermin-rennola/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  <Linkedin size={16} aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                <span aria-hidden="true" className="opacity-40">·</span>
                <a
                  href="https://www.figma.com/slides/MrlrqmcUm8YMJxyPdGNPc7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  <Figma size={16} aria-hidden="true" />
                  Portfolio deck
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                <span aria-hidden="true" className="opacity-40">·</span>
                <a
                  href="/CV_Daniela_Fermin_Bunge.pdf"
                  download
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        role="contentinfo"
        className="px-6 py-8 border-t border-border"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-muted-foreground"
            style={{ fontSize: "0.8rem" }}
          >
            © 2025 Daniela Fermin Rennola · Senior UX Designer & Researcher · Barcelona
          </p>
          <nav aria-label="Footer links" className="flex items-center gap-6">
            <a
              href="https://buddy-picker-eu3i.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
              style={{ fontSize: "0.8rem" }}
            >
              Buddy Picker <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </nav>
        </div>
      </footer>

      </>
      )}
    </div>
  );
}
