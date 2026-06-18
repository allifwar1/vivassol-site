import { Reveal } from "../Reveal";

const STUDIO = [
  {
    title: "Caneca",
    line: "Sua imaginação em uma caneca",
    desc: "Gire, troque a estampa e veja a mágica acontecer.",
    gradient: "linear-gradient(135deg, #F5801A, #F5C200)",
  },
  {
    title: "Body de bebê",
    line: "O nome do bebê, em 3D",
    desc: "Escolha o tema e veja a peça ganhar vida.",
    gradient: "linear-gradient(135deg, #D02060, #7B2DBE)",
  },
  {
    title: "Camiseta",
    line: "Sua arte, no mockup na hora",
    desc: "Envie a imagem e veja na camiseta instantaneamente.",
    gradient: "linear-gradient(135deg, #1A7ACA, #00A88A)",
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
            Crie e veja em <span className="text-rainbow animate-rainbow-pan">3D</span>
          </h2>
          <p className="mt-4 text-white/60">
            Monte a personalização e visualize o produto girando, antes de comprar.
            Nada de surpresas — só o que você imaginou.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STUDIO.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-4xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:bg-white/[0.06]">
                <div
                  className="grid h-28 w-28 place-items-center rounded-3xl shadow-lift transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                  style={{ background: s.gradient }}
                >
                  <span className="font-display text-2xl font-bold text-white/90">
                    {s.title[0]}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold">{s.line}</h3>
                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  visualizador em breve
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
