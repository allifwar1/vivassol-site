import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "ghost" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-violet/30";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:shadow-lift hover:-translate-y-0.5",
  dark: "bg-white text-ink hover:shadow-lift hover:-translate-y-0.5",
  ghost:
    "border border-ink-line bg-transparent text-ink hover:border-ink hover:bg-surface-soft",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
