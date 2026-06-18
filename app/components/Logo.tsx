import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * Logo da Vivassol: símbolo (mandala arco-íris) + wordmark.
 * O símbolo vem do asset oficial; o wordmark é tipográfico (Sora) para
 * nitidez perfeita em qualquer tamanho e tela.
 */
export function Logo({
  variant = "dark",
  showText = true,
  className,
}: {
  variant?: "dark" | "light";
  showText?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Vivassol — página inicial"
      className={clsx("group inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/icons/web-app-manifest-192x192.png"
        alt="Vivassol"
        width={40}
        height={40}
        priority
        className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[36deg]"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={clsx(
              "font-display text-xl font-600 tracking-tight",
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
