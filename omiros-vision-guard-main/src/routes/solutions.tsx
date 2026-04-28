import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Radar, Network, Lock, Brain, Bell, Cpu, Zap, Shield, Eye } from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Omiros Innovation" },
      { name: "description", content: "AI-powered monitoring, threat detection, secure infrastructure and smart environment safety — engineered for the next decade." },
      { property: "og:title", content: "Solutions — Omiros Innovation" },
      { property: "og:description", content: "A platform engineered for defense at every layer." },
    ],
  }),
  component: SolutionsPage,
});

const items = [
  { icon: Radar, t: "Threat Detection & Prevention", d: "Layered analytics that surface anomalies in real time — across networks, endpoints and physical environments." },
  { icon: Network, t: "Secure Infrastructure Design", d: "Zero-trust architectures, segmented networks, and resilient system topology designed from first principles." },
  { icon: Lock, t: "Privacy-First Architecture", d: "Encryption everywhere, minimal data retention, and user-sovereign identity baked into every layer of the stack." },
  { icon: Brain, t: "AI-Powered Monitoring", d: "Models that learn baseline behavior across digital and physical signals — and flag what shouldn't be there." },
  { icon: Bell, t: "Real-Time Security Alerts", d: "Prioritized, context-rich notifications routed to the right responder — designed for speed and clarity under pressure." },
  { icon: Cpu, t: "Smart Environment Safety", d: "IoT-aware protection for homes, schools, campuses and critical public infrastructure." },
  { icon: Zap, t: "Emergency Response Tech", d: "Concepts that coordinate rapid, multi-agent response when seconds define the outcome." },
  { icon: Shield, t: "Hybrid Defense Layer", d: "Bridging the gap between cybersecurity tools and physical access systems for unified protection." },
  { icon: Eye, t: "Intelligent Surveillance", d: "Privacy-respecting visual intelligence that detects threats without surveilling individuals." },
];

function SolutionsPage() {
  return (
    <div className="relative pt-40 pb-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Solutions</div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            Defense at <span className="text-gradient-cyan">every layer</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A modular platform of concepts, prototypes and systems — each one solving a real
            protection problem, each one engineered to scale.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_0_40px_oklch(0.78_0.2_210/0.2)]"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="font-mono text-[11px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-electric/5 ring-1 ring-cyan/20">
                  <it.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
