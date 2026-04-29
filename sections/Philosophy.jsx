// Philosophy — pull quote + 3 pillars
const pillars = [
  {
    n: "01",
    title: "Architecture before features.",
    body: "A good system makes the next ten features cheap. I'd rather spend a week on the foundation than a month firefighting symptoms.",
  },
  {
    n: "02",
    title: "Ship, then sharpen.",
    body: "Done in production beats perfect in staging. Two hackathon trophies were built on weekends — under deadline, under pressure, under-engineered just enough.",
  },
  {
    n: "03",
    title: "Reduce, don't add.",
    body: "60% less code, 20% smaller bundles, 15% fewer bugs. The best feature I've ever shipped is the one I deleted.",
  },
];

const Philosophy = ({ accent }) => (
  <section className="philosophy" id="philosophy">
    <div className="container">
      <span className="eyebrow">06 — Philosophy</span>
      <p className="philosophy-quote" style={{ marginTop: 40 }}>
        From writing my first lines of code to optimizing systems for{" "}
        <span className="accent">100k+ users</span>, I've always been driven by{" "}
        <span className="accent italic">building things that scale.</span>
      </p>
      <div className="philosophy-attr">— Arun Gupta</div>

      <div className="philosophy-pillars">
        {pillars.map((p) => (
          <div key={p.n} className="pillar">
            <h4><span className="num">{p.n}</span>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.Philosophy = Philosophy;
