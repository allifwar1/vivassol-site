import Link from "next/link";
import { Reveal } from "../Reveal";

const SEGMENTS = [
  {
    href: "/bebe",
    eyebrow: "Para os pequenos",
    title: "Linha Bebê",
    desc: "Bodys, macacões, kits manta e naninha, porta-maternidade, prendedor de chupeta e muito mais — com o nome e o tema do seu bebê.",
    items: ["Body personalizado", "Kit manta + naninha", "Porta-maternidade", "Prendedor de chupeta"],
    gradient: "linear-gradient(135deg, #D02060, #F5801A)",
  },
  {
    href: "/presentes",
    eyebrow: "Para presentear",
    title: "Presentes Personalizados",
    desc: "Canecas, garrafinhas, camisetas, porta-retratos, polaroides, cachepôs e caixas de bombom — transformados em lembranças únicas.",
    items: ["Caneca personalizada", "Camiseta com sua arte", "Porta-retrato com foto", "Caixa de bombom"],
    gradient: "linear-gradient(135deg, #1A7ACA, #7B2DBE)",
  },
];

export function SegmentsSection() {
  return (
    <section className="container-vs py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Dois mundos, uma Vivassol
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
          O que você quer criar hoje?
        </h2>
        <p className="mt-4 text-ink-soft">
          Escolha um universo e descubra produtos pensados nos mínimos detalhes.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {SEGMENTS.map((seg, i) => (
          <Reveal key={seg.href} delay={i * 0.1}>
            <Link
              href={seg.href}
              className="group relative block h-full overflow-hidden rounded-4xl border border-ink-line bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-10"
            >
              <div
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: seg.gradient }}
              />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                  {seg.eyebrow}
                </span>
                <h3
                  className="mt-2 font-display text-3xl font-bold"
                  style={{
                    backgroundImage: seg.gradient,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {seg.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                  {seg.desc}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {seg.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-ink-line bg-surface-soft/60 px-3 py-1.5 text-xs font-medium text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-transform duration-300 group-hover:gap-2.5">
                  Explorar
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
