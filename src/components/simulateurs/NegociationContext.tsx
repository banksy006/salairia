"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Experience, Region } from "@/lib/calculators/negociation";

export interface NegociationState {
  metierId: string;
  experience: Experience;
  region: Region;
  salaireActuel: number;
}

export const NEGOCIATION_DEFAULTS: NegociationState = {
  metierId: "dev-web",
  experience: "confirme",
  region: "idf",
  salaireActuel: 42_000,
};

type NegociationCtxValue = {
  state: NegociationState;
  debouncedState: NegociationState;
  update: <K extends keyof NegociationState>(
    key: K,
    value: NegociationState[K],
  ) => void;
};

const NegociationCtx = createContext<NegociationCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function NegociationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<NegociationState>(NEGOCIATION_DEFAULTS);
  const debouncedState = useDebounced(state, 150);

  const update = useCallback(
    <K extends keyof NegociationState>(key: K, value: NegociationState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <NegociationCtx.Provider value={{ state, debouncedState, update }}>
      {children}
    </NegociationCtx.Provider>
  );
}

export function useNegociation(): NegociationCtxValue {
  const ctx = useContext(NegociationCtx);
  if (!ctx) {
    throw new Error("useNegociation must be used inside <NegociationProvider>");
  }
  return ctx;
}
