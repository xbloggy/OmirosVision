import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Target, Compass, Layers } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Omiros Innovation" },
      { name: "description", content: "An ICT Challenge team from Korçë, Albania building intelligent security systems for a safer digital and physical world." },
      { property: "og:title", content: "About — Omiros Innovation" },
      { property: "og:description", content: "Meet the engineers reimagining security from Korçë, Albania." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="relative pt-40 pb-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="mx-auto max-w-5xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">About Us</div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            We engineer <span className="text-gradient-cyan">security</span> as a craft.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Omiros Innovation is an ICT Challenge team from Korçë, Albania. We come from different
            disciplines — code, hardware, design, strategy — but we share a single belief: the future
            will only be as bright as it is secure.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { Icon: Target, t: "What We Do", d: "Design and prototype intelligent security systems that protect people, data and infrastructure." },
            { Icon: Compass, t: "How We Think", d: "Hybrid by default — every solution considers both the cyber and the physical surface." },
            { Icon: Layers, t: "Why It Matters", d: "Safer technology means freer people. We build for that future, every day." },
          ].map(({ Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl glass p-7"
            >
              <Icon className="h-6 w-6 text-cyan" />
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl glass p-10">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Our Story</div>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We started with a simple observation: most "security" we encounter is reactive. Alarms after a break-in,
            patches after a breach, surveillance after the fact. We wanted to flip that — to design systems that
            anticipate, adapt and prevent. Omiros Innovation is our answer: a competition project built like a startup,
            with the ambition of a global platform and the precision of a craftsman's workshop.
          </p>
          <Link to="/solutions" className="mt-8 inline-flex items-center gap-2 text-cyan hover:gap-3 transition-all">
            Explore our solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
