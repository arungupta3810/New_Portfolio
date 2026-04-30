// LeadForm — lead capture above Contact
const { useState, useEffect, useRef } = React;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LeadForm = () => {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const successRef = useRef(null);

  const playSuccessSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window).webkitAudioContext;
      const ctx = new AudioCtx();

      const playBell = (freq, startTime, volume) => {
        // Fundamental + 2 harmonics give a bell-like timbre
        [1, 2.756, 5.404].forEach((ratio, hi) => {
          const osc  = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.value = freq * ratio;
          const v = volume / (hi + 1);
          gain.gain.setValueAtTime(0, startTime);
          gain.gain.linearRampToValueAtTime(v, startTime + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2 - hi * 0.4);
          osc.start(startTime);
          osc.stop(startTime + 2.5);
        });
      };

      // Two-tone chime: root then fifth
      playBell(880, ctx.currentTime,        0.28); // A5
      playBell(1320, ctx.currentTime + 0.18, 0.22); // E6 (perfect fifth)
    } catch (_) {}
  };

  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate([60, 40, 80, 40, 120]);
    }
  };

  const validate = (fields) => {
    const e = {};
    if (!fields.name.trim())            e.name    = "Name is required.";
    if (!fields.email.trim())           e.email   = "Email is required.";
    else if (!EMAIL_RE.test(fields.email.trim())) e.email = "Enter a valid email address.";
    if (!fields.message.trim())         e.message = "Please tell me what you're working on.";
    return e;
  };

  const set = (k) => (e) => {
    const updated = { ...form, [k]: e.target.value };
    setForm(updated);
    if (touched[k]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [k]: errs[k] }));
    }
  };

  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [k]: errs[k] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");

    const now  = new Date();
    const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }).replace(/\//g, "/");
    const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    try {
      const res  = await fetch("https://arunguptaportfoliobackend.vercel.app/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, messages: "message from new website => "+form.message, date, time }),
      });
      const json = await res.json();
      if (res.ok && json.status) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setTouched({});
        playSuccessSound();
        triggerHaptic();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Trigger staggered animation after success renders
  useEffect(() => {
    if (status === "success" && successRef.current) {
      const items = successRef.current.querySelectorAll(".lfs-item");
      items.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.12}s`;
        el.classList.add("lfs-item--animate");
      });
    }
  }, [status]);

  return (
    <section className="lead-form-section" id="hire">
      <div className="container">
        <span className="eyebrow">07 — Let's Talk</span>
        <h2 style={{ marginTop: 32, maxWidth: "22ch" }}>
          Let's <span className="italic" style={{ color: "var(--accent)" }}>connect.</span>
        </h2>
        <p className="lead-form-sub">
          Hiring, a freelance project, or just want to talk tech — drop me a note and I'll get back to you within the day.
        </p>

        {status === "success" ? (
          <div className="lead-form-success-wrap" ref={successRef}>
            <div className="lfs-confetti" aria-hidden="true">
              {[...Array(24)].map((_, i) => (
                <span key={i} className="lfs-dot" style={{ "--i": i }} />
              ))}
            </div>

            <div className="lfs-card">
              <div className="lfs-icons-row lfs-item">
                <div className="lfs-thumb-wrap" aria-hidden="true">
                  <span className="lfs-thumb">👍</span>
                </div>
                <div className="lfs-check-ring">
                  <svg className="lfs-check-svg" viewBox="0 0 52 52" fill="none">
                    <circle className="lfs-check-circle" cx="26" cy="26" r="24" stroke="#22c55e" strokeWidth="2.5"/>
                    <path className="lfs-check-tick" d="M14 27l8 8 16-16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="lfs-check-glow" aria-hidden="true" />
                </div>
              </div>

              <p className="lfs-headline lfs-item">You're all set!</p>
              <p className="lfs-sub lfs-item">Got it — I'll read your message and get back to you within the day, usually sooner.</p>

              <div className="lfs-meta lfs-item">
                <span className="lfs-meta-dot" />
                Response time: &lt; 24 hours
              </div>

              <button
                className="lfs-reset lfs-item"
                onClick={() => { setStatus("idle"); navigator.vibrate && navigator.vibrate(30); }}
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form className="lead-form" onSubmit={handleSubmit} noValidate>
            <div className="lead-form-row">
              <div className={`lead-field${errors.name && touched.name ? " lead-field--err" : ""}`}>
                <label htmlFor="lf-name">Name</label>
                <input
                  id="lf-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  autoComplete="name"
                />
                {errors.name && touched.name && <span className="lead-field-err">{errors.name}</span>}
              </div>
              <div className={`lead-field${errors.email && touched.email ? " lead-field--err" : ""}`}>
                <label htmlFor="lf-email">Email</label>
                <input
                  id="lf-email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  autoComplete="email"
                />
                {errors.email && touched.email && <span className="lead-field-err">{errors.email}</span>}
              </div>
            </div>
            <div className={`lead-field${errors.message && touched.message ? " lead-field--err" : ""}`}>
              <label htmlFor="lf-message">What are you working on?</label>
              <textarea
                id="lf-message"
                rows="5"
                placeholder="Share the role, project, or idea — a hiring inquiry, freelance brief, or just a conversation starter."
                value={form.message}
                onChange={set("message")}
                onBlur={blur("message")}
              />
              {errors.message && touched.message && <span className="lead-field-err">{errors.message}</span>}
            </div>
            {status === "error" && (
              <p className="lead-form-error">Something went wrong — try emailing me directly.</p>
            )}
            <button type="submit" className="btn btn-primary lead-submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <span className="lead-spinner" /> Sending…
                </>
              ) : (
                <>Send message <span className="arrow">→</span></>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

window.LeadForm = LeadForm;
