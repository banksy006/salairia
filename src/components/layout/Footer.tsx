import Link from "next/link";

const simulateursLinks = [
  { label: "Portage salarial", href: "/simulateurs/portage-salarial" },
  { label: "TJM freelance", href: "/simulateurs/tjm-freelance" },
  { label: "Auto-entrepreneur", href: "/simulateurs/auto-entrepreneur" },
  { label: "SASU / EURL", href: "/simulateurs/sasu-eurl" },
  { label: "Salaire brut/net", href: "/simulateurs/salaire-brut-net" },
];

const comparateursLinks = [
  { label: "Portage salarial", href: "/comparateurs/portage-salarial" },
];

const ressourcesLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Méthodologie", href: "/methodologie" },
  { label: "Sources", href: "/sources" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "Politique cookies", href: "/politique-cookies" },
];

interface LinkItem {
  label: string;
  href: string;
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly LinkItem[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-background">
        {title}
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-background/70 transition hover:text-background"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="text-2xl font-bold tracking-tight text-background">
              Salairia
            </p>
            <p className="mt-2 text-sm text-background/70">
              Votre rémunération, sans zone d&apos;ombre.
            </p>
            <p className="mt-6 text-sm text-background/60">
              Made with <span aria-hidden>❤️</span> in France
            </p>
          </div>

          <FooterColumn title="Simulateurs" links={simulateursLinks} />
          <FooterColumn title="Comparateurs" links={comparateursLinks} />
          <FooterColumn title="Ressources" links={ressourcesLinks} />
          <FooterColumn title="Légal" links={legalLinks} />
        </div>

        <div className="mt-12 border-t border-background/20 pt-6 text-xs leading-relaxed text-background/60">
          © 2026 Salairia. Édité par Nizar, fondateur de SprintJob.co. Les
          calculs sont indicatifs et ne se substituent pas aux décomptes
          officiels.
        </div>
      </div>
    </footer>
  );
}
