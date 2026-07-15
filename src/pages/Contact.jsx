import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

const contactDetails = [
  { icon: Mail, label: "support@shopsphere.example" },
  { icon: Phone, label: "+91  1210102024" },
  { icon: MapPin, label: "Remote-first, shipping worldwide" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // No backend for a contact inbox here — simulate a network round trip
    // so the form feels real rather than silently doing nothing.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <section className="text-center mb-14">
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-coral">
          Get in touch
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-3 text-ink dark:text-paper leading-tight">
          Questions, feedback,
          <br />
          <span className="italic text-coral">or just say hi.</span>
        </h1>
      </section>

      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-6">
          {contactDetails.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="orbit-ring inline-flex w-9 h-9 items-center justify-center text-coral shrink-0">
                <Icon size={15} />
              </span>
              <span className="text-sm text-ink dark:text-paper">{label}</span>
            </div>
          ))}
          <p className="text-slate text-sm leading-relaxed pt-4 border-t border-ink/10 dark:border-paper/10">
            Typical response time is within one business day. For order
            issues, include your account email so we can look things up
            faster.
          </p>
        </div>

        <div className="md:col-span-3">
          {sent ? (
            <div className="border border-ink/10 dark:border-paper/10 rounded-2xl p-10 text-center">
              <CheckCircle2 size={36} className="mx-auto text-sage mb-3" />
              <h2 className="font-display text-xl font-semibold text-ink dark:text-paper mb-1">
                Message sent
              </h2>
              <p className="text-slate text-sm">
                Thanks, {form.name.split(" ")[0] || "there"} — we'll get back to you at {form.email}.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-6 text-sm text-coral hover:text-coral-dark font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={update("subject")}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink dark:text-paper mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark disabled:opacity-60 text-paper font-medium px-6 py-3 rounded-full transition-colors"
              >
                <Send size={16} />
                {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
