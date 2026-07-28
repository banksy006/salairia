export interface BarDatum {
  label: string;
  value: number;
  /** Ligne secondaire sous le label (ex. « TJM 500 € · 18 j/mois »). */
  hint?: string;
  /** Met la barre en accent — typiquement la valeur gagnante. */
  highlight?: boolean;
}

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/**
 * Barres horizontales en CSS pur : pas de librairie, pas de viewBox à
 * recalculer, responsive par construction. Les valeurs restent lisibles en
 * texte, donc le graphique reste utilisable sans CSS et au lecteur d'écran.
 */
export default function BarChart({
  data,
  caption,
  footnote,
}: {
  data: BarDatum[];
  caption: string;
  footnote?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <figure className="rounded-2xl border border-border bg-white p-6 shadow-md sm:p-8">
      <figcaption className="text-base font-semibold text-foreground">
        {caption}
      </figcaption>

      <ul className="mt-6 space-y-5">
        {data.map((d) => (
          <li key={d.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-foreground">
                {d.label}
                {d.hint ? (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {d.hint}
                  </span>
                ) : null}
              </span>
              <span
                className={`shrink-0 text-base font-bold tabular-nums ${
                  d.highlight ? "text-accent" : "text-foreground"
                }`}
              >
                {EUR.format(d.value)}
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${
                  d.highlight ? "bg-accent" : "bg-primary"
                }`}
                style={{ width: `${Math.max(2, (d.value / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      {footnote ? (
        <p className="mt-6 text-xs italic text-muted-foreground">{footnote}</p>
      ) : null}
    </figure>
  );
}
