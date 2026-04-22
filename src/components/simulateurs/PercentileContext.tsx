"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { CSP, TrancheAge } from "@/lib/calculators/percentile-salaire";

export interface PercentileState {
  salaireMensuelNet: number;
  csp: CSP;
  age: TrancheAge;
}

export const PERCENTILE_DEFAULTS: PercentileState = {
  salaireMensuelNet: 2500,
  csp: "Tous",
  age: "Tous",
};

type PercentileCtxValue = {
  state: PercentileState;
  debouncedState: PercentileState;
  update: <K extends keyof PercentileState>(
    key: K,
    value: PercentileState[K],
  ) => void;
};

const PercentileCtx = createContext<PercentileCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function PercentileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<PercentileState>(PERCENTILE_DEFAULTS);
  const debouncedState = useDebounced(state, 150);

  const update = useCallback(
    <K extends keyof PercentileState>(key: K, value: PercentileState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <PercentileCtx.Provider value={{ state, debouncedState, update }}>
      {children}
    </PercentileCtx.Provider>
  );
}

export function usePercentile(): PercentileCtxValue {
  const ctx = useContext(PercentileCtx);
  if (!ctx) {
    throw new Error("usePercentile must be used inside <PercentileProvider>");
  }
  return ctx;
}
