"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PouvoirAchatInputs } from "@/lib/calculators/pouvoir-achat";

export const PA_DEFAULTS: PouvoirAchatInputs = {
  villeId: "paris",
  villeCompareId: "lyon",
};

type PACtxValue = {
  inputs: PouvoirAchatInputs;
  debouncedInputs: PouvoirAchatInputs;
  update: <K extends keyof PouvoirAchatInputs>(
    key: K,
    value: PouvoirAchatInputs[K],
  ) => void;
};

const PACtx = createContext<PACtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setD(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return d;
}

export function PouvoirAchatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<PouvoirAchatInputs>(PA_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof PouvoirAchatInputs>(
      key: K,
      value: PouvoirAchatInputs[K],
    ) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <PACtx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </PACtx.Provider>
  );
}

export function usePouvoirAchat(): PACtxValue {
  const ctx = useContext(PACtx);
  if (!ctx) throw new Error("usePouvoirAchat requires PouvoirAchatProvider");
  return ctx;
}
