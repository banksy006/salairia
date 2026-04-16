"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AEInputs } from "@/lib/calculators/auto-entrepreneur";

export const AE_DEFAULTS: AEInputs = {
  caAnnuel: 40_000,
  categorie: "BNC_REGIME_GENERAL",
  acre: false,
  versementLiberatoire: false,
  fraisProAnnuels: 2_000,
};

type AECtxValue = {
  inputs: AEInputs;
  debouncedInputs: AEInputs;
  update: <K extends keyof AEInputs>(key: K, value: AEInputs[K]) => void;
};

const AECtx = createContext<AECtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function AEProvider({ children }: { children: React.ReactNode }) {
  const [inputs, setInputs] = useState<AEInputs>(AE_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof AEInputs>(key: K, value: AEInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <AECtx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </AECtx.Provider>
  );
}

export function useAE(): AECtxValue {
  const ctx = useContext(AECtx);
  if (!ctx) throw new Error("useAE must be used inside <AEProvider>");
  return ctx;
}
