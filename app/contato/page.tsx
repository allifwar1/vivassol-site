import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fale com a Vivassol" };

export default function ContatoPage() {
  return (
    <>
      <section style={{ background:"linear-gradient(160deg,#F0FDF4,#DCFCE7)" }} className="py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Contato</span>
          <h1 className="font-display font-extrabold text-ink mt-4 leading-tight" style={{ fontSize:"clamp(2rem,4vw,3.2rem)" }}>
            Fale com<br />a Vivassol
          </h1>
          <p className="mt-5 text-ink-soft text-lg max-w-xl">A gente adora receber suas ideias. Chama no WhatsApp ou no Instagram!</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            <a href="https://wa.me/5534999999999?text=Olá%2C%20quero%20fazer%20um%20pedido!" target="_blank" rel="noopener noreferrer"
              className="rounded-3xl p-8 flex flex-col items-start gap-4 hover:shadow-lift transition-shadow border border-ink-line/50"
              style={{ background:"linear-gradient(135deg,#F0FFF8,#E0FFF0)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background:"#25D366" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-xl">WhatsApp</h3>
                <p className="text-ink-soft mt-1">A forma mais rápida de falar com a gente e fazer seu pedido.</p>
              </div>
              <span className="font-display font-semibold text-sm text-white px-5 py-2.5 rounded-full" style={{ background:"#25D366" }}>Chamar agora</span>
            </a>

            <a href="https://instagram.com/vivassol.com.br" target="_blank" rel="noopener noreferrer"
              className="rounded-3xl p-8 flex flex-col items-start gap-4 hover:shadow-lift transition-shadow border border-ink-line/50"
              style={{ background:"linear-gradient(135deg,#FDF0F8,#F0E4FF)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background:"linear-gradient(135deg,#D02060,#7B2DBE)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-xl">Instagram</h3>
                <p className="text-ink-soft mt-1">Veja os bastidores, novidades e produtos no nosso perfil.</p>
              </div>
              <span className="font-display font-semibold text-sm text-white px-5 py-2.5 rounded-full" style={{ background:"linear-gradient(120deg,#D02060,#7B2DBE)" }}>@vivassol.com.br</span>
            </a>

            <div className="rounded-3xl p-8 flex flex-col items-start gap-4 border border-ink-line/50 bg-surface-soft">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background:"linear-gradient(135deg,#1A7ACA,#00A88A)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-xl">Localização</h3>
                <p className="text-ink-soft mt-1">Monte Carmelo e região, MG.<br />Enviamos para todo o Brasil.</p>
              </div>
            </div>
          </div>

          {/* How to order */}
          <div className="mt-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-violet">Simples assim</span>
            <h2 className="font-display font-extrabold text-ink mt-4 text-3xl md:text-4xl">Como fazer um pedido</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { n:"01", title:"Escolha o produto", desc:"Body, caneca, camiseta, kit — escolha o que mais combina com o presente.", color:"#E84525" },
                { n:"02", title:"Mande sua arte ou ideia", desc:"Envie pelo WhatsApp: nome, data, tema ou arquivo. A gente orienta você.", color:"#7B2DBE" },
                { n:"03", title:"Receba em casa", desc:"Produzimos com cuidado e enviamos para todo o Brasil com segurança.", color:"#00A88A" },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-display font-extrabold text-white text-lg" style={{ background:`linear-gradient(135deg,${step.color},${step.color}88)` }}>{step.n}</div>
                  <div>
                    <h3 className="font-display font-bold text-ink text-lg">{step.title}</h3>
                    <p className="text-ink-soft text-sm mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
