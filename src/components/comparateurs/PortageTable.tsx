"use client";

import { useMemo, useState } from "react";
import data from "@/data/societes-portage.json";
import { ShieldIcon } from "@/components/icons";

type Societe = (typeof data)[number];
type SortKey = "frais" | "avis" | "anciennete";

const sortFns: Record<SortKey, (a: Societe, b: Societe) => number> = {
  frais: (a, b) => {
    const fa = parseFloat(a.fraisGestion) || 99;
    const fb = parseFloat(b.fraisGestion) || 99;
    return fa - fb;
  },
  avis: (a, b) => b.avisNote - a.avisNote,
  anciennete: (a, b) => a.creation - b.creation,
};

const sortLabels: Record<SortKey, string> = {
  frais: "Frais ↑",
  avis: "Note ↓",
  anciennete: "Ancienneté ↓",
};

export default function PortageTable() {
  const [sort, setSort] = useState<SortKey>("frais");
  const sorted = useMemo(() => [...data].sort(sortFns[sort]), [sort]);

  return (
    <div>
      <div className="mb-4 inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
        {(Object.keys(sortLabels) as SortKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setSort(k)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              sort === k
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {sortLabels[k]}
          </button>
        ))}
      </div>

      {/* Desktop table — Fix 1: 7 cols, no "Idéal pour" */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-background md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Société</th>
              <th className="whitespace-nowrap px-4 py-3">Frais</th>
              <th className="whitespace-nowrap px-4 py-3">Avis</th>
              <th className="whitespace-nowrap px-4 py-3">PEPS</th>
              <th className="whitespace-nowrap px-4 py-3">Portés</th>
              <th className="whitespace-nowrap px-4 py-3">Réseau</th>
              <th className="whitespace-nowrap px-4 py-3">Avance</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr
                key={s.id}
                className={`border-b border-border transition last:border-b-0 hover:bg-muted/50 ${s.choixSalairia ? "bg-accent/5" : ""}`}
              >
                <td
                  className={`px-4 py-3 ${s.choixSalairia ? "border-l-4 border-accent" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    <a
                      href={`#${s.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {s.nom}
                    </a>
                    {s.choixSalairia && (
                      <span
                        aria-label="Choix Salairia"
                        className="text-accent"
                      >
                        ★
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      ({s.creation})
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-foreground">
                      {s.fraisGestion}
                    </span>
                    {s.plafond && (
                      <span className="text-xs text-accent">
                        Plaf. {s.plafond}
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-foreground">
                      {s.avisNote}/5
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {s.avisNombre} · {s.avisPlateforme}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {s.labelPEPS ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      <ShieldIcon className="h-3 w-3" /> Oui
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Non</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {s.portesTotal}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {s.reseau}
                </td>
                <td className="px-4 py-3">
                  {s.avanceSalaire ? (
                    <span className="text-accent">✅</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-4 md:hidden">
        {sorted.map((s) => (
          <li
            key={s.id}
            className={`rounded-2xl border p-5 shadow-sm ${
              s.choixSalairia
                ? "border-2 border-accent bg-accent/5"
                : "border-border bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <a
                href={`#${s.slug}`}
                className="text-lg font-bold text-primary hover:underline"
              >
                {s.nom}
              </a>
              {s.choixSalairia && (
                <span className="inline-flex shrink-0 items-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  Choix Salairia
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Depuis {s.creation}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Frais</dt>
                <dd className="font-semibold text-foreground">
                  {s.fraisGestion}
                  {s.plafond && (
                    <span className="ml-1 text-xs font-normal text-accent">
                      plaf. {s.plafond}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Avis</dt>
                <dd className="font-semibold text-foreground">
                  {s.avisNote}/5{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({s.avisNombre})
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">PEPS</dt>
                <dd>
                  {s.labelPEPS ? (
                    <span className="text-xs font-semibold text-accent">
                      Oui
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Non</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Avance</dt>
                <dd>
                  {s.avanceSalaire ? (
                    <span className="text-accent">✅</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs italic text-muted-foreground">
              {s.idealPour}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
