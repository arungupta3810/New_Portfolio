// Main app — orchestrates sections, nav, scroll progress, tweaks
const { useState, useEffect, useRef } = React;

const ACCENTS = {
  amber:   { hex: "#e8a866", glow: "rgba(232,168,102,0.35)", soft: "rgba(232,168,102,0.12)" },
  rose:    { hex: "#f87171", glow: "rgba(248,113,113,0.35)", soft: "rgba(248,113,113,0.12)" },
  emerald: { hex: "#6ee7b7", glow: "rgba(110,231,183,0.35)", soft: "rgba(110,231,183,0.12)" },
  azure:   { hex: "#7dd3fc", glow: "rgba(125,211,252,0.35)", soft: "rgba(125,211,252,0.12)" },
  violet:  { hex: "#c4b5fd", glow: "rgba(196,181,253,0.35)", soft: "rgba(196,181,253,0.12)" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "amber",
  "intensity": "medium",
  "headline": "story"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleSetTweak = setTweak;

  useEffect(() => {
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.intensity = tweaks.intensity;
    const a = ACCENTS[tweaks.accent] || ACCENTS.amber;
    document.documentElement.style.setProperty("--accent", a.hex);
    document.documentElement.style.setProperty("--accent-glow", a.glow);
    document.documentElement.style.setProperty("--accent-soft", a.soft);
  }, [tweaks]);

  useEffect(() => {
    const TICK_PX = 80; // vibrate every 80px scrolled
    let lastTickY = window.scrollY;
    let stopTimer = null;

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, (window.scrollY / Math.max(h, 1)) * 100));

      if (navigator.vibrate) {
        const delta = Math.abs(window.scrollY - lastTickY);
        if (delta >= TICK_PX) {
          navigator.vibrate(8);
          lastTickY = window.scrollY;
        }
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => { lastTickY = window.scrollY; }, 200);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer);
    };
  }, []);

  const navClick = () => {
    navigator.vibrate && navigator.vibrate(30);
    closeMenu();
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: progress + "%" }} />

      <nav className="nav">
        <div className="nav-logo">
          <span className="monogram">A</span>
          <span>Arun Gupta</span>
          <span className="mono-tag">/ portfolio</span>
        </div>
        <div className="nav-links">
          <a href="#journey" onClick={navClick}>Journey</a>
          <a href="#skills"  onClick={navClick}>Skills</a>
          <a href="#projects" onClick={navClick}>Work</a>
          <a href="#certs"   onClick={navClick}>Awards</a>
          <a href="#contact" onClick={navClick}>Contact</a>
        </div>
        <button
          className={"nav-hamburger " + (menuOpen ? "open" : "")}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={"mobile-menu " + (menuOpen ? "open" : "")}>
        <a href="#journey" onClick={navClick}>Journey</a>
        <a href="#skills"  onClick={navClick}>Skills</a>
        <a href="#projects" onClick={navClick}>Work</a>
        <a href="#certs"   onClick={navClick}>Awards</a>
        <a href="#contact" onClick={navClick}>Contact</a>
      </div>

      <Hero headlineVariant={tweaks.headline} />
      <Journey />
      <Skills />
      <Projects />
      <Impact />
      <Certificates />
      <Philosophy accent={tweaks.accent} />
      <LeadForm />
      <Contact />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={tweaks.theme}
          options={["cinematic", "dark", "light"]}
          onChange={(v) => handleSetTweak("theme", v)}
        />

        <TweakSection label="Accent color" />
        <TweakSelect
          label="Color"
          value={tweaks.accent}
          options={[
            { value: "amber", label: "Amber" },
            { value: "rose", label: "Rose" },
            { value: "emerald", label: "Mint" },
            { value: "azure", label: "Azure" },
            { value: "violet", label: "Violet" },
          ]}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Animation intensity" />
        <TweakRadio
          label="Level"
          value={tweaks.intensity}
          options={["subtle", "medium", "high"]}
          onChange={(v) => setTweak("intensity", v)}
        />

        <TweakSection label="Hero headline" />
        <TweakSelect
          label="Variant"
          value={tweaks.headline}
          options={[
            { value: "story", label: "Story — trainee → senior" },
            { value: "identity", label: "Identity — name & role" },
            { value: "impact", label: "Impact — by the numbers" },
            { value: "philosophy", label: "Philosophy — manifesto" },
          ]}
          onChange={(v) => setTweak("headline", v)}
        />
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
