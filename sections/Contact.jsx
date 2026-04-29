// Contact — final CTA
const Contact = () =>
<section className="contact" id="contact">
    <div className="contact-glow" />
    <div className="container">
      <span className="eyebrow">07 — The Next Chapter</span>
      <h2 style={{ marginTop: 32 }}>
        Got something <span className="italic" style={{ color: "var(--accent)" }}>worth building?</span>
      </h2>
      <p className="contact-sub">Open to Senior Engineer roles, technical leadership, and interesting problems. Mumbai-based, remote-friendly. Reply within the day.


    </p>
      <div className="contact-cta">
        <a href="mailto:arungupta3810@gmail.com" className="btn btn-primary">
          arungupta3810@gmail.com <span className="arrow">→</span>
        </a>
        <a href="https://linkedin.com/in/arun-gupta-148872194" target="_blank" rel="noreferrer" className="btn">
          LinkedIn DM <span className="arrow">↗</span>
        </a>
      </div>

      <div className="footer">
        <div>© 2026 Arun Gupta · Built from scratch</div>
        <div>Mumbai, IN · UTC+5:30</div>
        <div>v1.0 · Always shipping</div>
      </div>
    </div>
  </section>;


window.Contact = Contact;