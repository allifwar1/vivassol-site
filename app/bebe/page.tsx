import type { Metadata } from "next";
import { ProdutosSection } from "../components/ProdutosGrid";

export const metadata: Metadata = { title: "Linha Bebê" };

export default function BebePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg,#FFF1E9,#FFE0E6)" }} className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">Linha Bebê</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Para celebrar quem<br />acabou de chegar
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">
            Enxoval e lembranças personalizadas com o nome, a data e o carinho de quem espera por esse momento.
          </p>
        </div>
      </section>

      {/* Produtos dinâmicos da planilha */}
      <ProdutosSection
        categoria="Bebê"
        titulo="Tudo para o bebê"
        tag="Linha Bebê"
        tagColor="#E84525"
      />

      {/* Por que Vivassol */}
      <section className="bg-surface-soft py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Por que a Vivassol?</span>
          <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">Feito com carinho, do início ao fim</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "100% Artesanal", desc: "Cada peça é feita à mão com atenção a cada detalhe.", color: "#E84525" },
              { title: "Personalização Total", desc: "Nome, data, tema — você escolhe e a gente realiza.", color: "#7B2DBE" },
              { title: "Qualidade Garantida", desc: "Materiais de alta qualidade, aprovados para bebês.", color: "#00A88A" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl" style={{ background: `linear-gradient(135deg,${item.color},${item.color}88)` }} />
                <div>
                  <h3 className="font-display font-bold text-ink text-lg">{item.title}</h3>
                  <p className="text-ink-soft text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
