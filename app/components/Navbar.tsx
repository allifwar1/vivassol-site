"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/bebe", label: "Bebê" },
  { href: "/presentes", label: "Presentes" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

const HOME_VARIANTS = [
  { href: "/", label: "V1" },
  { href: "/home-v2", label: "V2" },
  { href: "/home-v3", label: "V3" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/60 bg-surface/80 backdrop-blur-xl">
      <div className="rule-rainbow !h-0.5" />
      <nav className="container-vs flex h-16 items-center justify-between">
        <Logo />

        {/* Links desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Home variant switcher */}
        <div className="hidden items-center gap-1 md:flex">
          {HOME_VARIANTS.map((v) => {
            const isActive = pathname === v.href || (v.href !== "/" && pathname.startsWith(v.href));
            return (
              <Link key={v.href} href={v.href} title={`Home ${v.label}`}
                className={clsx(
                  "flex h-7 w-9 flex-col items-center justify-center gap-[3px] rounded-lg transition-all",
                  isActive ? "bg-ink text-white" : "text-ink-soft hover:bg-surface-soft hover:text-ink"
                )}>
                <HomeIcon />
                <span className="text-[9px] font-bold leading-none">{v.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/busca"
            aria-label="Buscar produtos"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <BagIcon />
          </Link>
          {/* Botão menu mobile */}
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={clsx(
          "overflow-hidden border-t border-ink-line/60 bg-surface md:hidden",
          open ? "max-h-80" : "max-h-0"
        )}
        style={{ transition: "max-height 0.35s ease" }}
      >
        <div className="container-vs flex flex-col gap-1 py-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-surface-soft"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
