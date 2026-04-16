"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { BrutNetInputs } from "@/lib/calculators/salaire-brut-net";

export const BRUTNET_DEFAULTS: BrutNetInputs = {
  salaire: 3_000,
  mode: "brut-vers-net",
  periodicite: "mensuel",
  statut: "non-cadre",
  tauxPAS: 0,
};

type BrutNetCtxValue = {
  inputs: BrutNetInputs;
  debouncedInputs: BrutNetInputs;
  update: <K extends keyof BrutNetInputs>(
    key: K,
    value: BrutNetInputs[K],
  ) => void;
};

const BrutNetCtx = createContext<BrutNetCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function BrutNetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<BrutNetInputs>(BRUTNET_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof BrutNetInputs>(key: K, value: BrutNetInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <BrutNetCtx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </BrutNetCtx.Provider>
  );
}

export function useBrutNet(): BrutNetCtxValue {
  const ctx = useContext(BrutNetCtx);
  if (!ctx) throw new Error("useBrutNet must be used inside <BrutNetProvider>");
  return ctx;
}
