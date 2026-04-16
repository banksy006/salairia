interface P {
  className?: string;
}

const d = {
  sl: "round" as const,
  sj: "round" as const,
  sw: 1.5,
};

function I({
  className = "w-4 h-4",
  children,
}: P & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={d.sw}
      strokeLinecap={d.sl}
      strokeLinejoin={d.sj}
    >
      {children}
    </svg>
  );
}

export function IconBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-primary/10 text-primary ${className ?? "mr-3 h-8 w-8"}`}
    >
      {children}
    </span>
  );
}

export function CalendarIcon(p: P) {
  return (
    <I {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </I>
  );
}

export function CalculatorIcon(p: P) {
  return (
    <I {...p}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h8M8 14h2M8 18h2M14 14h2M14 18h2" />
    </I>
  );
}

export function MessageCircleIcon(p: P) {
  return (
    <I {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </I>
  );
}

export function ExternalLinkIcon(p: P) {
  return (
    <I {...p}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </I>
  );
}

export function TargetIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </I>
  );
}

export function SparklesIcon(p: P) {
  return (
    <I {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
    </I>
  );
}

export function SearchIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </I>
  );
}

export function CompassIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z" />
    </I>
  );
}

export function RocketIcon(p: P) {
  return (
    <I {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09ZM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </I>
  );
}

export function BriefcaseIcon(p: P) {
  return (
    <I {...p}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12h.01" />
    </I>
  );
}

export function BuildingIcon(p: P) {
  return (
    <I {...p}>
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
    </I>
  );
}

export function ZapIcon(p: P) {
  return (
    <I {...p}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </I>
  );
}

export function ScaleIcon(p: P) {
  return (
    <I {...p}>
      <path d="M12 3v18M3 7l4.5 7h9L21 7M3 7h18" />
    </I>
  );
}

export function ShieldIcon(p: P) {
  return (
    <I {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </I>
  );
}

export function GraduationCapIcon(p: P) {
  return (
    <I {...p}>
      <path d="M22 10 12 5 2 10l10 5 10-5ZM6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </I>
  );
}

export function MailIcon(p: P) {
  return (
    <I {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </I>
  );
}

export function BarChartIcon(p: P) {
  return (
    <I {...p}>
      <path d="M12 20V10M18 20V4M6 20v-4" />
    </I>
  );
}

export function EuroIcon(p: P) {
  return (
    <I {...p}>
      <path d="M17 5.5A7 7 0 0 0 7 11a7 7 0 0 0 10 5.5M5 10h8M5 14h8" />
    </I>
  );
}

export function PercentIcon(p: P) {
  return (
    <I {...p}>
      <path d="m19 5-14 14" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </I>
  );
}

export function TagIcon(p: P) {
  return (
    <I {...p}>
      <path d="M12 2H2v10l9.17 9.17a2 2 0 0 0 2.83 0l7.17-7.17a2 2 0 0 0 0-2.83L12 2Z" />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
    </I>
  );
}

export function FileTextIcon(p: P) {
  return (
    <I {...p}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a1 1 0 0 0 1 1h3M10 13h4M10 17h4M10 9h1" />
    </I>
  );
}

export function AwardIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </I>
  );
}

export function AlertTriangleIcon(p: P) {
  return (
    <I {...p}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01" />
    </I>
  );
}

export function InfoIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </I>
  );
}

export function LightbulbIcon(p: P) {
  return (
    <I {...p}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4" />
    </I>
  );
}

export function UserIcon(p: P) {
  return (
    <I {...p}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </I>
  );
}

export function CoinIcon(p: P) {
  return (
    <I {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </I>
  );
}

export function ReceiptIcon(p: P) {
  return (
    <I {...p}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M8 10h8M8 14h4" />
    </I>
  );
}
