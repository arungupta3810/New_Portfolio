// Skills — pill cloud + live "type-out" code window
const skillGroups = [
  {
    cat: "Languages & Frameworks",
    items: ["JavaScript", "TypeScript", "React.js", "Next.js", "Angular", "Node.js", "Nest.js", "Express", "Java"],
  },
  {
    cat: "Frontend",
    items: ["Redux", "React Query", "React Native", "Tailwind", "HTML5", "CSS3"],
  },
  {
    cat: "Backend & APIs",
    items: ["REST", "GraphQL", "Swagger", "Socket.io", "Microservices"],
  },
  {
    cat: "Databases",
    items: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    cat: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "Azure", "CI/CD", "Cypress", "SonarQube", "Sentry"],
  },
  {
    cat: "Integrations",
    items: ["Zoom SDK", "Jitsi", "CleverTap", "NPM Publishing"],
  },
];

const codeLines = [
  { parts: [{ t: "// arun.gupta — senior full stack engineer", c: "com" }] },
  { parts: [{ t: "" }] },
  { parts: [
    { t: "const ", c: "kw" }, { t: "engineer ", c: "var" }, { t: "= ", c: "kw" }, { t: "{", c: "var" },
  ] },
  { parts: [
    { t: "  experience: ", c: "var" }, { t: "4", c: "num" }, { t: ".5,", c: "var" },
  ] },
  { parts: [
    { t: "  shipping: ", c: "var" }, { t: "true", c: "kw" }, { t: ",", c: "var" },
  ] },
  { parts: [
    { t: "  hackathonsWon: ", c: "var" }, { t: "2", c: "num" }, { t: ",", c: "var" },
  ] },
  { parts: [
    { t: "  usersServed: ", c: "var" }, { t: "100_000", c: "num" }, { t: ",", c: "var" },
  ] },
  { parts: [
    { t: "  philosophy: ", c: "var" }, { t: "'build things that scale'", c: "str" }, { t: ",", c: "var" },
  ] },
  { parts: [
    { t: "  available: ", c: "var" }, { t: "()", c: "var" }, { t: " => ", c: "kw" }, { t: "true", c: "kw" }, { t: ",", c: "var" },
  ] },
  { parts: [{ t: "};", c: "var" }] },
];

const Skills = () => {
  const [typed, setTyped] = React.useState(0);
  const [tick, setTick] = React.useState(0);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    if (typed >= codeLines.length) return;
    const t = setTimeout(() => setTyped(typed + 1), typed === 1 ? 250 : 180);
    return () => clearTimeout(t);
  }, [typed, started]);

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div className="left">
            <span className="num">02 — The Toolkit</span>
            <h2>Stack, sharpened<br /><span className="italic dim">over four years of shipping.</span></h2>
          </div>
          <p className="tagline">Frontend-leaning full stack. Strong opinions about architecture, weak ones about which framework is "best."</p>
        </div>

        <div className="skills-canvas">
          <div className="skill-stack">
            {skillGroups.map((g) => (
              <div key={g.cat}>
                <div className="skill-cat">{g.cat}</div>
                <div className="skill-pill-row">
                  {g.items.map((s) => <span key={s} className="skill-pill">{s}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="code-window">
            <div className="code-head">
              <div className="dots"><span /><span /><span /></div>
              <span className="file">~/arun/identity.ts</span>
            </div>
            <div className="code-body">
              {codeLines.slice(0, typed).map((line, i) => (
                <div className="code-line" key={i}>
                  {line.parts.map((p, j) => (
                    <span key={j} className={p.c || ""}>{p.t}</span>
                  ))}
                  {i === typed - 1 && typed < codeLines.length && <span className="cursor" />}
                </div>
              ))}
              {typed === codeLines.length && (
                <div className="code-line">
                  <span className="com">// ready when you are</span>
                  <span className="cursor" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Skills = Skills;
