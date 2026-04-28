import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, ShieldCheck, Lock, Link2, FileScan } from "lucide-react";
import { useState } from "react";
import { UrlScanner } from "../components/UrlScanner";
import { FileScanner } from "../components/FileScanner";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Security Scanner — Omiros Innovation" },
      { name: "description", content: "Real-time URL and file threat analysis powered by 90+ security vendors. Scan any link or file for malicious activity in seconds." },
      { property: "og:title", content: "Security Scanner — Omiros Innovation" },
      { property: "og:description", content: "Enterprise-grade URL and file threat scanning. Detect malware and phishing in seconds." },
    ],
  }),
  component: ScannerPage,
});

type Mode = "url" | "file";

function ScannerPage() {
  const [mode, setMode] = useState<Mode>("url");

  return (
    <div className="relative pt-40 pb-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-32 -z-10 h-[400px] bg-gradient-to-b from-cyan/5 to-transparent blur-3xl" />

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            <Radar className="h-3.5 w-3.5" />
            Live Threat Intelligence
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            Security <span className="text-gradient-cyan">Scanner</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Scan any URL or file across a global network of 90+ security vendors.
            Detect phishing, malware and suspicious activity in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <div className="mb-6 inline-flex glass rounded-xl p-1">
            <ModeButton active={mode === "url"} onClick={() => setMode("url")} icon={Link2} label="URL Scan" />
            <ModeButton active={mode === "file"} onClick={() => setMode("file")} icon={FileScan} label="File Scan" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {mode === "url" ? <UrlScanner /> : <FileScanner />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Multi-Vendor Analysis", d: "Cross-references 90+ engines for high-confidence verdicts." },
            { icon: Radar, t: "Real-Time Detection", d: "Live scanning of phishing, malware and suspicious domains." },
            { icon: Lock, t: "Privacy-First", d: "Submitted data is processed securely and never stored on our side." },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 ring-1 ring-cyan/20">
                <f.icon className="h-5 w-5 text-cyan" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-cyan/20 to-electric/10 text-cyan shadow-[0_0_20px_oklch(0.78_0.2_210/0.25)] ring-1 ring-cyan/30"
          : "text-muted-foreground hover:text-cyan"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
