export interface ProjectFrame {
  url: string;
  caption: string;
  label: string;
}

export type FilterGroup =
  | "Service Design"
  | "Design Systems"
  | "Enterprise UX"
  | "Internal Tools";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  year: string;
  category: string;
  filterGroup: FilterGroup;
  tags: string[];
  shortDescription: string;
  description: string;
  challenge: string;
  keyMove: string;
  outcomes: string[];
  metric: ProjectMetric;
  image: string;
  accentColor: string;
  frames: ProjectFrame[];
  externalLink?: string;
  role: string;
  featured: boolean;
  isLive?: boolean;
  isInternal?: boolean;
}

export const projects: Project[] = [
  {
    id: "omen-gaas",
    title: "OMEN Gaming as a Service",
    company: "HP OMEN",
    year: "2025",
    category: "Product Design",
    filterGroup: "Service Design",
    metric: { value: "11→4", label: "onboarding steps" },
    keyMove: "Unified hardware pairing and plan selection into a single flow — the leap that cut onboarding from 11 screens to 4 without losing a single legal or compliance gate.",
    tags: ["Gaming", "Subscription UX", "Service Design"],
    shortDescription:
      "End-to-end UX for HP OMEN's gaming subscription platform, connecting hardware, software, and service in one seamless experience.",
    description:
      "Designed the end-to-end user experience for HP OMEN's Gaming-as-a-Service subscription platform. This initiative redefined how gamers access premium hardware and software through a unified, always-on service model — removing friction from ownership while enabling new revenue streams for HP.",
    challenge:
      "Create a seamless subscription experience that bridges hardware ownership and gaming-as-a-service, making premium gaming accessible while driving long-term customer retention and brand loyalty.",
    outcomes: [
      "Defined complete user flows for subscription onboarding, hardware provisioning, and service management",
      "Aligned cross-functional teams across HP Business Units on a unified service model",
      "Created detailed handoff documentation that reduced design-to-development cycles",
      "Established scalable UX patterns adopted across OMEN's 2025 product lineup",
    ],
    image:
      "https://images.unsplash.com/photo-1775801535042-52672e4d93ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#ef4444",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Discovery",
        caption: "Landscape audit: mapping the competitive GaaS ecosystem to identify unmet gamer needs and whitespace.",
      },
      {
        url: "https://images.unsplash.com/photo-1775801535042-52672e4d93ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Design",
        caption: "Subscription onboarding flow — simplified from 11 steps to 4, with hardware pairing and plan selection unified in one flow.",
      },
      {
        url: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Outcome",
        caption: "High-fidelity service dashboard prototype — validated with OMEN power users before engineering handoff.",
      },
    ],
    role: "Lead Product Designer",
    featured: true,
  },
  {
    id: "next-gen-pc",
    title: "Next Generation PC Experience",
    company: "HP",
    year: "2024–2025",
    category: "Developer Handoff",
    filterGroup: "Design Systems",
    metric: { value: "40+", label: "components shipped" },
    keyMove: "Treated the handoff itself as a product — versioned, annotated, with one source of truth — so three engineering teams could implement in parallel without QA churn.",
    tags: ["Hardware UX", "Design System", "Developer Handoff"],
    shortDescription:
      "Comprehensive design-to-engineering handoff for HP's next-gen PC line, enabling faster, higher-fidelity implementation.",
    description:
      "Led the UX design and developer handoff for HP's next generation PC product line. This work established the design language and component specifications that engineering teams used to bring the next-gen PC experience to life, ensuring design intent was preserved from concept through production.",
    challenge:
      "Translate complex hardware product interactions and software UI into clear, scalable design specifications that engineering teams could implement consistently across product variants and regions.",
    outcomes: [
      "Delivered production-ready design specs and annotated component documentation",
      "Reduced design-to-development ambiguity through structured, version-controlled handoff processes",
      "Created a component library that scaled across multiple PC product lines",
      "Streamlined collaboration between design, engineering, and product management",
    ],
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#3b82f6",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Audit",
        caption: "Kickoff: full audit of the existing PC experience across hardware generations to identify inconsistencies and gaps.",
      },
      {
        url: "https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Design System",
        caption: "Component library: 40+ UI components documented with full interaction states, tokens, and accessibility annotations for engineering.",
      },
      {
        url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Handoff",
        caption: "Annotated specs delivered to 3 engineering teams — eliminating the most common QA feedback loops.",
      },
    ],
    role: "Product Designer",
    featured: true,
  },
  {
    id: "create-pilot",
    title: "Create Pilot — Developer Handoff 3.2",
    company: "HP",
    year: "2024",
    category: "Design System",
    filterGroup: "Design Systems",
    metric: { value: "-30%", label: "QA feedback loops" },
    keyMove: "Built a reusable handoff template with edge-cases-as-default — adopted by the broader HP design team and eliminated the top three recurring QA tickets.",
    tags: ["Platform Design", "Design Specs", "Creative Tools"],
    shortDescription:
      "Structured developer handoff for HP's Create Pilot platform — bridging design intent with engineering execution at scale.",
    description:
      "Produced detailed design handoffs for version 3.2 of Create Pilot, HP's creative productivity platform. This work involved translating complex interaction patterns and UI components into actionable specifications, enabling developers to implement the product with high fidelity.",
    challenge:
      "Version 3.2 introduced significant platform changes. The challenge was creating handoff documentation thorough enough to eliminate ambiguity for developers while remaining adaptable to last-minute design decisions.",
    outcomes: [
      "Documented 40+ UI components with full interaction states and edge cases",
      "Introduced a structured handoff template adopted by the broader HP design team",
      "Reduced QA feedback loops by 30% through clearer design specifications",
      "Enabled a distributed engineering team to implement consistently across locales",
    ],
    image:
      "https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#8b5cf6",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Platform Audit",
        caption: "Mapped 40+ components across the Create Pilot platform — identifying inconsistencies that were causing dev rework.",
      },
      {
        url: "https://images.unsplash.com/photo-1653647054667-c99dc7f914ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Collaboration",
        caption: "Iterative reviews with engineering, product, and QA teams to validate spec clarity before final delivery.",
      },
      {
        url: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Delivery",
        caption: "Full component library with interaction states, redline annotations, and version history — the handoff template that the broader HP design team adopted.",
      },
    ],
    role: "Product Designer",
    featured: false,
  },
  {
    id: "esign-redesign",
    title: "E-Sign Redesign Exploration",
    company: "HP",
    year: "2024",
    category: "UX Redesign",
    filterGroup: "Enterprise UX",
    metric: { value: "-40%", label: "completion steps" },
    keyMove: "Replaced a linear 12-step wizard with progressive disclosure tied to user intent — kept legal compliance intact while letting most signers finish in 7 steps.",
    tags: ["Redesign", "Enterprise UX", "Document Workflow"],
    shortDescription:
      "Redesign exploration for HP's e-signature product, improving enterprise document signing flows and reducing friction.",
    description:
      "Led Exploration B of the e-signature product redesign, a critical enterprise tool used by HP customers for legally binding digital transactions. The redesign focused on modernizing the signing experience while maintaining compliance requirements and enterprise-grade reliability.",
    challenge:
      "Balance the needs of enterprise IT administrators, document senders, and signers — three distinct user groups with conflicting priorities — while meeting strict legal and accessibility compliance standards.",
    outcomes: [
      "Proposed a redesigned signing flow that reduced completion steps by 40%",
      "Introduced progressive disclosure patterns for complex multi-party document workflows",
      "Improved accessibility compliance to WCAG AA standards across all signing surfaces",
      "Exploration B findings directly informed the product roadmap for the next release",
    ],
    image:
      "https://images.unsplash.com/photo-1670852714979-f73d21652a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#10b981",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Research",
        caption: "User research synthesis: interviews with 3 distinct user groups (admins, senders, signers) surfaced deeply conflicting mental models.",
      },
      {
        url: "https://images.unsplash.com/photo-1670852714979-f73d21652a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Problem",
        caption: "The current signing flow required 12+ steps and showed a 34% abandonment rate — most drop-offs happened at the authentication step.",
      },
      {
        url: "https://images.unsplash.com/photo-1652422485224-102f6784c149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Redesign",
        caption: "Progressive disclosure redesign: condensed the flow to 7 steps with inline guidance, cutting abandonment and clearing WCAG AA audit.",
      },
    ],
    role: "Senior UX Designer",
    featured: false,
  },
  {
    id: "buddy-picker",
    title: "Buddy Picker — AI Pair Matching",
    company: "HP Design Operations",
    year: "2025",
    category: "Internal AI Tool",
    filterGroup: "Internal Tools",
    metric: { value: "<10s", label: "to the right tool" },
    keyMove: "Refused to build a tool index — built a 3-question matching engine instead, so designers spend zero time browsing and get a recommendation in under ten seconds.",
    tags: ["AI Adoption", "Team Tooling", "React App"],
    shortDescription:
      "A React-based tool that helps team members find the right AI companion for their specific creative and analytical tasks.",
    description:
      "Designed and shipped Buddy Picker to help HP designers navigate the question \"which AI tool should I use right now?\" The tool uses a guided, question-based flow to match users with the most appropriate AI tool for their current task — removing the paralysis of choice.",
    challenge:
      "With dozens of AI tools available, team members defaulted to familiar tools even when better options existed. The challenge was creating a decision-support tool lightweight enough to actually get used.",
    outcomes: [
      "Shipped as a live React app on Vercel, used in day-to-day team workflows",
      "Reduced time-to-tool-selection from minutes of research to seconds",
      "Demonstrated that internal tooling built by designers could ship as real products",
      "Inspired a broader initiative to build internal design ops tools within the team",
    ],
    image:
      "https://images.unsplash.com/photo-1744640326166-433469d102f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#06b6d4",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1684369175809-f9642140a1bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Insight",
        caption: "Team survey revealed: 78% of designers were using the same 2–3 AI tools for every task, regardless of fit. Better tools existed — discovery was the blocker.",
      },
      {
        url: "https://images.unsplash.com/photo-1744640326166-433469d102f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Core Logic",
        caption: "A 3-question matching engine: What are you doing? What's your output? How much time do you have? — surfaces the right AI tool in under 10 seconds.",
      },
      {
        url: "https://images.unsplash.com/photo-1590402494587-44b71d7772f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Impact",
        caption: "Shipped on Vercel as a real React app — not a prototype. Used daily across the team. A proof that designers building internal tools is a multiplier.",
      },
    ],
    externalLink: "https://buddy-picker-eu3i.vercel.app/",
    role: "Designer & Developer",
    featured: false,
    isLive: true,
  },
  {
    id: "ai-journey",
    title: "AI Journey — Personalized Learning Plans",
    company: "HP Design Operations",
    year: "2025",
    category: "Internal AI Tool",
    filterGroup: "Internal Tools",
    metric: { value: "6", label: "questions to a plan" },
    keyMove: "Made the plan visibly build itself while the user answered — the live preview created enough anticipation to push completion intent up sharply over a static questionnaire.",
    tags: ["AI Adoption", "Personalization", "Design Ops"],
    shortDescription:
      "A 6-question flow that builds a completely personalized AI learning plan for every HP designer — by role, proficiency, goals, and available time.",
    description:
      "Designed and built AI Journey to solve the core adoption problem: generic AI training doesn't stick. AI Journey asks 6 targeted questions — job role, proficiency level, goals, tools already tried, and weekly time available — then generates a fully personalized module list with role-relevant tools and exercises. No account needed; progress saves to the browser.",
    challenge:
      "One-size-fits-all training had low completion rates across the team. A Product Designer, a UX Researcher, and a Design Manager all need different AI skills — and have different amounts of time. The challenge was making a system that felt personal at scale, with zero friction to start.",
    outcomes: [
      "6-question onboarding generates a bespoke module plan — tailored to role, skill level, goals, and weekly time",
      "Live path preview during the questionnaire gives instant feedback, increasing plan completion intent",
      "Browser-based persistence means no login, no barrier — designers return to their plan naturally",
      "Role-specific module curation (Product Designer, UX Researcher, Design Manager, VX Designer) ensures relevance",
      "Directly improved AI tool adoption by making the 'where do I start?' question disappear",
    ],
    image:
      "https://images.unsplash.com/photo-1675557009483-e6cf3867976b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accentColor: "#6366f1",
    frames: [
      {
        url: "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Personalization",
        caption: "Role-based tailoring: the plan changes entirely depending on whether you're a Product Designer, UX Researcher, or Design Manager.",
      },
      {
        url: "https://images.unsplash.com/photo-1675557009483-e6cf3867976b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Live Path",
        caption: "Your path takes shape in real time — as you answer questions, modules appear below, building anticipation before you finish.",
      },
      {
        url: "https://images.unsplash.com/photo-1744640326166-433469d102f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        label: "Your Plan",
        caption: "The output: a named, personal plan with curated modules, tool tags, and time estimates — ready to open and start immediately.",
      },
    ],
    role: "Designer & Builder",
    featured: false,
    isInternal: true,
  },
];
