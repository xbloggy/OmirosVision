import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Shield, Lock, Radar, Network, Eye, Zap, Bell, Cpu,
  ArrowRight, ArrowUpRight, Sparkles, Activity, Globe, Brain,
} from "lucide-react";
import heroShield from "../assets/hero-shield.jpg";
import { NetworkMesh } from "../components/NetworkMesh";
import { Counter } from "../components/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omiros Innovation — Securing Tomorrow, Today" },
      { name: "description", content: "Engineering the future of cybersecurity, smart surveillance and digital protection. ICT Challenge team from Korçë, Albania." },
      { property: "og:title", content: "Omiros Innovation — Securing Tomorrow, Today" },
      { property: "og:description", content: "Future-ready security systems combining cyber defense, AI monitoring, and intelligent infrastructure." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const missions = [
  { icon: Shield, title: "Cyber Defense", desc: "Awareness, education and protection against modern digital threats." },
  { icon: Lock, title: "Hybrid Security", desc: "Unified physical and digital security systems for resilient environments." },
  { icon: Eye, title: "Smart Surveillance", desc: "Intelligent monitoring concepts that detect anomalies before they escalate." },
  { icon: Globe, title: "Safer Communities", desc: "Technology designed to protect people in connected, public, and private spaces." },
  { icon: Sparkles, title: "Global Safety Innovation", desc: "Bold ideas engineered to scale beyond borders — security as a universal right." },
];

const features = [
  { icon: Radar, title: "Threat Detection & Prevention", desc: "Layered systems that surface and neutralize risks in real time across the perimeter." },
  { icon: Network, title: "Secure Infrastructure Design", desc: "Network and system architecture built on zero-trust foundations from day one." },
  { icon: Lock, title: "Privacy-First Architecture", desc: "Encryption, segmentation and minimal-data principles engineered into every layer." },
  { icon: Brain, title: "AI-Powered Monitoring", desc: "Models that learn baseline behavior and flag deviations across digital and physical signals." },
  { icon: Bell, title: "Real-Time Security Alerts", desc: "Instant, prioritized notifications with full context — built for fast human response." },
  { icon: Cpu, title: "Smart Environment Safety", desc: "IoT-aware protection for homes, campuses and critical infrastructure." },
  { icon: Zap, title: "Emergency Response Tech", desc: "Concepts that coordinate rapid response when seconds define outcomes." },
];

const stats = [
  { value: 99.9, suffix: "%", decimals: 1, label: "Protection Vision" },
  { value: 24, suffix: "/7", decimals: 0, label: "Monitoring Concept" },
  { value: 100, suffix: "%", decimals: 0, label: "Future-Ready Design" },
  { value: 0, suffix: "∞", decimals: 0, label: "Innovation Potential", custom: "∞" },
];

const reasons = [
  { n: "01", title: "Innovation-First Mindset", desc: "We approach every challenge by asking what could exist tomorrow — not just what works today." },
  { n: "02", title: "Cyber + Physical Mastery", desc: "Few teams operate fluently across both domains. We engineer where they converge." },
  { n: "03", title: "Real-World Problem Solving", desc: "Our concepts are tested against the messy, unpredictable conditions of actual environments." },
  { n: "04", title: "Engineering Creativity", desc: "Tight team coordination plus aggressive technical curiosity equals unconventional solutions." },
  { n: "05", title: "Future-Oriented Thinking", desc: "We design for the threats of 2030, not the patches of last year." },
];

function HomePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="absolute inset-0 -z-10">
          <NetworkMesh density={70} />
        </div>
        <div className="scan-line -z-10" />
        <div className="noise -z-10" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
          <motion.div initial="hidden" animate="show" className="lg:col-span-7">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan">
                ICT Challenge · Korçë · 2026
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp} custom={1}
              className="mt-8 font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="text-gradient">Securing</span>
              <br />
              <span className="text-foreground">Tomorrow,</span>
              <br />
              <span className="text-gradient-cyan">Today.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Omiros Innovation engineers the next generation of protection — fusing cybersecurity,
              intelligent surveillance and resilient infrastructure into systems that defend people,
              data and the digital world.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/solutions"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan to-electric px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_oklch(0.78_0.2_210/0.4)] transition-all duration-500 hover:shadow-[0_0_60px_oklch(0.78_0.2_210/0.6)]"
              >
                <span>Explore Our Vision</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-7 py-4 text-sm font-medium backdrop-blur transition-all hover:border-cyan/40 hover:text-cyan"
              >
                Meet The Team
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-14 grid grid-cols-3 gap-6 border-t border-border/40 pt-8">
              {[
                { k: "Domain", v: "Security & Defense" },
                { k: "Origin", v: "Korçë, Albania" },
                { k: "Status", v: "Active · 2026" },
              ].map((m) => (
                <div key={m.k}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{m.k}</div>
                  <div className="mt-1.5 font-display text-sm font-medium text-foreground">{m.v}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-full bg-cyan/20 blur-3xl animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full border border-cyan/20 animate-spin-slow" />
              <div className="absolute inset-12 rounded-full border border-electric/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src={heroShield}
                  alt="Omiros holographic cyber shield"
                  width={1024}
                  height={1024}
                  className="animate-float-slow drop-shadow-[0_0_60px_oklch(0.78_0.2_210/0.5)]"
                />
              </div>
              {/* Floating chips */}
              {[
                { Icon: Lock, x: "8%", y: "18%", d: 0 },
                { Icon: Radar, x: "82%", y: "22%", d: 0.6 },
                { Icon: Activity, x: "5%", y: "70%", d: 1.2 },
                { Icon: Network, x: "85%", y: "75%", d: 1.8 },
              ].map(({ Icon, x, y, d }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + d * 0.3, duration: 0.6 }}
                  className="absolute flex h-12 w-12 items-center justify-center rounded-xl glass animate-float-slow"
                  style={{ left: x, top: y, animationDelay: `${d}s` }}
                >
                  <Icon className="h-5 w-5 text-cyan" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">01 — About Us</div>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                A team forged in <span className="text-gradient-cyan">curiosity</span>, focused on <span className="text-gradient-cyan">protection</span>.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                We are an ICT Challenge team from <span className="text-foreground">Korçë, Albania</span> — engineers, builders and thinkers
                obsessed with one mission: making the world measurably safer through technology.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Our work spans every dimension of security — digital, cyber, and real-world systems.
                We design smarter, safer environments by combining intelligent software, modern infrastructure
                principles and a relentless drive to solve real protection challenges that matter.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { t: "Mission", v: "Protect people, data, and the digital world." },
                  { t: "Approach", v: "Hybrid cyber + physical security thinking." },
                  { t: "Origin", v: "Born in Korçë. Built for the world." },
                  { t: "Goal", v: "Make security a universal default." },
                ].map((m) => (
                  <div key={m.t} className="rounded-xl glass p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">{m.t}</div>
                    <div className="mt-2 text-sm text-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-32">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">02 — Our Mission</div>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Five pillars of a <span className="text-gradient">safer future</span>.
            </h2>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-electric/10 ring-1 ring-cyan/30">
                    <m.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS / FEATURES */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">03 — Solutions</div>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
                A platform engineered for <span className="text-gradient-cyan">defense at every layer</span>.
              </h2>
            </div>
            <Link to="/solutions" className="inline-flex items-center gap-2 text-sm text-cyan hover:gap-3 transition-all">
              View all capabilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-7 backdrop-blur transition-all duration-500 hover:border-cyan/40 hover:shadow-[0_0_40px_oklch(0.78_0.2_210/0.15)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="font-mono text-[11px] text-muted-foreground">0{i + 1}</div>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-electric/5 ring-1 ring-cyan/20 transition-all group-hover:ring-cyan/50">
                  <f.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-32">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="rounded-3xl glass p-12 sm:p-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">04 — By the Numbers</div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              A vision measured in commitment.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="font-display text-5xl font-bold text-gradient-cyan sm:text-6xl">
                    {s.custom ? s.custom : <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />}
                  </div>
                  <div className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE WIN */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">05 — Why We Will Win</div>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Built to <span className="text-gradient-cyan">outthink</span>, engineered to <span className="text-gradient">outlast</span>.
            </h2>
          </div>

          <div className="mt-16 space-y-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur transition-all duration-500 hover:border-cyan/40 hover:bg-card/50 sm:flex-row sm:items-center sm:gap-12"
              >
                <div className="font-mono text-3xl font-bold text-cyan/60 transition-colors group-hover:text-cyan sm:w-20">
                  {r.n}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl glass p-12 text-center sm:p-20">
            <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
            <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan/20 blur-3xl" />
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Ready When You Are</div>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Let's build a safer <span className="text-gradient-cyan">tomorrow</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Whether you're a judge, a partner, or simply curious — we'd love to walk you through the vision.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan to-electric px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_oklch(0.78_0.2_210/0.4)] transition-all hover:shadow-[0_0_60px_oklch(0.78_0.2_210/0.6)]"
              >
                Open a channel <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-sm font-medium hover:border-cyan/40 hover:text-cyan transition-all"
              >
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
