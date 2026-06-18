import Link from "next/link";
import { Reveal } from "../Reveal";

const PRODUTOS_3D = [
  {
    href: "/produto/vs-can-001",
    titulo: "Caneca",
    frase: "Sua imaginação em uma caneca",
    desc: "Gire, troque a estampa, veja a mágica acontecer.",
    gradient: "linear-gradient(135deg, #F5801A, #F5C200)",
    icon: "☕",
  },
  {
    href: "/produto/vs-bod-001",
    titulo: "Body de bebê",
    frase: "O nome do bebê, em cada detalhe",
    desc: "Escolha o tema e veja a peça ganhar vida.",
    gradient: "linear-gradient(135deg, #D02060, #7B2DBE)",
    icon: "👶",
  },
  {
    href: "/produto/vs-cam-001",
    titulo: "Camiseta",
    frase: "Sua arte, do jeito que você imaginou",
    desc: "Envie a imagem e veja o mockup instantaneamente.",
    gradient: "linear-gradient(135deg, #1A7ACA, #00A88A)",
    icon: "👕",
  },
];

export function Studio3DTeaser() {
  return (
    <section className="bg-surface-dark py-24 text-white">
      <div className="container-vs">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Estúdio Vivassol
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Crie e veja em{" "}
            <span className="text-rainbow animate-rainbow-pan">3D</span>
          </h2>
          <p className="mt-4 text-white/60">
            Monte a personalização e veja o produto antes de comprar.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRODUTOS_3D.map((s, i) => (
            <Reveal key={s.titulo} delay={i * 0.1}>
              <Link
                href={s.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]"
              >
                <div
                  className="grid h-28 w-28 place-items-center rounded-3xl shadow-lift transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                  style={{ background: s.gradient }}
                >
                  <span className="text-5xl">{s.icon}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold">{s.frase}</h3>
                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-gap duration-300 group-hover:gap-3">
                  Personalizar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
