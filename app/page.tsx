"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Reveal } from "./components/Reveal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string; 'camera-controls'?: boolean; 'auto-rotate'?: boolean;
        'auto-rotate-delay'?: string; 'rotation-per-second'?: string;
        'environment-image'?: string; exposure?: string;
        'shadow-intensity'?: string; 'shadow-softness'?: string;
        'camera-orbit'?: string; 'field-of-view'?: string;
        'disable-zoom'?: boolean; 'disable-pan'?: boolean;
        'touch-action'?: string; 'interaction-prompt'?: string;
        class?: string;
      }, HTMLElement>
    }
  }
}

/* ---- icon SVGs ---- */
function Icon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const common = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", className, style };
  switch (name) {
    case "hand": return <svg {...common}><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11m0 0V5a1.5 1.5 0 0 1 3 0v6m0 0V6.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6 7s-6-2.5-6-6v-1.5a1.5 1.5 0 0 1 3 0V13" /></svg>;
    case "spark": return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>;
    case "eye": return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "truck": return <svg {...common}><path d="M3 6h10v9H3zM13 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>;
    case "arrow": return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "left": return <svg {...common}><path d="M15 6l-6 6 6 6" /></svg>;
    case "right": return <svg {...common}><path d="M9 6l6 6-6 6" /></svg>;
    case "wpp": return <svg {...common}><path d="M4 20l1.4-4A8 8 0 1 1 9 19.6L4 20Z" /><path d="M9 10c.5 2 2.5 4 4.5 4.5" /></svg>;
    default: return null;
  }
}

/* ---- slide data ---- */
const SLIDES = [
  {
    tag: "Linha Bebê",
    kicker: "Os primeiros dias",
    title: ["A primeira lembrança,", "feita à mão."],
    sub: "Bodies, mantas e naninhas personalizados que transformam o começo de uma vida em memória para sempre.",
    cta1: "Ver Linha Bebê", cta1Href: "/bebe",
    cta2: "Personalizar agora", cta2Href: "/personalizar",
    tint: "#FFE7D9", tint2: "#FFD9CE",
    accent: "#E84525", accent2: "#F5801A",
    art: "soft",
    artColors: ["#E84525", "#F5801A", "#F5C200"],
  },
  {
    tag: "Canecas",
    kicker: "Todo dia, do seu jeito",
    title: ["Sua xícara favorita", "agora tem nome."],
    sub: "Canecas de cerâmica com a sua foto, sua frase, a sua história. O café de cada manhã fica um pouco mais seu.",
    cta1: "Ver Canecas", cta1Href: "/presentes",
    cta2: "Criar a minha", cta2Href: "/personalizar",
    tint: "#D9F1F0", tint2: "#D2E8FB",
    accent: "#00A88A", accent2: "#1A7ACA",
    art: "mug",
    artColors: ["#00A88A", "#1A7ACA"],
  },
  {
    tag: "Camisetas",
    kicker: "Vista uma ideia",
    title: ["Vista uma ideia.", "Vista a sua."],
    sub: "Camisetas estampadas com qualidade que dura. Para times, famílias, eventos — ou só porque a ideia é boa demais.",
    cta1: "Ver Camisetas", cta1Href: "/presentes",
    cta2: "Montar estampa", cta2Href: "/personalizar",
    tint: "#E4F3D6", tint2: "#FBF2CC",
    accent: "#68B82A", accent2: "#F5C200",
    art: "shirt",
    artColors: ["#68B82A", "#F5C200", "#00A88A"],
  },
  {
    tag: "Presentes",
    kicker: "Para guardar",
    title: ["O presente que", "ninguém mais tem."],
    sub: "Polaroides, kits e lembranças únicas. Porque o que é feito sob medida fica guardado por muito mais tempo.",
    cta1: "Ver Presentes", cta1Href: "/presentes",
    cta2: "Quero presentear", cta2Href: "/personalizar",
    tint: "#ECE0F7", tint2: "#FAD9E8",
    accent: "#7B2DBE", accent2: "#D02060",
    art: "gift",
    artColors: ["#7B2DBE", "#D02060", "#F5801A"],
  },
  {
    tag: "A Marca",
    kicker: "Vivassol Personalizados",
    title: ["Cada detalhe brilha", "mais com a Vivassol."],
    sub: "De Monte Carmelo para todo o Brasil. Uma fábrica de afeto onde cada peça nasce de uma ideia sua.",
    cta1: "Conheça a marca", cta1Href: "/sobre",
    cta2: "Fale no WhatsApp", cta2Href: "https://wa.me/5534999999999",
    tint: "#FFFAE0", tint2: "#FFF3C2",
    accent: "#F5C200", accent2: "#F5801A",
    art: "brand",
    artColors: ["#F5C200", "#F5801A"],
  },
];

