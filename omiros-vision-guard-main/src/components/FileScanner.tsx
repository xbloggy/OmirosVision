import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Radar,
  Loader2,
  UploadCloud,
  FileIcon,
  X,
  Activity,
  Fingerprint,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { scanFile, type FileScanResult } from "../server/scanFile";
import { Button } from "./ui/button";

const MAX_BYTES = 30 * 1024 * 1024;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function FileScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FileScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scan = useServerFn(scanFile);

  const onPick = (f: File | null) => {
    setError(null);
    setResult(null);
    if (!f) return;
    if (f.size === 0) {
      setError("Empty file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("File too large. Maximum size is 30MB.");
      return;
    }
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await scan({ data: fd });
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
      <form onSubmit={onSubmit}>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onPick(f);
          }}
          className={`glass relative block cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
            dragOver
              ? "border-cyan/60 shadow-[0_0_40px_oklch(0.78_0.2_210/0.25)]"
              : "border-white/10 hover:border-cyan/30"
          } ${loading ? "pointer-events-none opacity-70" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            disabled={loading}
          />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 ring-1 ring-cyan/30">
            <UploadCloud className="h-6 w-6 text-cyan" />
          </div>
          <div className="mt-4 font-display text-base font-semibold">
            Drop a file to scan, or <span className="text-cyan">browse</span>
          </div>
          <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Max 30MB · Any file type
          </div>

          {loading && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="scan-line" />
            </div>
          )}
        </label>

        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between glass rounded-xl p-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10 ring-1 ring-cyan/20">
                  <FileIcon className="h-4 w-4 text-cyan" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-mono text-sm text-foreground">{file.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {formatSize(file.size)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  disabled={loading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
                <Button type="submit" variant="hero" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scanning…
                    </>
                  ) : (
                    <>
                      <Radar className="h-4 w-4" />
                      Scan File
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                  Uploading file… analyzing across security vendors…
                </div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full w-1/3 animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan to-transparent"
                    style={{ backgroundSize: "200% 100%" }}
                  />
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
            <FileResultCard result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FileResultCard({ result }: { result: Extract<FileScanResult, { ok: true }> }) {
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
      summary: "Some vendors flagged this file as potentially unsafe.",
    },
    malicious: {
      label: "Malicious",
      icon: ShieldX,
      color: "text-red-400",
      ring: "ring-red-400/30",
      bg: "bg-red-400/10",
      border: "border-red-400/30",
      glow: "shadow-[0_0_50px_oklch(0.65_0.24_27/0.3)]",
      summary: "Threats detected. Do not open or execute this file.",
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

          <div className="mt-4 space-y-1.5">
            <div className="truncate font-mono text-xs text-foreground" title={result.fileName}>
              {result.fileName}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {formatSize(result.fileSize)}
            </div>
            {result.sha256 && (
              <div className="flex items-center gap-2 truncate font-mono text-[10px] text-muted-foreground/80">
                <Fingerprint className="h-3 w-3 shrink-0 text-cyan" />
                <span className="truncate" title={result.sha256}>{result.sha256}</span>
              </div>
            )}
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
