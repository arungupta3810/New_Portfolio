// Hero section — story headline with text reveal
const Hero = ({ headlineVariant }) => {
  const variants = {
    story: [
      { text: "From trainee", accent: false },
      { text: "to senior engineer", accent: false },
      { text: "in four years.", accent: true, italic: true },
    ],
    identity: [
      { text: "Arun Gupta.", accent: false },
      { text: "Senior Full", accent: false },
      { text: "Stack Engineer.", accent: true, italic: true },
    ],
    impact: [
      { text: "60% less code.", accent: false },
      { text: "20% more speed.", accent: false },
      { text: "Always shipping.", accent: true, italic: true },
    ],
    philosophy: [
      { text: "Build things", accent: false },
      { text: "that scale.", accent: false },
      { text: "Quietly. Relentlessly.", accent: true, italic: true },
    ],
  };
  const lines = variants[headlineVariant] || variants.story;

  return (
    <section className="hero" id="hero">
      <div className="hero-glow" />
      <div className="hero-grid" />
      <div className="container">
        <div className="hero-meta">
          <span><span className="dot" /> Available · Mumbai, IN</span>
          <span>Senior Frontend Engineer · Atrina</span>
          <span>04 / 2026</span>
        </div>

        <h1 className="hero-title" key={headlineVariant}>
          {lines.map((line, i) => (
            <span className="reveal-line" key={i}>
              <span
                className={"reveal-inner " + (line.accent ? "accent-word" : "")}
                style={line.italic ? { fontStyle: "italic" } : {}}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          Four years ago I wrote my first lines of production code as a trainee. Today I architect
          systems for 100,000+ users, publish open-source libraries, and win hackathons across
          continents. This is how that happened.
        </p>

        <div className="hero-cta">
          <a href="#journey" className="btn btn-primary">
            Explore my journey <span className="arrow">→</span>
          </a>
          <a href="#contact" className="btn">
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

window.Hero = Hero;
