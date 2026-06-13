"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

const API_KEY =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ??
  "fafe6ab48686b428c9159723737a5ebf";

let initialized = false;

export function AmplitudeAnalytics() {
  useEffect(() => {
    if (initialized || !API_KEY) return;
    initialized = true;
    amplitude.initAll(API_KEY, {
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
    });
  }, []);

  return null;
}
