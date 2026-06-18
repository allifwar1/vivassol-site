import { Button } from "../Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
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
            do seu jeito. Monte, visualize e receba em casa.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/presentes">Personalizar agora</Button>
            <Button href="/bebe" variant="ghost">
              Ver linha bebê
            </Button>
          </div>

          <dl className="mt-12 flex gap-10">
            <Stat value="+1.400" label="famílias atendidas" />
            <Stat value="100%" label="feito à mão" />
            <Stat value="2" label="mundos, uma marca" />
          </dl>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <HeroVisual />
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

function HeroVisual() {
  const items = [
    { label: "Body Bebê", icon: "👶", grad: "linear-gradient(135deg,#D02060,#F5801A)" },
    { label: "Caneca", icon: "☕", grad: "linear-gradient(135deg,#F5801A,#F5C200)" },
    { label: "Camiseta", icon: "👕", grad: "linear-gradient(135deg,#1A7ACA,#7B2DBE)" },
    { label: "Kit Manta", icon: "🎀", grad: "linear-gradient(135deg,#68B82A,#1A7ACA)" },
  ];

  return (
    <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl shadow-lift transition-transform duration-300 hover:-translate-y-1"
          style={{ background: item.grad }}
        >
          <span className="text-5xl">{item.icon}</span>
          <span className="font-display text-sm font-semibold text-white">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
