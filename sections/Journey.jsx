// Journey — 6-chapter scroll timeline with progressive line reveal
const chapters = [
  {
    year: "2020",
    period: "The Spark",
    title: "First lines, first questions.",
    body: "B.Sc. Computer Science from G N Khalsa College. Curiosity over credentials — I spent more time breaking things than passing exams. Discovered I cared less about syntax and more about systems.",
    tag: "Origin",
  },
  {
    year: "2022",
    period: "The Apprentice",
    title: "Trainee at Lighthouse Learning.",
    body: "MCA in hand. Joined as a trainee on a real product team — 100k+ users, no training wheels. Wrote my first production bug. Then wrote my first production fix.",
    tag: "Year One",
  },
  {
    year: "2023",
    period: "The Promotion",
    title: "Software Engineer. By merit, in twelve months.",
    body: "Promoted within the first year. Took ownership of frontend architecture for high-traffic modules. Started reviewing code instead of just writing it.",
    tag: "Inflection",
  },
  {
    year: "2024",
    period: "The Win",
    title: "EuroBuddy takes Daman.",
    body: "Solo-built an AI-powered PWA chatbot for European partners. Took it to a company-wide hackathon. Came home with the trophy and the conviction that I could ship anything.",
    tag: "Hackathon Win",
  },
  {
    year: "2025",
    period: "The Streak",
    title: "Talk2Teacher wins Thailand.",
    body: "A real-time video conferencing platform for parent-teacher meetings — built, integrated, shipped. Second international hackathon win. Conducted 20+ technical interviews. Helped define hiring standards.",
    tag: "Two for two",
  },
  {
    year: "2026",
    period: "The Now",
    title: "Senior at Atrina. Author of eos-comp.",
    body: "Architected and published an Angular NPM library cutting 60% of duplicate code across enterprise projects. Optimized Nest.js services for 20% codebase reduction. Employee of the Month, January 2026. Just getting started.",
    tag: "Today",
  },
];

const Chapter = ({ ch, idx }) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.4, rootMargin: "-10% 0px -10% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={"chapter " + (inView ? "in-view" : "")}>
      <div className="chapter-dot" />
      <div className="chapter-meta">
        <span className="year">{ch.year}</span>
        <span>Ch. 0{idx + 1} · {ch.period}</span>
      </div>
      <div className="chapter-body">
        <h3>{ch.title}</h3>
        <p>{ch.body}</p>
        <span className="chapter-tag">{ch.tag}</span>
      </div>
    </div>
  );
};

const Journey = () => {
  const trackRef = React.useRef(null);
  const [fillHeight, setFillHeight] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = el.offsetHeight;
      // progress: 0 when track top hits 60% viewport, 1 when track bottom hits 40%
      const start = winH * 0.6;
      const end = winH * 0.4;
      const scrolled = start - rect.top;
      const range = total - (end - 0) + start - end;
      const progress = Math.max(0, Math.min(1, scrolled / Math.max(total - winH * 0.3, 1)));
      setFillHeight(progress * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="journey" id="journey">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <span className="num">01 — The Journey</span>
            <h2>Six chapters.<br /><span className="italic dim">One story.</span></h2>
          </div>
          <p className="tagline">Scroll to walk through every pivotal moment — from the first line of code to leading enterprise architecture.</p>
        </div>

        <div className="journey-track" ref={trackRef}>
          <div className="journey-line">
            <div className="journey-line-fill" style={{ height: fillHeight + "%" }} />
          </div>
          {chapters.map((ch, i) => <Chapter key={i} ch={ch} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

window.Journey = Journey;
