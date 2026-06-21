import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Personalizar" };

const TODOS_PRODUTOS = [
  { nome:"Body Personalizado Bebê", href:"/bebe", preco:"R$ 49,90", color:"#E84525" },
  { nome:"Kit Manta + Naninha", href:"/bebe", preco:"R$ 129,90", color:"#F5801A" },
  { nome:"Prendedor de Chupeta", href:"/bebe", preco:"R$ 34,90", color:"#68B82A" },
  { nome:"Caneca Personalizada", href:"/presentes", preco:"R$ 44,90", color:"#7B2DBE" },
  { nome:"Camiseta Adulta", href:"/presentes", preco:"R$ 59,90", color:"#1A7ACA" },
  { nome:"Fotos Polaroides", href:"/presentes", preco:"R$ 29,90", color:"#D02060" },
];

export default function PersonalizarPage() {
  return (
    <>
      <section className="pt-28 pb-16 md:pt-36 md:pb-24" style={{ background:"linear-gradient(160deg,#F5F0FF,#EDE4FA)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Personalização</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
            A sua ideia,<br />feita à mão
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">
            Cada peça começa com uma ideia sua. A gente transforma em produto real, com qualidade e carinho.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-surface-soft">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Como funciona</span>
          <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">4 passos simples</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { n:"01", title:"Escolha o produto", desc:"Body, caneca, camiseta, polaroide — escolha o que você quer personalizar.", color:"#E84525" },
              { n:"02", title:"Mande sua ideia", desc:"Envie pelo WhatsApp: nome, data, arte ou só uma ideia. A gente orienta.", color:"#F5C200" },
              { n:"03", title:"Aprovamos juntos", desc:"Você recebe um preview antes de produzirmos. Só produzimos com sua aprovação.", color:"#7B2DBE" },
              { n:"04", title:"Receba em casa", desc:"Produzimos com cuidado e enviamos para qualquer lugar do Brasil.", color:"#00A88A" },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-white p-8 border border-ink-line/50">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-white text-xl mb-6" style={{ background:`linear-gradient(135deg,${s.color},${s.color}88)` }}>{s.n}</div>
                <h3 className="font-display font-bold text-ink text-lg">{s.title}</h3>
                <p className="text-ink-soft text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All products */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">Produtos</span>
          <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">O que você pode personalizar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {TODOS_PRODUTOS.map((p) => (
              <div key={p.nome} className="rounded-3xl border border-ink-line/50 overflow-hidden bg-white flex flex-col">
                <div className="h-32 flex items-center justify-center" style={{ background:`linear-gradient(135deg,${p.color}18,${p.color}35)` }}>
                  <div className="w-16 h-16 rounded-2xl" style={{ background:`linear-gradient(135deg,${p.color},${p.color}99)` }} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-ink text-lg">{p.nome}</h3>
                  <span className="font-display font-bold text-2xl text-ink mt-2">{p.preco}</span>
                  <a
                    href={`https://wa.me/5534999999999?text=Olá%2C%20quero%20personalizar%3A%20${encodeURIComponent(p.nome)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 font-display font-semibold text-sm text-white py-3 rounded-full transition-opacity hover:opacity-90"
                    style={{ background:`linear-gradient(120deg,${p.color},${p.color}cc)` }}
                  >
                    Personalizar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="rounded-[2rem] text-center py-16 px-8" style={{ background:"linear-gradient(135deg,#111118,#1e1e30)" }}>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl">Tem uma ideia diferente?</h2>
            <p className="text-white/70 mt-4 text-lg max-w-xl mx-auto">Fala com a gente! A Vivassol faz sob encomenda. Se você imaginou, a gente faz.</p>
            <a
              href="https://wa.me/5534999999999?text=Olá%2C%20tenho%20uma%20ideia%20diferente%20para%20personalizar!"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex w-full sm:w-auto justify-center items-center gap-2 font-display font-semibold text-white px-8 py-4 rounded-full transition-opacity hover:opacity-90"
              style={{ background:"linear-gradient(120deg,#E84525,#D02060)" }}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
