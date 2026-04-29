// LeadForm — lead capture above Contact
const { useState } = React;

const LeadForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const now = new Date();
    const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, "/");
    const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    try {
      const res = await fetch("https://arunguptaportfoliobackend.vercel.app/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          messages: form.message,
          date,
          time,
        }),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="lead-form-section" id="hire">
      <div className="container">
        <span className="eyebrow">07 — Let's Talk</span>
        <h2 style={{ marginTop: 32, maxWidth: "22ch" }}>
          Tell me what you're <span className="italic" style={{ color: "var(--accent)" }}>building.</span>
        </h2>
        <p className="lead-form-sub">
          Drop your details and I'll get back to you within the day.
        </p>

        {status === "success" ? (
          <div className="lead-form-success">
            <span className="lead-success-icon">✓</span>
            <p>Got it — I'll be in touch soon.</p>
          </div>
        ) : (
          <form className="lead-form" onSubmit={handleSubmit} noValidate>
            <div className="lead-form-row">
              <div className="lead-field">
                <label htmlFor="lf-name">Name</label>
                <input
                  id="lf-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="lead-field">
                <label htmlFor="lf-email">Email</label>
                <input
                  id="lf-email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="lead-field">
              <label htmlFor="lf-message">What are you working on?</label>
              <textarea
                id="lf-message"
                rows="5"
                placeholder="Describe the role, project, or problem — the more context, the better."
                value={form.message}
                onChange={set("message")}
                required
              />
            </div>
            {status === "error" && (
              <p className="lead-form-error">Something went wrong — try emailing me directly.</p>
            )}
            <button type="submit" className="btn btn-primary lead-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"} <span className="arrow">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

window.LeadForm = LeadForm;
