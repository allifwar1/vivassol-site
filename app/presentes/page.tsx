import type { Metadata } from "next";
import { ProdutosSection } from "../components/ProdutosGrid";

export const metadata: Metadata = { title: "Presentes Personalizados" };

const OCASIOES = ["Aniversário", "Dia das Mães", "Dia dos Namorados", "Formatura", "Chá de bebê"];

export default function PresentesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg,#EDE4FA,#DCE9FB)" }} className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Presentes Personalizados</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Para marcar quem<br />você ama
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">
            Canecas, camisetas e polaroides que viram presente inesquecível. O detalhe que ninguém mais vai ter.
          </p>
        </div>
      </section>

      {/* Produtos dinâmicos — categoria "Presentes" E "Canecas" E "Camisetas" */}
      <ProdutosSection
        titulo="Presentes que marcam"
        tag="Presentes Personalizados"
        tagColor="#7B2DBE"
      />

      {/* Ocasiões */}
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
