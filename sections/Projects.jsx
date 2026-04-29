// Projects — list with click-to-expand Problem/Solution/Impact
const projects = [
  {
    name: "EOS-COMP",
    desc: "An Angular component library published to NPM. Architected to eliminate duplicated UI work across enterprise projects.",
    tags: ["Angular", "TypeScript", "NPM", "Architecture"],
    impact: "60%",
    impactLabel: "Code reduction",
    year: "2026",
    problem: "Multiple enterprise projects rebuilding the same UI primitives — buttons, modals, forms — burning weeks of duplicate effort per release.",
    solution: "Designed a versioned component library with strict API contracts and Storybook docs. Published to public NPM, integrated across teams.",
    impactDetail: "60% reduction in duplicate code, faster release cycles, and direct cost savings on revenue-impacting projects.",
    link: "https://www.npmjs.com/package/eos-comp",
  },
  {
    name: "Argus LMS",
    desc: "Multi-tenant learning platform. Frontend architecture serving 100,000+ concurrent users across schools.",
    tags: ["React.js", "Java", "Modular Architecture"],
    impact: "100k+",
    impactLabel: "Users served",
    year: "2022—25",
    problem: "Legacy LMS couldn't scale to nationwide rollout. Code duplication blocked feature velocity. New schools meant new bugs.",
    solution: "Rebuilt frontend with modular React architecture. Reusable component system. Real-time video and assessment features integrated cleanly.",
    impactDetail: "40% reduction in code duplication, 20% performance gain, 15% drop in bug reports. Platform now serves thousands of schools.",
  },
  {
    name: "EuroBuddy",
    desc: "AI-powered PWA chatbot for European education partners. Solo-built end to end. Shipped to production.",
    tags: ["React PWA", "NLP", "Solo Build"],
    impact: "🏆",
    impactLabel: "Daman 2024",
    year: "2024",
    problem: "Onboarding partners across language and timezone barriers — slow, manual, expensive support tickets.",
    solution: "Built a PWA chatbot with NLP intent matching, offline support, and responsive UX. Solo developed, designed, shipped.",
    impactDetail: "Won the company-wide hackathon in Daman. Adopted by partner-facing teams for first-line support.",
  },
  {
    name: "Talk2Teacher",
    desc: "Real-time video platform for parent-teacher meetings, integrated directly into the LMS.",
    tags: ["Socket.io", "Zoom SDK", "Jitsi"],
    impact: "🏆",
    impactLabel: "Thailand 2025",
    year: "2025",
    problem: "Schools were stitching together Zoom links and spreadsheets to schedule parent-teacher meetings. Friction at every step.",
    solution: "Built a native LMS-integrated video conferencing flow. Single-click join, recording, attendance — all from inside the app.",
    impactDetail: "Won the company-wide hackathon in Thailand. Second international win in twelve months.",
  }
];

const ProjectRow = ({ p, idx }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={"project " + (open ? "open" : "")} onClick={() => { setOpen(!open); navigator.vibrate && navigator.vibrate(open ? 20 : [30, 15, 50]); }}>
      <div className="project-num">0{idx + 1}</div>
      <div>
        <div className="project-title">
          {p.name}
          <span className="arrow-icon">↗</span>
        </div>
        <p className="project-desc">{p.desc}</p>
        <div className="project-tags">
          {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
        </div>
      </div>
      <div className="project-meta-right">
        <span className="impact">{p.impact}</span>
        {p.impactLabel}<br />
        <span style={{ opacity: 0.6 }}>{p.year}</span>
      </div>
      <div className="project-expand">
        <div className="project-expand-inner">
          <div className="psi-block">
            <div className="label">Problem</div>
            <div className="value">{p.problem}</div>
          </div>
          <div className="psi-block">
            <div className="label">Solution</div>
            <div className="value">{p.solution}</div>
          </div>
          <div className="psi-block">
            <div className="label">Impact</div>
            <div className="value">{p.impactDetail}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section className="projects" id="projects">
    <div className="container">
      <div className="section-head">
        <div className="left">
          <span className="num">03 — Featured Work</span>
          <h2>Five things<br /><span className="italic dim">worth talking about.</span></h2>
        </div>
        <p className="tagline">Click any project to expand the Problem → Solution → Impact behind it.</p>
      </div>
      <div className="project-list">
        {projects.map((p, i) => <ProjectRow key={i} p={p} idx={i} />)}
      </div>
    </div>
  </section>
);

window.Projects = Projects;