const DIFERENCIAIS = [
  { t: "Feito à mão", d: "Acabamento cuidado, peça por peça", icon: "hand", c1: "#E84525", c2: "#F5801A" },
  { t: "100% personalizável", d: "Sua foto, seu nome, sua ideia", icon: "spark", c1: "#F5C200", c2: "#F5801A" },
  { t: "Preview antes de produzir", d: "Você aprova a arte antes de imprimir", icon: "eye", c1: "#1A7ACA", c2: "#00A88A" },
  { t: "Enviamos para todo o Brasil", d: "Embalado com carinho, chega rapidinho", icon: "truck", c1: "#68B82A", c2: "#00A88A" },
];

const PRODUTOS = [
  { nome: "Body personalizado", preco: "49,90", c1: "#E84525", c2: "#F5801A" },
  { nome: "Kit manta + naninha", preco: "129,90", c1: "#F5801A", c2: "#F5C200" },
  { nome: "Prendedor de chupeta", preco: "34,90", c1: "#D02060", c2: "#E84525" },
  { nome: "Caneca personalizada", preco: "44,90", c1: "#00A88A", c2: "#1A7ACA" },
  { nome: "Camiseta estampada", preco: "59,90", c1: "#68B82A", c2: "#F5C200" },
  { nome: "Polaroides (kit 12)", preco: "29,90", c1: "#7B2DBE", c2: "#D02060" },
];

