// Certificates — gallery + lightbox
const certs = [
  {
    img: "assets/cert-eurobuddy-2024.png",
    year: "2024",
    title: "EuroBuddy — Hackathon Winner",
    org: "Lighthouse Annual Award · Daman",
  },
  {
    img: "assets/cert-lightup-2025.jpeg",
    year: "2025",
    title: "Light Up Hackathon",
    org: "Lighthouse Learning · Aamby Valley, Pune",
  },
  {
    img: "assets/cert-atrina-eotm.png",
    year: "Jan 2026",
    title: "Employee of the Month",
    org: "Atrina Technologies",
  },
];

const Certificates = () => {
  const [open, setOpen] = React.useState(null);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <section className="certs" id="certs">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <span className="num">05 — Receipts</span>
            <h2>Awards & recognition.<br /><span className="italic dim">Click to inspect.</span></h2>
          </div>
          <p className="tagline">Two international hackathons. One Employee of the Month. The paperwork to prove it.</p>
        </div>
        <div className="certs-row">
          {certs.map((c, i) => (
            <div key={i} className="cert-card" onClick={() => { setOpen(c); navigator.vibrate && navigator.vibrate([30, 15, 50]); }}>
              <div className="cert-img">
                <img src={c.img} alt={c.title} />
              </div>
              <div className="cert-meta">
                <div className="cert-year">{c.year}</div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-org">{c.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={"cert-modal " + (open ? "open" : "")} onClick={() => { setOpen(null); navigator.vibrate && navigator.vibrate(20); }}>
        <button className="close" onClick={() => { setOpen(null); navigator.vibrate && navigator.vibrate(20); }}>Close · Esc</button>
        {open && <img src={open.img} alt={open.title} />}
      </div>
    </section>
  );
};

window.Certificates = Certificates;
