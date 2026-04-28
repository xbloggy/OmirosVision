import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Github, Linkedin } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Omiros Innovation" },
      { name: "description", content: "Meet the engineers, designers and strategists building the future of security at Omiros Innovation." },
      { property: "og:title", content: "Team — Omiros Innovation" },
      { property: "og:description", content: "Specialists in cyber defense, intelligent systems and resilient infrastructure." },
    ],
  }),
  component: TeamPage,
});

const team = [
  { name: "Team Lead", role: "Strategy & Architecture", focus: "System Design · Vision", initials: "TL" },
  { name: "Cyber Engineer", role: "Threat Intelligence", focus: "Detection · Response", initials: "CE" },
  { name: "Systems Architect", role: "Infrastructure", focus: "Zero-Trust · Networks", initials: "SA" },
  { name: "AI Specialist", role: "Intelligent Monitoring", focus: "ML · Anomaly Detection", initials: "AI" },
  { name: "Hardware Engineer", role: "Smart Environments", focus: "IoT · Sensors", initials: "HE" },
];

function TeamPage() {
  return (
    <div className="relative pt-40 pb-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">The Team</div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            Specialists, <span className="text-gradient-cyan">unified</span> by mission.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Each of us brings a sharp specialty. Together we cover the full surface of modern security —
            from the lowest network layer to the highest human-trust interface.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl glass p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_0_50px_oklch(0.78_0.2_210/0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-electric/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/20 to-electric/10 ring-1 ring-cyan/30">
                  <span className="font-display text-xl font-bold text-cyan">{m.initials}</span>
                  <div className="absolute inset-0 rounded-2xl bg-cyan/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{m.name}</h3>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan">{m.role}</div>
                <p className="mt-4 text-sm text-muted-foreground">{m.focus}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan">
                    <Github className="h-4 w-4" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Shield className="h-3 w-3 text-cyan" /> Verified
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
