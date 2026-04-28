import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const VT_API_KEY = "e76a06db8fb9eb38d2a7e7269aaa4e8d259af82da56a186712a7831ae685abb2";

const InputSchema = z.object({
  url: z.string().trim().min(4).max(2048).url(),
});

export type ScanResult = {
  ok: true;
  threatLevel: "safe" | "suspicious" | "malicious";
  status: "completed" | "processing";
  stats: {
    harmless: number;
    suspicious: number;
    malicious: number;
    undetected: number;
    timeout: number;
    total: number;
  };
  confidence: number; // 0-100
  scannedUrl: string;
  analysisId: string;
} | {
  ok: false;
  error: string;
};

async function pollAnalysis(analysisId: string): Promise<any | null> {
  for (let i = 0; i < 6; i++) {
    const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: { "x-apikey": VT_API_KEY },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const status = json?.data?.attributes?.status;
    if (status === "completed") return json;
    await new Promise((r) => setTimeout(r, 1500));
  }
  // Return last attempt as processing
  const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
    headers: { "x-apikey": VT_API_KEY },
  });
  if (!res.ok) return null;
  return res.json();
}

export const scanUrl = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<ScanResult> => {
    try {
      const form = new URLSearchParams();
      form.append("url", data.url);

      const submit = await fetch("https://www.virustotal.com/api/v3/urls", {
        method: "POST",
        headers: {
          "x-apikey": VT_API_KEY,
          "content-type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: form.toString(),
      });

      if (!submit.ok) {
        console.error("VT submit failed", submit.status, await submit.text());
        return { ok: false, error: "Security scan temporarily unavailable. Please try again." };
      }

      const submitJson = await submit.json();
      const analysisId: string | undefined = submitJson?.data?.id;
      if (!analysisId) {
        return { ok: false, error: "Security scan temporarily unavailable. Please try again." };
      }

      const analysis = await pollAnalysis(analysisId);
      if (!analysis) {
        return { ok: false, error: "Security scan temporarily unavailable. Please try again." };
      }

      const attrs = analysis?.data?.attributes ?? {};
      const stats = attrs.stats ?? {};
      const harmless = Number(stats.harmless ?? 0);
      const suspicious = Number(stats.suspicious ?? 0);
      const malicious = Number(stats.malicious ?? 0);
      const undetected = Number(stats.undetected ?? 0);
      const timeout = Number(stats.timeout ?? 0);
      const total = harmless + suspicious + malicious + undetected + timeout;

      let threatLevel: "safe" | "suspicious" | "malicious" = "safe";
      if (malicious >= 1) threatLevel = "malicious";
      else if (suspicious >= 1) threatLevel = "suspicious";

      const detected = malicious + suspicious;
      const confidence =
        total > 0
          ? threatLevel === "safe"
            ? Math.round(((harmless + undetected) / total) * 100)
            : Math.round((detected / total) * 100)
          : 0;

      return {
        ok: true,
        threatLevel,
        status: attrs.status === "completed" ? "completed" : "processing",
        stats: { harmless, suspicious, malicious, undetected, timeout, total },
        confidence,
        scannedUrl: data.url,
        analysisId,
      };
    } catch (err) {
      console.error("scanUrl error", err);
      return { ok: false, error: "Security scan temporarily unavailable. Please try again." };
    }
  });
