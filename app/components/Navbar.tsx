"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/bebe", label: "Linha Bebê" },
  { href: "/presentes", label: "Presentes" },
  { href: "/personalizar", label: "Personalizar" },
  { href: "/sobre", label: "Sobre" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        solid
          ? { padding: "12px 0", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }
          : { padding: "20px 0" }
      }
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Logo size={solid ? 34 : 40} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-ink/80 hover:text-ink transition-colors relative group"
            >
              {link.label}
              <span
                className="absolute -bottom-1.5 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: "linear-gradient(90deg,#E84525,#F5801A,#F5C200,#68B82A,#00A88A,#1A7ACA,#7B2DBE,#D02060)" }}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5534999999999?text=Olá%2C%20quero%20fazer%20um%20pedido!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 font-display font-semibold text-sm text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(120deg,#E84525,#D02060)",
              boxShadow: "0 10px 24px -12px #E8452599",
            }}
          >
            <WppIcon />
            Fazer pedido
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-ink"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden bg-white border-t border-black/5"
        style={{ maxHeight: open ? "320px" : "0", transition: "max-height 0.35s ease" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-1 py-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5534999999999?text=Olá%2C%20quero%20fazer%20um%20pedido!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center gap-2 font-display font-semibold text-sm text-white px-5 py-3 rounded-xl"
            style={{ background: "linear-gradient(120deg,#E84525,#D02060)" }}
          >
            <WppIcon />
            Fazer pedido pelo WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

function WppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
