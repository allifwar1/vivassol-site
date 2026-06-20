import Link from "next/link";
import { clsx } from "clsx";

// basePath do GitHub Pages — vazio quando tiver domínio próprio
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Logo({
  variant = "dark",
  showText = true,
  className,
  size,
}: {
  variant?: "dark" | "light";
  showText?: boolean;
  className?: string;
  size?: number;
}) {
  const px = size ?? 36;
  return (
    <Link
      href="/"
      aria-label="Vivassol — página inicial"
      className={clsx("group inline-flex items-center gap-2.5", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/icons/favicon-96x96.png`}
        alt="Vivassol"
        width={px}
        height={px}
        style={{ width: px, height: px }}
        className="transition-transform duration-500 group-hover:rotate-[36deg]"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={clsx(
              "font-display text-xl font-semibold tracking-tight",
              variant === "light" ? "text-white" : "text-ink"
            )}
          >
            Vivassol
          </span>
          <span
            className={clsx(
              "text-[10px] font-medium uppercase tracking-[0.25em]",
              variant === "light" ? "text-white/60" : "text-ink-soft"
            )}
          >
            Personalizados
          </span>
        </span>
      )}
    </Link>
  );
}
