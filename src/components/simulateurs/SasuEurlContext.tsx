"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SasuEurlInputs } from "@/lib/calculators/sasu-eurl";

export const SASU_EURL_DEFAULTS: SasuEurlInputs = {
  caAnnuel: 80_000,
  chargesExploitation: 10_000,
  remunerationNette: 40_000,
  capitalSocial: 1_000,
};

type CtxValue = {
  inputs: SasuEurlInputs;
  debouncedInputs: SasuEurlInputs;
  update: <K extends keyof SasuEurlInputs>(
    key: K,
    value: SasuEurlInputs[K],
  ) => void;
};

const Ctx = createContext<CtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setD(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return d;
}

export function SasuEurlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<SasuEurlInputs>(SASU_EURL_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof SasuEurlInputs>(key: K, value: SasuEurlInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <Ctx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSasuEurl(): CtxValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSasuEurl must be inside <SasuEurlProvider>");
  return ctx;
}
