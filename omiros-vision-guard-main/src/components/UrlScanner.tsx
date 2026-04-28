import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX, Radar, Loader2, Link2, Activity } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { scanUrl, type ScanResult } from "../server/scanUrl";
import { Button } from "./ui/button";

export function UrlScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scan = useServerFn(scanUrl);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let normalized = url.trim();
    if (!normalized) return;
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;

    try {
      new URL(normalized);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await scan({ data: { url: normalized } });
      if (!res.ok) setError(res.error);
      else setResult(res);
    } catch {
      setError("Security scan temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-2xl p-2 sm:p-2.5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 px-4 py-2">
            <Link2 className="h-4 w-4 text-cyan" />
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a URL to scan — e.g. example.com"
              className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={loading || !url.trim()}
            className="sm:min-w-[170px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning…
              </>
            ) : (
              <>
                <Radar className="h-4 w-4" />
                Scan URL
              </>
            )}
          </Button>
        </div>
        {loading && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="scan-line" />
          </div>
        )}
      </form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="mt-5 glass relative overflow-hidden rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 ring-1 ring-cyan/30">
                <Radar className="h-5 w-5 text-cyan animate-pulse" />
                <div className="absolute inset-0 rounded-xl border border-cyan/40 animate-ping" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan">
                  Secure Channel · Active
                </div>
                <div className="mt-1 text-sm text-foreground">
                  Scanning secure network… analyzing threat data…
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-1/3 animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan to-transparent" style={{ backgroundSize: "200% 100%" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 glass rounded-2xl border border-destructive/30 p-5"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <p className="text-sm text-foreground">{error}</p>
            </div>
          </motion.div>
        )}

        {!loading && result && result.ok && (
          <motion.div
            key={result.analysisId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <ResultCard result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultCard({ result }: { result: Extract<ScanResult, { ok: true }> }) {
  const config = {
    safe: {
      label: "Safe",
      icon: ShieldCheck,
      color: "text-emerald-400",
      ring: "ring-emerald-400/30",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
      glow: "shadow-[0_0_50px_oklch(0.75_0.18_160/0.25)]",
      summary: "No threats detected across security vendors.",
    },
    suspicious: {
      label: "Suspicious",
      icon: ShieldAlert,
      color: "text-amber-400",
      ring: "ring-amber-400/30",
      bg: "bg-amber-400/10",
      border: "border-amber-400/30",
      glow: "shadow-[0_0_50px_oklch(0.8_0.18_75/0.25)]",
      summary: "Some vendors flagged this URL as potentially unsafe.",
    },
    malicious: {
      label: "Malicious",
      icon: ShieldX,
      color: "text-red-400",
      ring: "ring-red-400/30",
      bg: "bg-red-400/10",
      border: "border-red-400/30",
      glow: "shadow-[0_0_50px_oklch(0.65_0.24_27/0.3)]",
      summary: "Threats detected. We recommend not visiting this URL.",
    },
  }[result.threatLevel];

  const Icon = config.icon;

  return (
    <div className={`glass relative overflow-hidden rounded-2xl border ${config.border} ${config.glow} p-6 sm:p-7`}>
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${config.bg} ring-1 ${config.ring}`}>
          <Icon className={`h-7 w-7 ${config.color}`} strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Threat Level
            </div>
            <span className={`rounded-full border ${config.border} ${config.bg} px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider ${config.color}`}>
              {config.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
              <Activity className="h-3 w-3" />
              {result.status === "completed" ? "Scan Completed" : "Processing"}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{config.summary}</p>

          <div className="mt-4 truncate font-mono text-xs text-muted-foreground/80" title={result.scannedUrl}>
            {result.scannedUrl}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <span>Detection Confidence</span>
              <span className={config.color}>{result.confidence}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${
                  result.threatLevel === "safe"
                    ? "bg-gradient-to-r from-emerald-400 to-cyan"
                    : result.threatLevel === "suspicious"
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : "bg-gradient-to-r from-red-500 to-red-400"
                }`}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Harmless" value={result.stats.harmless} tone="text-emerald-400" />
            <Stat label="Suspicious" value={result.stats.suspicious} tone="text-amber-400" />
            <Stat label="Malicious" value={result.stats.malicious} tone="text-red-400" />
            <Stat label="Engines" value={result.stats.total} tone="text-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}
