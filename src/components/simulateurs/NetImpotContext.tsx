"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { NetImpotInputs } from "@/lib/calculators/net-apres-impot";

export const NET_IMPOT_DEFAULTS: NetImpotInputs = {
  netAvantImpot: 2_400,
  mode: "taux-neutre",
  tauxPerso: 0,
};

type NetImpotCtxValue = {
  inputs: NetImpotInputs;
  debouncedInputs: NetImpotInputs;
  update: <K extends keyof NetImpotInputs>(
    key: K,
    value: NetImpotInputs[K],
  ) => void;
};

const NetImpotCtx = createContext<NetImpotCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function NetImpotProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<NetImpotInputs>(NET_IMPOT_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof NetImpotInputs>(key: K, value: NetImpotInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <NetImpotCtx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </NetImpotCtx.Provider>
  );
}

export function useNetImpot(): NetImpotCtxValue {
  const ctx = useContext(NetImpotCtx);
  if (!ctx)
    throw new Error("useNetImpot must be used inside <NetImpotProvider>");
  return ctx;
}
