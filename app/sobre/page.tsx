import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre a Vivassol" };

export default function SobrePage() {
  return (
    <>
      <section style={{ background:"linear-gradient(160deg,#FFF9E9,#FFF1DB)" }} className="py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Nossa história</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
            Feito de afeto<br />e capricho
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-ink-soft text-lg leading-relaxed">
              A Vivassol nasceu em Monte Carmelo, no coração de Minas Gerais, do desejo de criar produtos que guardam momentos — a chegada de um bebê, uma data especial, uma lembrança que ficará para sempre.
            </p>
            <p className="text-ink-soft text-lg leading-relaxed mt-6">
              Somos uma fábrica de personalizados 100% artesanal. Cada peça que sai daqui passou pelas mãos de alguém que se importa com o resultado final. Nada é feito em série — tudo começa com o seu pedido.
            </p>
            <p className="text-ink-soft text-lg leading-relaxed mt-6">
              Do body do bebê ao presente para o amor da sua vida: a Vivassol está aqui para transformar a sua ideia em algo real, bonito e único.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { title:"Artesanal", desc:"Cada peça feita à mão, com atenção a cada ponto e detalhe.", color:"#E84525" },
              { title:"Personalizado", desc:"Seu nome, sua data, sua ideia — a gente transforma em produto.", color:"#7B2DBE" },
              { title:"Com afeto", desc:"Embalado com carinho para chegar perfeito até você.", color:"#00A88A" },
            ].map((v) => (
              <div key={v.title} className="rounded-3xl p-8 border border-ink-line/50">
                <div className="w-12 h-12 rounded-2xl mb-6" style={{ background:`linear-gradient(135deg,${v.color},${v.color}77)` }} />
                <h3 className="font-display font-bold text-ink text-xl">{v.title}</h3>
                <p className="text-ink-soft mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl p-10 md:p-16 text-center" style={{ background:"linear-gradient(135deg,#111118,#1e1e30)" }}>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl">Tem uma ideia?</h2>
            <p className="text-white/70 mt-4 text-lg">Fale com a gente pelo WhatsApp e a gente realiza.</p>
            <a
              href="https://wa.me/5534999999999?text=Olá%2C%20tenho%20uma%20ideia%20para%20um%20personalizado!"
              target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-white px-8 py-4 rounded-full transition-opacity hover:opacity-90"
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
