"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type RuntimeRoute = "frontier" | "local" | "sovereign";
export type RuntimeSource = "agents" | "cadre";
export type RuntimeEnvironment = "sandbox" | "shadow" | "production";
export type RuntimeVerdict = "PASS" | "PARK" | "BLOCK";

export const RUNTIME_RUN_ID = "RUN-0427";

type RuntimeStoryValue = {
  source: RuntimeSource;
  setSource: (source: RuntimeSource) => void;
  route: RuntimeRoute;
  setRoute: (route: RuntimeRoute) => void;
  verdict: RuntimeVerdict;
  setVerdict: (verdict: RuntimeVerdict) => void;
  environment: RuntimeEnvironment;
  setEnvironment: (environment: RuntimeEnvironment) => void;
};

const RuntimeStoryContext = createContext<RuntimeStoryValue | null>(null);

export function RuntimeStoryProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<RuntimeSource>("agents");
  const [route, setRoute] = useState<RuntimeRoute>("local");
  const [verdict, setVerdict] = useState<RuntimeVerdict>("PASS");
  const [environment, setEnvironment] =
    useState<RuntimeEnvironment>("sandbox");

  const value = useMemo(
    () => ({
      source,
      setSource,
      route,
      setRoute,
      verdict,
      setVerdict,
      environment,
      setEnvironment,
    }),
    [environment, route, source, verdict],
  );

  return (
    <RuntimeStoryContext.Provider value={value}>
      {children}
    </RuntimeStoryContext.Provider>
  );
}

export function useRuntimeStory() {
  const value = useContext(RuntimeStoryContext);
  if (!value) {
    throw new Error("useRuntimeStory must be used inside RuntimeStoryProvider");
  }
  return value;
}
