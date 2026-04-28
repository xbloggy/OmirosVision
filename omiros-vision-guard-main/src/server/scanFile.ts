import { createServerFn } from "@tanstack/react-start";

const VT_API_KEY = "e76a06db8fb9eb38d2a7e7269aaa4e8d259af82da56a186712a7831ae685abb2";
const MAX_BYTES = 30 * 1024 * 1024; // 30MB

export type FileScanResult =
  | {
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
      confidence: number;
      fileName: string;
      fileSize: number;
      sha256?: string;
      analysisId: string;
    }
  | { ok: false; error: string };

async function pollAnalysis(analysisId: string): Promise<any | null> {
  for (let i = 0; i < 8; i++) {
    const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
      headers: { "x-apikey": VT_API_KEY },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.data?.attributes?.status === "completed") return json;
    await new Promise((r) => setTimeout(r, 2000));
  }
  const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
    headers: { "x-apikey": VT_API_KEY },
  });
  if (!res.ok) return null;
  return res.json();
}

export const scanFile = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): FormData => {
    if (!(input instanceof FormData)) throw new Error("Expected FormData");
    return input;
  })
  .handler(async ({ data }): Promise<FileScanResult> => {
    try {
      const file = data.get("file");
      if (!(file instanceof File)) {
        return { ok: false, error: "No file provided." };
      }
      if (file.size === 0) {
        return { ok: false, error: "Empty file." };
      }
      if (file.size > MAX_BYTES) {
        return { ok: false, error: "File too large. Maximum size is 30MB." };
      }

      const fileName = file.name.slice(0, 255);
      const fileSize = file.size;

      // Submit file to VirusTotal
      const upload = new FormData();
      upload.append("file", file, fileName);

      const submit = await fetch("https://www.virustotal.com/api/v3/files", {
        method: "POST",
        headers: {
          "x-apikey": VT_API_KEY,
          accept: "application/json",
        },
        body: upload,
      });

      if (!submit.ok) {
        console.error("VT file submit failed", submit.status, await submit.text());
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

      const sha256: string | undefined =
        analysis?.meta?.file_info?.sha256 ?? undefined;

      return {
        ok: true,
        threatLevel,
        status: attrs.status === "completed" ? "completed" : "processing",
        stats: { harmless, suspicious, malicious, undetected, timeout, total },
        confidence,
        fileName,
        fileSize,
        sha256,
        analysisId,
      };
    } catch (err) {
      console.error("scanFile error", err);
      return { ok: false, error: "Security scan temporarily unavailable. Please try again." };
    }
  });
