"use client";

import { useMemo } from "react";
import { comparerSasuEurl } from "@/lib/calculators/sasu-eurl";
import { useSasuEurl } from "./SasuEurlContext";

const EUR0 = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export default function SasuEurlApercuCard() {
  const { inputs, debouncedInputs } = useSasuEurl();
  const r = useMemo(
    () => comparerSasuEurl(debouncedInputs),
    [debouncedInputs],
  );

  const best = r.meilleur === "sasu" ? "SASU" : r.meilleur === "eurl" ? "EURL" : "Égal";

  return (
    <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Aperçu instantané
      </p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            SASU — net total / an
          </dt>
          <dd
            className={`mt-1 text-2xl font-bold tabular-nums ${r.meilleur === "sasu" ? "text-primary" : "text-foreground"}`}
          >
            {EUR0.format(r.sasu.netTotal)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            EURL — net total / an
          </dt>
          <dd
            className={`mt-1 text-2xl font-bold tabular-nums ${r.meilleur === "eurl" ? "text-primary" : "text-foreground"}`}
          >
            {EUR0.format(r.eurl.netTotal)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">
            Écart
          </dt>
          <dd className="mt-1 flex items-center gap-2 text-xl font-bold tabular-nums text-accent">
            {r.meilleur !== "egal" && (
              <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                {best}
              </span>
            )}
            {r.ecart > 0 ? `+${EUR0.format(r.ecart)}` : "—"}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs italic text-muted-foreground">
        CA {EUR0.format(inputs.caAnnuel)}, rém. nette{" "}
        {EUR0.format(inputs.remunerationNette)}.
      </p>

      <a
        href="#simulateur"
        className="mt-6 hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:inline-flex"
      >
        Affiner ma simulation ↓
      </a>
    </div>
  );
}
