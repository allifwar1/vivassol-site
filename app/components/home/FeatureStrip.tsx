const FEATURES = [
  { title: "Feito à mão", desc: "Cada peça produzida com cuidado, uma a uma." },
  { title: "100% personalizável", desc: "Nome, cor, arte, foto — do seu jeito." },
  { title: "Preview em 3D", desc: "Veja antes de comprar, sem surpresas." },
  { title: "Envio pra todo Brasil", desc: "Do nosso ateliê até a sua porta." },
];

export function FeatureStrip() {
  return (
    <section className="border-y border-ink-line/60 bg-surface-soft/50">
      <div className="container-vs grid grid-cols-2 gap-px py-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="px-4 py-6 text-center sm:text-left">
            <h3 className="font-display text-sm font-bold text-ink">{f.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
