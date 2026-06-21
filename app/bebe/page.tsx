import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Linha Bebê" };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PRODUTOS = [
  { sku:"VS-BOD-001", nome:"Body Personalizado Bebê", desc:"Body 100% algodão com nome, data ou tema personalizado. Disponível em várias cores e tamanhos.", preco:"R$ 49,90", chips:["Nome","Tema","Cor","Tamanho"], color:"#E84525", img:"p-body.png" },
  { sku:"VS-KIT-001", nome:"Kit Manta + Naninha", desc:"Manta quentinha e naninha bordadas com o nome do bebê. Presente perfeito para chá de bebê.", preco:"R$ 129,90", precoOriginal:"R$ 149,90", chips:["Nome","Cor","Tema"], color:"#F5801A", img:"p-kit.png" },
  { sku:"VS-PRE-001", nome:"Prendedor de Chupeta", desc:"Artesanal com nome do bebê em miçangas coloridas. Cada peça é única.", preco:"R$ 34,90", chips:["Nome","Cor"], color:"#68B82A", img:"p-chupeta.png" },
];

export default function BebePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(160deg,#FFF1E9,#FFE0E6)" }} className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">Linha Bebê</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
            Para celebrar quem<br />acabou de chegar
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">
            Enxoval e lembranças personalizadas com o nome, a data e o carinho de quem espera por esse momento.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUTOS.map((p) => (
              <div key={p.sku} className="rounded-3xl bg-white border border-ink-line/50 overflow-hidden flex flex-col">
                {/* Product image */}
                <div className="h-40 overflow-hidden" style={{ background:`linear-gradient(135deg,${p.color}22,${p.color}44)` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${BASE}/images/produtos/${p.img}`} alt={p.nome} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-ink text-xl leading-tight">{p.nome}</h3>
                  <p className="text-ink-soft text-sm mt-2 leading-relaxed flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.chips.map((c) => (
                      <span key={c} className="text-xs font-medium px-3 py-1 rounded-full bg-surface-soft text-ink-soft">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-display font-bold text-2xl text-ink">{p.preco}</span>
                    {p.precoOriginal && <span className="text-sm text-ink-soft line-through">{p.precoOriginal}</span>}
                  </div>
                  <a
                    href={`https://wa.me/5534999999999?text=Olá%2C%20quero%20pedir%20o%20${encodeURIComponent(p.nome)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 font-display font-semibold text-sm text-white py-3 rounded-full transition-opacity hover:opacity-90"
                    style={{ background:"linear-gradient(120deg,#E84525,#F5801A)" }}
                  >
                    Pedir pelo WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vivassol */}
      <section className="bg-surface-soft py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Por que a Vivassol?</span>
          <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">Feito com carinho, do início ao fim</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { title:"100% Artesanal", desc:"Cada peça é feita à mão com atenção a cada detalhe.", color:"#E84525" },
              { title:"Personalização Total", desc:"Nome, data, tema — você escolhe e a gente realiza.", color:"#7B2DBE" },
              { title:"Qualidade Garantida", desc:"Materiais de alta qualidade, aprovados para bebês.", color:"#00A88A" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-2xl" style={{ background:`linear-gradient(135deg,${item.color},${item.color}88)` }} />
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
