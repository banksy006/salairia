"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PortageInputs } from "@/lib/calculators/portage";

export const PORTAGE_DEFAULTS: PortageInputs = {
  tjm: 500,
  joursTravailles: 18,
  tauxFraisGestion: 8,
  fraisProRefacturables: 0,
  fraisProNonRefacturables: 0,
  statut: "senior",
  tauxPAS: 0,
};

type PortageCtxValue = {
  inputs: PortageInputs;
  debouncedInputs: PortageInputs;
  update: <K extends keyof PortageInputs>(
    key: K,
    value: PortageInputs[K],
  ) => void;
};

const PortageCtx = createContext<PortageCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function PortageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<PortageInputs>(PORTAGE_DEFAULTS);
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof PortageInputs>(key: K, value: PortageInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <PortageCtx.Provider value={{ inputs, debouncedInputs, update }}>
      {children}
    </PortageCtx.Provider>
  );
}

export function usePortage(): PortageCtxValue {
  const ctx = useContext(PortageCtx);
  if (!ctx) {
    throw new Error("usePortage must be used inside <PortageProvider>");
  }
  return ctx;
}
