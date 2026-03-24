"use client";

import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    console.log("📊 Performance Monitor Active");

    // 1. Long Task Observer
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn(
          `[PERF] ⚠️ Long Task detected! Duration: ${entry.duration.toFixed(2)}ms. This may cause scroll lag.`
        );
      }
    });

    try {
      longTaskObserver.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      console.error("[PERF] Long Task Observer not supported");
    }

    // 2. Web Vitals (Simple implementation using PerformanceObserver)
    const vitalsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          console.log(`[PERF] 🖼️ LCP: ${entry.startTime.toFixed(2)}ms`);
        }
        if (entry.entryType === "layout-shift") {
          console.log(`[PERF] 📏 CLS: ${(entry as any).value.toFixed(4)}`);
        }
      }
    });

    try {
      vitalsObserver.observe({ entryTypes: ["largest-contentful-paint", "layout-shift"] });
    } catch (e) {
      console.log("[PERF] Web Vitals Observer partially supported");
    }

    return () => {
      longTaskObserver.disconnect();
      vitalsObserver.disconnect();
    };
  }, []);

  return null; // Silent monitor
}
