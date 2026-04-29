// Impact — animated counters + portrait card
const metrics = [
  { num: 60, suffix: "%", label: "Code reduced", desc: "via published Angular library" },
  { num: 100, suffix: "k+", label: "Users served", desc: "on production frontends" },
  { num: 20, suffix: "%", label: "Performance gain", desc: "on optimized backends" },
  { num: 2, suffix: "x", label: "Hackathon wins", desc: "Daman ’24 · Thailand ’25" },
];

const Counter = ({ target, suffix, dur = 1500 }) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const [run, setRun] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const Metric = ({ m }) => {
  const ref = React.useRef(null);
  const [iv, setIv] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIv(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={"metric " + (iv ? "in-view" : "")}>
      <div className="num"><Counter target={m.num} suffix={m.suffix} /></div>
      <div className="label">{m.label}</div>
      <div className="desc">{m.desc}</div>
    </div>
  );
};

const Impact = () => (
  <section className="impact-sec" id="impact">
    <div className="container">
      <div className="section-head">
        <div className="left">
          <span className="num">04 — By the numbers</span>
          <h2>Impact, measured.<br /><span className="italic dim">Not just claimed.</span></h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="assets/portrait.jpg" alt="Arun Gupta"
            style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--line-strong)" }} />
          <p className="tagline" style={{ textAlign: "left" }}>Every number below ties to a shipped commit, a deployed feature, or a customer outcome.</p>
        </div>
      </div>
      <div className="impact-grid">
        {metrics.map((m, i) => <Metric key={i} m={m} />)}
      </div>
    </div>
  </section>
);

window.Impact = Impact;
