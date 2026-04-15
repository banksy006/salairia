"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type TJMMode = "net" | "tjm";

export interface TJMState {
  mode: TJMMode;
  tjm: number;
  netCible: number;
  joursTravailles: number;
  fraisProMensuels: number;
  tauxPAS: number;
}

export const TJM_DEFAULTS: TJMState = {
  mode: "net",
  tjm: 500,
  netCible: 50_000,
  joursTravailles: 18,
  fraisProMensuels: 200,
  tauxPAS: 0,
};

type TJMCtxValue = {
  state: TJMState;
  debouncedState: TJMState;
  update: <K extends keyof TJMState>(key: K, value: TJMState[K]) => void;
};

const TJMCtx = createContext<TJMCtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function TJMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<TJMState>(TJM_DEFAULTS);
  const debouncedState = useDebounced(state, 150);

  const update = useCallback(
    <K extends keyof TJMState>(key: K, value: TJMState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <TJMCtx.Provider value={{ state, debouncedState, update }}>
      {children}
    </TJMCtx.Provider>
  );
}

export function useTJM(): TJMCtxValue {
  const ctx = useContext(TJMCtx);
  if (!ctx) {
    throw new Error("useTJM must be used inside <TJMProvider>");
  }
  return ctx;
}
