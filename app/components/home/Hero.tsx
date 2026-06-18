import { Button } from "../Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Brilho de fundo com as cores da marca */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg, #E84525, #F5C200, #68B82A, #1A7ACA, #7B2DBE, #D02060, #E84525)",
        }}
      />

      <div className="container-vs relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-surface/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-rainbow" />
            Personalizados que brilham
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Sua imaginação,
            <br />
            <span className="text-rainbow animate-rainbow-pan">feita à mão.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Da chegada do bebê ao presente perfeito: a Vivassol cria peças únicas,
            do seu jeito. Monte, visualize em 3D e receba em casa.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/presentes">Personalizar agora</Button>
            <Button href="/bebe" variant="ghost">
              Explorar a linha bebê
            </Button>
          </div>

          <dl className="mt-12 flex gap-10">
            <Stat value="+1.400" label="famílias atendidas" />
            <Stat value="100%" label="feito à mão" />
            <Stat value="2" label="mundos, uma marca" />
          </dl>
        </div>

        {/* Vitrine visual (placeholder do showcase 3D — Fase 2 traz o 3D real) */}
        <div className="relative animate-fade-up [animation-delay:120ms]">
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-bold text-ink sm:text-3xl">{value}</dt>
      <dd className="mt-1 text-xs text-ink-soft">{label}</dd>
    </div>
  );
}

/**
 * Showcase visual da hero. Por enquanto um "produto" estilizado com o gradiente
 * da marca girando. Na Fase 2 isto vira a cena 3D interativa (caneca/body/camiseta).
 */
function HeroShowcase() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-[2.5rem] bg-brand-rainbow-soft opacity-90 shadow-lift" />
      <div className="absolute inset-[3px] rounded-[2.4rem] bg-surface" />
      <div className="absolute inset-0 grid place-items-center p-10">
        <div className="text-center">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-brand-rainbow-soft shadow-lift">
            <div className="grid h-32 w-32 place-items-center rounded-full bg-white">
              <span className="font-display text-5xl font-extrabold text-rainbow">
                V
              </span>
            </div>
          </div>
          <p className="mt-8 font-display text-lg font-semibold text-ink">
            Visualizador 3D
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Monte e veja seu produto girar em tempo real
          </p>
          <span className="mt-4 inline-block rounded-full bg-surface-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-violet">
            chegando em breve
          </span>
        </div>
      </div>
    </div>
  );
}