/* ---- Hero Art ---- */
function HeroArt({ slide, modelLoaded }: { slide: typeof SLIDES[0]; modelLoaded: boolean }) {
  const { art, accent, accent2, artColors } = slide;

  if (art === "brand") {
    return (
      <div className="relative flex items-center justify-center" style={{ minHeight: 440 }}>
        <div className="absolute rounded-full blur-3xl opacity-50"
          style={{ width: 420, height: 420, background: `radial-gradient(circle, ${accent}55, transparent 65%)` }} />
        <div className="absolute float2" style={{ top: "10%", left: "15%" }}>
          <div className="rounded-2xl" style={{ width: 44, height: 44, background: accent2, opacity: 0.8, transform: "rotate(14deg)" }} />
        </div>
        <div className="absolute float" style={{ bottom: "12%", right: "12%" }}>
          <div className="rounded-full" style={{ width: 26, height: 26, background: accent }} />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/icons/vivassol-symbol.png`}
          alt="Vivassol"
          style={{ width: 300, height: 300, animation: "spinslow 36s linear infinite", filter: "drop-shadow(0 30px 60px rgba(0,0,0,.16))" }}
          draggable={false}
        />
      </div>
    );
  }

  if (art === "mug") {
    return (
      <div className="relative flex items-center justify-center" style={{ minHeight: 440 }}>
        <div className="absolute rounded-full blur-3xl opacity-50"
          style={{ width: 420, height: 420, background: `radial-gradient(circle, ${accent}55, transparent 65%)` }} />
        {modelLoaded && (
          <model-viewer
            class="hero-mv"
            src={`${BASE}/models/caneca.glb`}
            camera-controls
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="-20deg"
            environment-image="neutral"
            exposure="1.1"
            shadow-intensity="1.2"
            shadow-softness="0.8"
            camera-orbit="-10deg 72deg 88%"
            field-of-view="28deg"
            disable-zoom
            disable-pan
            touch-action="pan-y"
            interaction-prompt="none"
            style={{
              width: 460, height: 550,
              background: "transparent",
              filter: `drop-shadow(0 40px 60px ${accent}55)`
            } as React.CSSProperties}
          />
        )}
        {!modelLoaded && (
          <div className="rounded-[34px]" style={{ width: 330, height: 400, background: `linear-gradient(160deg, ${accent}22, ${accent2}33)` }} />
        )}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-2 font-display font-bold text-white text-sm shadow-xl whitespace-nowrap"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}>
          {slide.tag} Personalizada
        </div>
      </div>
    );
  }

  // generic art: colored gradient card with floating shapes
  const [c1, c2, c3] = artColors;
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 440 }}>
      <div className="absolute rounded-full blur-3xl opacity-50"
        style={{ width: 420, height: 420, background: `radial-gradient(circle, ${accent}55, transparent 65%)` }} />
      <div className="absolute bottom-6 rounded-[50%] blur-xl opacity-40"
        style={{ width: 340, height: 46, background: `radial-gradient(ellipse, ${accent}, transparent 70%)` }} />

      {/* floating shapes */}
      <div className="absolute float" style={{ top: "8%", left: "12%" }}>
        <div className="rounded-2xl" style={{ width: 54, height: 54, background: c2 || accent2, opacity: 0.85, transform: "rotate(12deg)" }} />
      </div>
      <div className="absolute float2" style={{ bottom: "14%", right: "10%" }}>
        <div className="rounded-full" style={{ width: 30, height: 30, background: c1 || accent }} />
      </div>
      <div className="absolute float2" style={{ top: "18%", right: "18%" }}>
        <div className="rounded-full" style={{ width: 14, height: 14, background: c3 || accent2, opacity: 0.7 }} />
      </div>

      <div className="float rounded-[34px] shadow-2xl"
        style={{
          width: 330, height: 400,
          background: `linear-gradient(160deg, ${accent}22, ${accent2}33)`,
          boxShadow: `0 40px 90px -30px ${accent}55`
        }}>
        <div className="w-full h-full rounded-[34px]" style={{ background: `linear-gradient(160deg, ${accent}18, ${accent2}28)` }} />
      </div>

      <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2 font-display font-bold text-white text-sm shadow-lg"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }}>
        {slide.tag}
      </div>
    </div>
  );
}

/* ---- Hero ---- */
const FILL_MS = 6500;
const RETRACT_MS = 420;

function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [retractIdx, setRetractIdx] = useState<number | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const idxRef = useRef(0);
  const n = SLIDES.length;

  // load model-viewer script once
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector('script[data-mv]')) { setModelLoaded(true); return; }
    const s = document.createElement("script");
    s.type = "module";
    s.setAttribute("data-mv", "1");
    s.src = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
    s.onload = () => setModelLoaded(true);
    document.head.appendChild(s);
  }, []);

  const changeSlide = useCallback((newIdx: number) => {
    const cur = idxRef.current;
    setRetractIdx(cur);
    setTimeout(() => {
      const next = ((newIdx % n) + n) % n;
      idxRef.current = next;
      setRetractIdx(null);
      setIdx(next);
    }, RETRACT_MS);
  }, [n]);

  const go = useCallback((d: number) => changeSlide(idxRef.current + d), [changeSlide]);
  const at = useCallback((k: number) => { if (k !== idxRef.current) changeSlide(k); }, [changeSlide]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), FILL_MS);
    return () => clearTimeout(t);
  }, [idx, paused, go]);

  const s = SLIDES[idx];

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* cross-fade backgrounds */}
      {SLIDES.map((sl, k) => (
        <div key={k} className="absolute inset-0 transition-opacity duration-[1100ms]"
          style={{
            opacity: k === idx ? 1 : 0,
            background: `linear-gradient(165deg, ${sl.tint} 0%, ${sl.tint2} 38%, #FAFAFA 86%)`
          }} />
      ))}
      {/* rainbow seam */}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] opacity-60 bg-brand-rainbow" style={{ zIndex: 1 }} />

      {/* content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ minHeight: "calc(100vh - 200px)" }}>
          {/* text */}
          <div key={`text-${idx}`} className="flex flex-col gap-0">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full self-start animate-[fade-up_0.5s_ease_forwards]"
              style={{ color: s.accent, background: "#ffffffcc", boxShadow: "0 2px 14px rgba(17,17,24,.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
              {s.kicker}
            </span>
            <h1
              className="font-display font-extrabold text-ink mt-6 leading-[1.02] tracking-tight animate-[fade-up_0.6s_0.1s_ease_forwards] opacity-0"
              style={{ fontSize: "clamp(2.6rem,5.2vw,4.6rem)" }}
            >
              {s.title[0]}<br />
              <span style={{ color: s.accent }}>{s.title[1]}</span>
            </h1>
            <p
              className="text-ink-soft mt-6 max-w-xl animate-[fade-up_0.6s_0.2s_ease_forwards] opacity-0"
              style={{ fontSize: "clamp(1.05rem,1.4vw,1.3rem)", lineHeight: 1.55 }}
            >
              {s.sub}
            </p>
            <div className="flex flex-wrap gap-4 mt-9 animate-[fade-up_0.6s_0.3s_ease_forwards] opacity-0">
              {s.cta2Href.startsWith("http") ? (
                <a
                  href={s.cta1Href}
                  className="inline-flex items-center gap-2 text-white font-display font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-1"
                  style={{ background: `linear-gradient(120deg, ${s.accent}, ${s.accent2})`, boxShadow: `0 16px 34px -12px ${s.accent}99` }}
                >
                  {s.cta1} <Icon name="arrow" className="w-5 h-5" />
                </a>
              ) : (
                <Link
                  href={s.cta1Href}
                  className="inline-flex items-center gap-2 text-white font-display font-semibold px-7 py-4 rounded-full transition-transform hover:-translate-y-1"
                  style={{ background: `linear-gradient(120deg, ${s.accent}, ${s.accent2})`, boxShadow: `0 16px 34px -12px ${s.accent}99` }}
                >
                  {s.cta1} <Icon name="arrow" className="w-5 h-5" />
                </Link>
              )}
              {s.cta2Href.startsWith("http") ? (
                <a
                  href={s.cta2Href}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display font-semibold px-7 py-4 rounded-full bg-white text-ink transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "0 10px 30px -14px rgba(17,17,24,.4)", border: "1px solid #ececf2" }}
                >
                  {s.cta2}
                </a>
              ) : (
                <Link
                  href={s.cta2Href}
                  className="inline-flex items-center gap-2 font-display font-semibold px-7 py-4 rounded-full bg-white text-ink transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "0 10px 30px -14px rgba(17,17,24,.4)", border: "1px solid #ececf2" }}
                >
                  {s.cta2}
                </Link>
              )}
            </div>
          </div>

          {/* art */}
          <div key={`art-${idx}`} className="flex items-center justify-center">
            <HeroArt slide={s} modelLoaded={modelLoaded} />
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="absolute left-0 right-0 bottom-8 px-5 sm:px-8" style={{ zIndex: 20 }}>
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
          {/* counter */}
          <div className="font-display font-bold tabular-nums" style={{ fontSize: "1.05rem" }}>
            <span style={{ color: s.accent }}>{String(idx + 1).padStart(2, "0")}</span>
            <span className="text-ink-soft"> / {String(n).padStart(2, "0")}</span>
          </div>

          {/* dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((sl, k) => (
              <button
                key={k}
                onClick={() => at(k)}
                aria-label={`Slide ${k + 1}`}
                className="relative overflow-hidden rounded-full"
                style={{
                  height: 8,
                  width: k === idx ? 56 : 8,
                  background: k <= idx ? sl.accent : sl.accent + "44",
                  transition: "width .4s cubic-bezier(.16,1,.3,1)"
                }}
              >
                {k === idx && !paused && k !== retractIdx && (
                  <span
                    key={`fill-${idx}`}
                    className="absolute inset-0 rounded-full origin-left"
                    style={{ background: sl.accent, animation: `progressFill ${FILL_MS}ms linear forwards` }}
                  />
                )}
                {k === retractIdx && (
                  <span
                    key={`ret-${retractIdx}`}
                    className="absolute inset-0 rounded-full origin-left"
                    style={{ background: sl.accent, animation: `progressRetract ${RETRACT_MS}ms cubic-bezier(.4,0,1,1) forwards` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* arrows */}
          <div className="flex items-center gap-3">
            <button onClick={() => go(-1)} aria-label="Anterior"
              className="w-12 h-12 rounded-full bg-white grid place-items-center text-ink"
              style={{ boxShadow: "0 10px 26px -12px rgba(17,17,24,.4)" }}>
              <Icon name="left" className="w-5 h-5" />
            </button>
            <button onClick={() => go(1)} aria-label="Próximo"
              className="w-12 h-12 rounded-full grid place-items-center text-white"
              style={{ background: `linear-gradient(120deg, ${s.accent}, ${s.accent2})`, boxShadow: `0 12px 26px -10px ${s.accent}aa` }}>
              <Icon name="right" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Diferenciais ---- */
