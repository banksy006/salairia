"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SALARIE_FREELANCE_DEFAULTS,
  type SalarieFreelanceInputs,
} from "@/lib/calculators/salarie-freelance";

type CtxValue = {
  inputs: SalarieFreelanceInputs;
  debouncedInputs: SalarieFreelanceInputs;
  update: <K extends keyof SalarieFreelanceInputs>(
    key: K,
    value: SalarieFreelanceInputs[K],
  ) => void;
};

const Ctx = createContext<CtxValue | null>(null);

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function SalarieFreelanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputs, setInputs] = useState<SalarieFreelanceInputs>(
    SALARIE_FREELANCE_DEFAULTS,
  );
  const debouncedInputs = useDebounced(inputs, 150);

  const update = useCallback(
    <K extends keyof SalarieFreelanceInputs>(
      key: K,
      value: SalarieFreelanceInputs[K],
    ) => {
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

export function useSalarieFreelance(): CtxValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useSalarieFreelance must be used inside <SalarieFreelanceProvider>",
    );
  }
  return ctx;
}
