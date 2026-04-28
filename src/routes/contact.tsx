import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Omiros Innovation" },
      { name: "description", content: "Open a channel with Omiros Innovation. We'd love to walk you through the vision." },
      { property: "og:title", content: "Contact — Omiros Innovation" },
      { property: "og:description", content: "Get in touch with the Omiros Innovation team in Korçë, Albania." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative pt-40 pb-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Contact</div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
              Open a <span className="text-gradient-cyan">secure channel</span>.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Whether you're a judge, partner, or fellow engineer — we're listening.
              Drop a message and we'll get back within 48 hours.
            </p>

            <div className="mt-12 space-y-5">
              {[
                { Icon: Mail, k: "Email", v: "omirosinnovation@gmail.com" },
                { Icon: MapPin, k: "Base", v: "Korçë, Albania" },
                { Icon: Github, k: "Code", v: "@omirosinnovation-netizen" },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="flex items-center gap-4 rounded-xl glass p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-electric/10 ring-1 ring-cyan/30">
                    <Icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
                    <div className="text-sm text-foreground">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="relative overflow-hidden rounded-3xl glass p-8 sm:p-10"
          >
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-cyan/15 blur-3xl" />
            <div className="relative space-y-6">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Name</label>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm transition-all focus:border-cyan/60 focus:outline-none focus:shadow-[0_0_20px_oklch(0.78_0.2_210/0.25)]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Email</label>
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm transition-all focus:border-cyan/60 focus:outline-none focus:shadow-[0_0_20px_oklch(0.78_0.2_210/0.25)]"
                  placeholder="you@domain.com"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Subject</label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm transition-all focus:border-cyan/60 focus:outline-none focus:shadow-[0_0_20px_oklch(0.78_0.2_210/0.25)]"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">Message</label>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm transition-all focus:border-cyan/60 focus:outline-none focus:shadow-[0_0_20px_oklch(0.78_0.2_210/0.25)]"
                  placeholder="Tell us about your idea, question, or project…"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-electric py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.78_0.2_210/0.4)] transition-all hover:shadow-[0_0_50px_oklch(0.78_0.2_210/0.6)]"
              >
                <span className="inline-flex items-center gap-2">
                  {sent ? "Transmission received ✓" : "Send transmission"}
                  {!sent && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