function Diferenciais() {
  return (
    <section className="relative bg-surface py-16 md:py-20 border-y border-black/5">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {DIFERENCIAIS.map((d, k) => (
          <Reveal key={k} delay={k * 90}>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-2xl grid place-items-center text-white"
                style={{ background: `linear-gradient(135deg, ${d.c1}, ${d.c2})` }}>
                <Icon name={d.icon} className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ink text-[1.05rem] leading-tight">{d.t}</h3>
                <p className="text-ink-soft text-sm mt-1 leading-snug">{d.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---- Dois Mundos ---- */
const MUNDOS = [
  {
    tag: "Linha Bebê",
    title: "Para celebrar quem acabou de chegar",
    desc: "Enxoval e lembranças personalizadas com o nome, a data e o carinho de quem espera por esse momento.",
    itens: ["Body personalizado", "Manta + naninha", "Prendedor de chupeta", "Lembrancinhas"],
    ctaLabel: "Explorar Linha Bebê",
    ctaHref: "/bebe",
    bg: "linear-gradient(160deg,#FFF1E9,#FFE0E6)",
    badge: "linear-gradient(120deg,#E84525,#F5801A)",
    cta: "linear-gradient(120deg,#E84525,#F5801A)",
    inkColor: "#7a2417",
  },
  {
    tag: "Presentes",
    title: "Para marcar quem você ama",
    desc: "Canecas, camisetas e polaroides que viram presente inesquecível. O detalhe que ninguém mais vai ter.",
    itens: ["Canecas", "Camisetas", "Polaroides", "Kits especiais"],
    ctaLabel: "Explorar Presentes",
    ctaHref: "/presentes",
    bg: "linear-gradient(160deg,#EDE4FA,#DCE9FB)",
    badge: "linear-gradient(120deg,#7B2DBE,#1A7ACA)",
    cta: "linear-gradient(120deg,#7B2DBE,#D02060)",
    inkColor: "#3a1d63",
  },
];

function DoisMundos() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="text-center flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rainbow">Dois mundos, um mesmo carinho</span>
          <h2 className="font-display font-extrabold text-ink mt-4 leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.1rem,4vw,3.4rem)" }}>Escolha por onde começar</h2>
          <p className="text-ink-soft mt-5 text-lg max-w-2xl">Da chegada de um bebê ao presente perfeito — tudo feito sob medida, do jeitinho que você imaginou.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-7 mt-16">
          {MUNDOS.map((m, k) => (
            <Reveal key={k}>
              <div className="rounded-[36px] overflow-hidden h-full transition-transform hover:-translate-y-2 duration-300"
                style={{ background: m.bg, boxShadow: "0 30px 70px -40px rgba(17,17,24,.4)", border: "1px solid #00000008" }}>
                <div className="p-9 md:p-11">
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full text-white"
                    style={{ background: m.badge }}>{m.tag}</span>
                  <h3 className="font-display font-extrabold mt-6 leading-[1.04] tracking-tight"
                    style={{ fontSize: "clamp(1.9rem,3vw,2.7rem)", color: m.inkColor }}>{m.title}</h3>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {m.itens.map((it) => (
                      <li key={it} className="text-sm font-medium px-3.5 py-2 rounded-full bg-white/80 text-ink/80">{it}</li>
                    ))}
                  </ul>
                  <Link href={m.ctaHref}
                    className="mt-8 inline-flex items-center gap-2 font-display font-semibold px-6 py-3.5 rounded-full text-white transition-transform hover:-translate-y-1"
                    style={{ background: m.cta }}>
                    {m.ctaLabel}
                    <Icon name="arrow" className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Products Grid ---- */
function Produtos() {
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg,#FAFAFA,#F3F1F7)" }}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#7B2DBE" }}>Mais amados</span>
            <h2 className="font-display font-extrabold text-ink mt-4 leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem,3.6vw,3.2rem)" }}>Os favoritos da Vivassol</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {PRODUTOS.map((p, idx) => (
            <Reveal key={p.nome} delay={(idx % 3) * 100}>
              <div className="rounded-[28px] bg-white overflow-hidden transition-transform hover:-translate-y-2 duration-300 h-full"
                style={{ boxShadow: "0 24px 60px -38px rgba(17,17,24,.45)", border: "1px solid #f0f0f4" }}>
                {/* colored top band */}
                <div className="h-48 w-full" style={{ background: `linear-gradient(160deg, ${p.c1}22, ${p.c2}33)` }}>
                  <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${p.c1}18, ${p.c2}28)` }} />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-ink text-xl">{p.nome}</h3>
                  <div className="flex items-end justify-between mt-5">
                    <div>
                      <span className="text-xs text-ink-soft">a partir de</span>
                      <div className="font-display font-extrabold text-ink text-2xl leading-none">R$ {p.preco}</div>
                    </div>
                    <a
                      href="https://wa.me/5534999999999"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-white px-5 py-3 rounded-full"
                      style={{ background: `linear-gradient(120deg, ${p.c1}, ${p.c2})` }}
                    >
                      <Icon name="wpp" className="w-4 h-4" />
                      Pedir
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Dark CTA ---- */
function CTABand() {
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative rounded-[40px] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center"
            style={{ background: "#111118" }}>
            <div className="absolute inset-0 opacity-90"
              style={{ background: "radial-gradient(circle at 20% 20%, #7B2DBE55, transparent 45%), radial-gradient(circle at 80% 70%, #E8452555, transparent 45%)" }} />
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/icons/vivassol-symbol.png`}
                alt="Vivassol"
                className="w-16 h-16 mx-auto mb-7"
                style={{ animation: "spinslow 36s linear infinite" }}
                draggable={false}
              />
              <h2 className="font-display font-extrabold text-white leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2rem,4vw,3.4rem)" }}>
                Tem uma ideia na cabeça?<br />
                <span className="text-rainbow">A gente faz brilhar.</span>
              </h2>
              <p className="text-white/70 mt-5 text-lg max-w-xl mx-auto">
                Envie sua arte, sua foto ou só a vontade. Criamos o preview antes de produzir — você aprova e a gente entrega.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-9">
                <a
                  href="https://wa.me/5534999999999"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-display font-semibold px-8 py-4 rounded-full text-ink bg-white transition-transform hover:-translate-y-1"
                >
                  <Icon name="wpp" className="w-5 h-5" />
                  Começar meu pedido
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Page ---- */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Diferenciais />
      <DoisMundos />
      <Produtos />
      <CTABand />
    </>
  );
}
