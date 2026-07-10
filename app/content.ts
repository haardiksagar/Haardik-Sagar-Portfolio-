// ────────────────────────────────────────────────────────────────
// All editable copy lives here. Swap the placeholder values below
// for your real details — nothing else in the app needs to change.
// ────────────────────────────────────────────────────────────────

export const profile = {
  name: "Haardik S Sagar",
  handle: "haardik",
  tagline: "building things, one late night at a time.",
  email: "haardiiksagar@gmail.com", // placeholder — replace with your real email
};

export const socials = [
  { label: "MSG", href: `mailto:${profile.email}`, title: "Email" },
  { label: "X", href: "https://x.com/haardiiksagar", title: "Twitter/X" },
  { label: "IN", href: "https://www.linkedin.com/in/haardik-s-sagar/", title: "LinkedIn" },
  { label: "GH", href: "https://github.com/haardiksagar", title: "GitHub" },
  { label: "TH", href: "https://www.threads.com/@haardiik_sagar", title: "Threads" },
];

export const currently = {
  eyebrow: "Currently",
  name: "Your Current Project",
  href: "#",
  role: "Founder & Builder",
  period: "2026 – Present",
  description:
    "A short line about what you're building right now and why it matters to you.",
};

export const about = {
  eyebrow: "About Me",
  intro: "I am a <strong class=\"text-gold font-medium\">third-year Computer Science student</strong> at <strong class=\"text-gold font-medium\">IIIT Nagpur</strong>. I like taking things apart to understand how they work. Most of my learning comes from rebuilding technologies instead of treating them as black boxes. I am particularly interested in <strong class=\"text-gold font-medium\">backend engineering</strong>, <strong class=\"text-gold font-medium\">distributed systems</strong>, and building reliable developer platforms that solve real-world problems.",
  techIntro: "Here are some technologies I have been working with:",
  outro: "In my free time, I'm nerdy about tech gadgets, love literary fiction, and play way too many battle royale games. Oh, I make content too.",
  image: "me.jpg"
};

export const previously = [
  {
    name: "Previous Venture One",
    role: "Founder",
    detail: "One or two lines about what it was and how it went.",
  },
  {
    name: "Previous Venture Two",
    role: "Co-Founder",
    detail: "One or two lines about what it was and how it went.",
  },
  {
    name: "Previous Company / Role",
    role: "Engineer",
    detail: "One or two lines about what you worked on there.",
  },
];

export const projects = [
  {
    name: "PeerLink (2025)",
    role: "Creator",
    detail: "A framework-less peer-to-peer backend built from scratch to explore low-level networking, custom HTTP parsing, and concurrent TCP file transfers.",
    image: "assets/peerLink.png",
    github: "https://github.com/haardiksagar/Peer-Link",
    link: "project-1h72y.vercel.app",
    techStack: "Java(Core/Vanilla)"
  },
  {
    name: "Trimly (2026)",
    role: "Creator",
    detail: "A production-style URL shortening service featuring stateless authentication, rate limiting, analytics, and scalable backend architecture.",
    image: "assets/Trimly.png",
    github: "https://github.com/haardiksagar",
    link: "https://github.com",
    techStack: "Spring Boot | Supabase | Vite | Vanilla JS"
  },
  // {
  //   name: "OmniRAG-Engine",
  //   role: "Creator",
  //   detail: "A fully local, privacy-first RAG engine with fault-tolerant document ingestion and hybrid vector search, built without relying on external AI APIs.",
  //   image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  //   github: "https://github.com/haardiksagar/OmniRAG-Engine",
  //   link: "https://github.com",
  //   techStack: "Python | LangChain | FAISS | Ollama"
  // },
];

export const stack = {
  Languages: "HTML5, CSS, C, C++, Java, Python",
  AI_Skills_Tools: "LLM Prompting, Claude Code, Cursor, Antigravity, Codex",
  Frontend: "React, Next.js, Tailwind, Vite",
  Frameworks_Libraries: "Spring Boot, LangChain",
  Developer_Tools: "Git, GitHub, Postman, Supabase",
  Databases: "MySQL, MongoDB, PostgreSQL"
};

export const achievements = [
  { title: "Achievement One", subtitle: "Brief context or organization" },
  { title: "Achievement Two", subtitle: "Brief context or organization" },
  { title: "Achievement Three", subtitle: "Brief context or organization" },
  { title: "Achievement Four", subtitle: "Brief context or organization" },
];

export const contact = {
  heading: "Let's Build Something",
  message: "I'm currently looking for 2026 internships. If you're working on hard problems in distributed systems, let's chat.",
};
