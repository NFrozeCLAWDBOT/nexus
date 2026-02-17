import type { AppData } from "@/types";

export const apps: AppData[] = [
  {
    name: "Sentinel",
    description:
      "Real-time vulnerability intelligence dashboard that fuses NVD, CISA KEV, and EPSS data into a single composite risk score.",
    url: "https://sentinel.nfroze.co.uk",
    video: "sentinel.mp4",
    color: {
      name: "Amber",
      accent: "#F59E0B",
      glow: "rgba(245, 158, 11, 0.3)",
      gradient:
        "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
    },
  },
  {
    name: "Oracle",
    description:
      "Guided LLM security assessment framework mapped to the OWASP Top 10 for LLM Applications 2025.",
    url: "https://oracle.nfroze.co.uk",
    video: "oracle.mp4",
    color: {
      name: "Teal",
      accent: "#14B8A6",
      glow: "rgba(20, 184, 166, 0.3)",
      gradient:
        "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.08) 0%, transparent 70%)",
    },
  },
  {
    name: "Bastion",
    description:
      "Dependency risk analyser that resolves full transitive dependency trees and cross-references every package against CVE databases, CISA KEV, maintenance signals, and licence risk.",
    url: "https://bastion.nfroze.co.uk",
    video: "bastion.mp4",
    color: {
      name: "Crimson",
      accent: "#EF4444",
      glow: "rgba(239, 68, 68, 0.3)",
      gradient:
        "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.08) 0%, transparent 70%)",
    },
  },
  {
    name: "Aegis",
    description:
      "Cross-framework AI regulatory compliance mapping across six frameworks — EU AI Act, UK GDPR, ICO, NIST AI RMF, OWASP GenAI, and the Equality Act 2010.",
    url: "https://aegis.nfroze.co.uk",
    video: "aegis.mp4",
    color: {
      name: "Violet",
      accent: "#8B5CF6",
      glow: "rgba(139, 92, 246, 0.3)",
      gradient:
        "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
    },
  },
  {
    name: "Verdant",
    description:
      "Lightweight AWS security posture dashboard that evaluates cloud environments against the CIS AWS Foundations Benchmark.",
    url: "https://verdant.nfroze.co.uk",
    video: "verdant.mp4",
    color: {
      name: "Emerald",
      accent: "#10B981",
      glow: "rgba(16, 185, 129, 0.3)",
      gradient:
        "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
    },
  },
];
