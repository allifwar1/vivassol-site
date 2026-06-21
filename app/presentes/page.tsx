import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Presentes Personalizados" };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PRODUTOS = [
  { sku:"VS-CAN-001", nome:"Caneca Personalizada", desc:"Caneca de cerâmica com arte, nome ou foto. Presente clássico que nunca sai de moda.", preco:"R$ 44,90", chips:["Nome","Arte","Foto"], color:"#7B2DBE", img:"p-caneca.png" },
  { sku:"VS-CAM-001", nome:"Camiseta Adulta", desc:"Camiseta 100% algodão com estampa personalizada. Unissex e disponível em vários tamanhos.", preco:"R$ 59,90", chips:["Nome","Arte","Tamanho","Cor"], color:"#1A7ACA", img:"p-camiseta.png" },
  { sku:"VS-POL-001", nome:"Polaroides", desc:"Fotos no estilo polaroide personalizadas. Pacote com 10 unidades para decorar ou presentear.", preco:"R$ 29,90", chips:["Foto","Legenda"], color:"#D02060", img:"p-polaroide.png" },
];

const OCASIOES = ["Aniversário","Dia das Mães","Dia dos Namorados","Formatura","Chá de bebê"];

export default function PresentesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(160deg,#EDE4FA,#DCE9FB)" }} className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Presentes Personalizados</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
            Para marcar quem<br />você ama
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">
            Canecas, camisetas e polaroides que viram presente inesquecível. O detalhe que ninguém mais vai ter.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUTOS.map((p) => (
              <div key={p.sku} className="rounded-3xl bg-white border border-ink-line/50 overflow-hidden flex flex-col">
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
                  </div>
                  <a
                    href={`https://wa.me/5534999999999?text=Olá%2C%20quero%20pedir%20o%20${encodeURIComponent(p.nome)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 font-display font-semibold text-sm text-white py-3 rounded-full transition-opacity hover:opacity-90"
                    style={{ background:"linear-gradient(120deg,#7B2DBE,#D02060)" }}
                  >
                    Pedir pelo WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="bg-surface-soft py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Toda ocasião merece</span>
          <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">Presentes para toda ocasião</h2>
          <div className="flex flex-wrap gap-4 mt-10">
            {OCASIOES.map((o) => (
              <span key={o} className="font-display font-semibold text-sm px-5 py-3 rounded-full border border-ink-line/50 bg-white text-ink">{o}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
