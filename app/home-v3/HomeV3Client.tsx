"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Script from "next/script";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SYMBOL = `${BASE}/icons/vivassol-symbol.png`;

/* ---- paletas / energias ---- */
const SLIDES_BASE = [
  {
    tag: "Linha Bebê", kicker: "Os primeiros dias",
    title: ["A primeira lembrança,", "feita à mão."],
    sub: "Bodies, mantas e naninhas personalizados que transformam o começo de uma vida em memória para sempre.",
    cta1: "Ver Linha Bebê", cta2: "Personalizar agora",
    accent: "#E84525", accent2: "#F5801A", anim: "anim-rise",
    href1: "/bebe", href2: "/bebe",
  },
  {
    tag: "Canecas", kicker: "Todo dia, do seu jeito",
    title: ["Sua xícara favorita", "agora tem nome."],
    sub: "Canecas de cerâmica com a sua foto, sua frase, a sua história. O café de cada manhã fica um pouco mais seu.",
    cta1: "Ver Canecas", cta2: "Criar a minha",
    accent: "#00A88A", accent2: "#1A7ACA", anim: "anim-side",
    model: `${BASE}/models/caneca.glb`,
    href1: "/presentes", href2: "/presentes",
  },
  {
    tag: "Camisetas", kicker: "Vista uma ideia",
    title: ["Vista uma ideia.", "Vista a sua."],
    sub: "Camisetas estampadas com qualidade que dura. Para times, famílias, eventos — ou só porque a ideia é boa demais.",
    cta1: "Ver Camisetas", cta2: "Montar estampa",
    accent: "#68B82A", accent2: "#F5C200", anim: "anim-wipe",
    href1: "/presentes", href2: "/presentes",
  },
  {
    tag: "Presentes", kicker: "Para guardar",
    title: ["O presente que", "ninguém mais tem."],
    sub: "Polaroides, kits e lembranças únicas. Porque o que é feito sob medida fica guardado por muito mais tempo.",
    cta1: "Ver Presentes", cta2: "Quero presentear",
    accent: "#7B2DBE", accent2: "#D02060", anim: "anim-pop",
    href1: "/presentes", href2: "/presentes",
  },
  {
    tag: "A Marca", kicker: "Vivassol Personalizados",
    title: ["Cada detalhe brilha", "mais com a Vivassol."],
    sub: "De Monte Carmelo para todo o Brasil. Uma fábrica de afeto onde cada peça nasce de uma ideia sua.",
    cta1: "Conheça a marca", cta2: "Fale no WhatsApp",
    accent: "#F5C200", accent2: "#F5801A", anim: "anim-blur",
    brand: true,
    href1: "/sobre", href2: "https://wa.me/5534999999999",
  },
];

function lighten(hex: string, amt: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  const h = (c: number) => Math.round(c + (255 - c) * amt).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

type Slide = typeof SLIDES_BASE[0] & { tint: string; tint2: string };

/* ---- icons ---- */
function Icon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", className, style };
  switch (name) {
    case "arrow": return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "left":  return <svg {...p}><path d="M15 6l-6 6 6 6" /></svg>;
    case "right": return <svg {...p}><path d="M9 6l6 6-6 6" /></svg>;
    case "heart": return <svg {...p}><path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" /></svg>;
    case "hand":  return <svg {...p}><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11m0 0V5a1.5 1.5 0 0 1 3 0v6m0 0V6.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6 7s-6-2.5-6-6v-1.5a1.5 1.5 0 0 1 3 0V13" /></svg>;
    case "spark": return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>;
    case "eye":   return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "truck": return <svg {...p}><path d="M3 6h10v9H3zM13 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>;
    case "insta": return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
    case "pin":   return <svg {...p}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "wpp":   return <svg {...p}><path d="M4 20l1.4-4A8 8 0 1 1 9 19.6L4 20Z" /><path d="M9 10c.5 2 2.5 4 4.5 4.5" /></svg>;
    default: return null;
  }
}

/* ---- Reveal ---- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("v3-shown"), delay); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`v3-reveal ${className}`}>{children}</div>;
}

/* ---- HeroModel (model-viewer) ---- */
function HeroModel({ slide, rot }: { slide: Slide; rot: string }) {
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 480 }}>
      <div className="absolute rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ width: 420, height: 420, background: `radial-gradient(circle, ${slide.accent}66, transparent 65%)` }} />
      {/* @ts-ignore model-viewer web component */}
      <model-viewer
        src={slide.model}
        camera-controls
        disable-zoom
        disable-pan
        touch-action="pan-y"
        interaction-prompt="none"
        camera-orbit="-10deg 72deg 88%"
        field-of-view="28deg"
        rotation-per-second={rot}
        auto-rotate
        auto-rotate-delay="0"
        environment-image="neutral"
        exposure="1.1"
        shadow-intensity="1.2"
        shadow-softness="0.8"
        style={{
          width: "100%", maxWidth: 460, height: 520,
          background: "transparent",
          "--poster-color": "transparent",
          filter: `drop-shadow(0 40px 60px ${slide.accent}55)`,
        } as React.CSSProperties}
      />
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-2xl px-5 py-2 font-sora font-bold text-white text-sm shadow-xl whitespace-nowrap"
        style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent2})` }}>
        {slide.tag} Personalizada
      </div>
    </div>
  );
}

/* ---- HeroArt ---- */
function HeroArt({ slide, rot }: { slide: Slide; rot: string }) {
  const tilt = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = tilt.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 16}deg) rotateX(${-py * 14}deg)`;
  };
  const onLeave = () => { if (tilt.current) tilt.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)"; };

  if (slide.brand) {
    return (
      <div className="relative flex items-center justify-center" style={{ minHeight: 480 }}>
        <div className="absolute rounded-full blur-3xl opacity-40"
          style={{ width: 380, height: 380, background: `radial-gradient(circle, ${slide.accent}55, transparent 65%)` }} />
        <img src={SYMBOL} alt="Vivassol" className="v3-spin relative"
          style={{ width: 300, height: 300, filter: "drop-shadow(0 30px 60px rgba(0,0,0,.16))" }} />
      </div>
    );
  }
  if (slide.model) return <HeroModel slide={slide} rot={rot} />;

  const EMOJI: Record<string, string> = {
    "Linha Bebê": "👶", Camisetas: "👕", Presentes: "🎁",
  };

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 480 }}>
      <div className="absolute rounded-full blur-3xl opacity-40"
        style={{ width: 380, height: 380, background: `radial-gradient(circle, ${slide.accent}55, transparent 65%)` }} />
      <div className="absolute v3-float" style={{ top: "8%", left: "12%" }}>
        <div className="rounded-2xl" style={{ width: 54, height: 54, background: slide.accent2, opacity: 0.85, transform: "rotate(12deg)" }} />
      </div>
      <div className="absolute v3-float2" style={{ bottom: "14%", right: "10%" }}>
        <div className="rounded-full" style={{ width: 30, height: 30, background: slide.accent }} />
      </div>
      <div ref={tilt} onMouseMove={onMove} onMouseLeave={onLeave} className="v3-float relative"
        style={{ transition: "transform .25s cubic-bezier(.16,1,.3,1)", willChange: "transform" }}>
        <div className="rounded-[34px] bg-white shadow-2xl flex items-center justify-center"
          style={{ width: 320, height: 380, boxShadow: "0 40px 90px -30px rgba(17,17,24,.35)", background: `linear-gradient(160deg, ${slide.accent}14, ${slide.accent2}1f)` }}>
          <span style={{ fontSize: 96 }}>{EMOJI[slide.tag] ?? "✨"}</span>
        </div>
        <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2 font-sora font-bold text-white text-sm shadow-lg"
          style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent2})` }}>
          {slide.tag}
        </div>
      </div>
    </div>
  );
}

/* ---- Hero ---- */
const RETRACT_MS = 420;
function Hero({ slides, fillMs, rot }: { slides: Slide[]; fillMs: number; rot: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [retractIdx, setRetractIdx] = useState<number | null>(null);
  const iRef = useRef(0);
  const n = slides.length;

  const changeSlide = useCallback((newIdx: number) => {
    const cur = iRef.current;
    setRetractIdx(cur);
    setTimeout(() => {
      const next = ((newIdx % n) + n) % n;
      iRef.current = next;
      setRetractIdx(null);
      setI(next);
    }, RETRACT_MS);
  }, [n]);

  const go = useCallback((d: number) => changeSlide(iRef.current + d), [changeSlide]);
  const at = useCallback((k: number) => { if (k !== iRef.current) changeSlide(k); }, [changeSlide]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), fillMs);
    return () => clearTimeout(t);
  }, [i, paused, go, fillMs]);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((sl, k) => (
        <div key={k} className="absolute inset-0" style={{
          opacity: k === i ? 1 : 0,
          transition: "opacity 1100ms ease",
          background: `linear-gradient(165deg, ${sl.tint} 0%, ${sl.tint2} 38%, #FAFAFA 86%)`,
        }} />
      ))}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] opacity-60"
        style={{ background: "linear-gradient(90deg,#E84525,#F5801A,#F5C200,#68B82A,#00A88A,#1A7ACA,#7B2DBE,#D02060)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 md:px-10" style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ minHeight: "calc(100vh - 200px)" }}>
          {/* TEXT */}
          <div key={i} className={`v3-is-active ${s.anim} v3-stagger`}>
            <div className="v3-from-left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
                style={{ color: s.accent, background: "#ffffffcc", boxShadow: "0 2px 14px rgba(17,17,24,.06)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                {s.kicker}
              </span>
            </div>
            <h1 className="v3-from-left font-display font-extrabold text-ink mt-6 leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5.2vw, 4.6rem)" }}>
              {s.title[0]}<br />
              <span style={{ color: s.accent }}>{s.title[1]}</span>
            </h1>
            <p className="v3-from-left text-ink-soft mt-6 max-w-xl" style={{ fontSize: "clamp(1.05rem,1.4vw,1.3rem)", lineHeight: 1.55 }}>
              {s.sub}
            </p>
            <div className="v3-from-left flex flex-wrap gap-4 mt-9">
              <a href={s.href1} className="group inline-flex items-center gap-2 text-white font-semibold px-7 py-4 rounded-full v3-lift"
                style={{ background: `linear-gradient(120deg, ${s.accent}, ${s.accent2})`, boxShadow: `0 16px 34px -12px ${s.accent}99` }}>
                {s.cta1}
                <Icon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={s.href2} className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full bg-white text-ink v3-lift"
                style={{ boxShadow: "0 10px 30px -14px rgba(17,17,24,.4)", border: "1px solid #ececf2" }}>
                {s.cta2}
              </a>
            </div>
          </div>
          {/* ART */}
          <div key={"art" + i} className={`v3-is-active ${s.anim}`}>
            <div className="v3-from-right">
              <HeroArt slide={s} rot={rot} />
            </div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="absolute z-20 left-0 right-0 bottom-8 px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1280px] flex items-center justify-between">
          <div className="font-display font-bold text-ink/80 tabular-nums" style={{ fontSize: "1.05rem" }}>
            <span style={{ color: s.accent }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="text-ink-soft"> / {String(n).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-2.5">
            {slides.map((sl, k) => (
              <button key={k} onClick={() => at(k)} aria-label={`Slide ${k + 1}`}
                className="relative overflow-hidden rounded-full"
                style={{
                  height: 8,
                  width: k === i ? 56 : 8,
                  background: k <= i ? sl.accent : sl.accent + "44",
                  transition: "width .4s cubic-bezier(.16,1,.3,1)",
                }}>
                {k === i && !paused && k !== retractIdx && (
                  <span key={"fill" + i} className="absolute inset-0 rounded-full origin-left"
                    style={{ background: sl.accent, animation: `v3ProgressFill ${fillMs}ms linear forwards` }} />
                )}
                {k === retractIdx && (
                  <span key={"ret" + retractIdx} className="absolute inset-0 rounded-full origin-left"
                    style={{ background: sl.accent, animation: `v3ProgressRetract ${RETRACT_MS}ms cubic-bezier(.4,0,1,1) forwards` }} />
                )}
              </button>
            ))}
          </div>
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
const DIFERENCIAIS = [
  { t: "Feito à mão", d: "Acabamento cuidado, peça por peça", icon: "hand", c1: "#E84525", c2: "#F5801A" },
  { t: "100% personalizável", d: "Sua foto, seu nome, sua ideia", icon: "spark", c1: "#F5C200", c2: "#F5801A" },
  { t: "Preview antes de produzir", d: "Você aprova a arte antes de imprimir", icon: "eye", c1: "#1A7ACA", c2: "#00A88A" },
  { t: "Enviamos para todo o Brasil", d: "Embalado com carinho, chega rapidinho", icon: "truck", c1: "#68B82A", c2: "#00A88A" },
];
function Diferenciais() {
  return (
    <section className="bg-surface py-16 md:py-20 border-y border-ink-line/50">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
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
function Mundo({ data }: { data: { tag: string; title: string; desc: string; itens: string[]; ctaLabel: string; bg: string; badge: string; ink: string; body: string; cta: string; href: string } }) {
  return (
    <Reveal>
      <div className="group relative rounded-[36px] overflow-hidden v3-lift h-full"
        style={{ background: data.bg, boxShadow: "0 30px 70px -40px rgba(17,17,24,.4)", border: "1px solid #00000008" }}>
        <div className="p-9 md:p-11">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full text-white"
            style={{ background: data.badge }}>{data.tag}</span>
          <h3 className="font-display font-extrabold mt-6 leading-[1.04] tracking-tight"
            style={{ fontSize: "clamp(1.9rem,3vw,2.7rem)", color: data.ink }}>{data.title}</h3>
          <p className="mt-4 text-[1.05rem] leading-relaxed max-w-md" style={{ color: data.body }}>{data.desc}</p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {data.itens.map((it) => (
              <li key={it} className="text-sm font-medium px-3.5 py-2 rounded-full bg-white/80 text-ink/80">{it}</li>
            ))}
          </ul>
          <a href={data.href} className="mt-8 inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full text-white v3-lift"
            style={{ background: data.cta }}>
            {data.ctaLabel}
            <Icon name="arrow" className="w-5 h-5" />
          </a>
        </div>
        <div className="px-9 md:px-11 pb-9 md:pb-11">
          <div className="rounded-[26px] flex items-center justify-center bg-white/60"
            style={{ height: 240, boxShadow: "inset 0 0 0 1px #ffffff80" }}>
            <span style={{ fontSize: 72 }}>{data.tag === "Linha Bebê" ? "👶" : "🎁"}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function DoisMundos() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="text-center flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ background: "linear-gradient(90deg,#E84525,#7B2DBE)", WebkitBackgroundClip: "text", color: "transparent" }}>
            Dois mundos, um mesmo carinho
          </span>
          <h2 className="font-display font-extrabold text-ink mt-4 leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2.1rem,4vw,3.4rem)" }}>
            Escolha por onde começar
          </h2>
          <p className="text-ink-soft mt-5 text-lg max-w-2xl">Da chegada de um bebê ao presente perfeito — tudo feito sob medida, do jeitinho que você imaginou.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-7 mt-16">
          <Mundo data={{ tag: "Linha Bebê", title: "Para celebrar quem acabou de chegar", desc: "Enxoval e lembranças personalizadas com o nome, a data e o carinho de quem espera por esse momento.", itens: ["Body personalizado", "Manta + naninha", "Prendedor de chupeta", "Lembrancinhas"], ctaLabel: "Explorar Linha Bebê", bg: "linear-gradient(160deg,#FFF1E9,#FFE0E6)", badge: "linear-gradient(120deg,#E84525,#F5801A)", ink: "#7a2417", body: "#9a5a4e", cta: "linear-gradient(120deg,#E84525,#F5801A)", href: "/bebe" }} />
          <Mundo data={{ tag: "Presentes", title: "Para marcar quem você ama", desc: "Canecas, camisetas e polaroides que viram presente inesquecível. O detalhe que ninguém mais vai ter.", itens: ["Canecas", "Camisetas", "Polaroides", "Kits especiais"], ctaLabel: "Explorar Presentes", bg: "linear-gradient(160deg,#EDE4FA,#DCE9FB)", badge: "linear-gradient(120deg,#7B2DBE,#1A7ACA)", ink: "#3a1d63", body: "#6a5a86", cta: "linear-gradient(120deg,#7B2DBE,#D02060)", href: "/presentes" }} />
        </div>
      </div>
    </section>
  );
}

/* ---- Vitrine ---- */
const PRODUTOS = [
  { nome: "Body personalizado", preco: "49,90", tags: ["Mais vendido"], c1: "#E84525", c2: "#F5801A", mundo: "bebe", emoji: "👶" },
  { nome: "Kit manta + naninha", preco: "129,90", tags: ["Enxoval"], c1: "#F5801A", c2: "#F5C200", mundo: "bebe", emoji: "🧸" },
  { nome: "Prendedor de chupeta", preco: "24,90", tags: ["Com nome"], c1: "#D02060", c2: "#E84525", mundo: "bebe", emoji: "🌸" },
  { nome: "Caneca personalizada", preco: "39,90", tags: ["Cerâmica"], c1: "#00A88A", c2: "#1A7ACA", mundo: "presente", emoji: "☕" },
  { nome: "Camiseta estampada", preco: "59,90", tags: ["Algodão"], c1: "#68B82A", c2: "#F5C200", mundo: "presente", emoji: "👕" },
  { nome: "Polaroides (kit 12)", preco: "29,90", tags: ["Lembrança"], c1: "#7B2DBE", c2: "#D02060", mundo: "presente", emoji: "📷" },
];

function ProductCard({ p, idx }: { p: typeof PRODUTOS[0]; idx: number }) {
  return (
    <Reveal delay={idx % 3 * 100}>
      <div className="group rounded-[28px] bg-white overflow-hidden v3-lift h-full"
        style={{ boxShadow: "0 24px 60px -38px rgba(17,17,24,.45)", border: "1px solid #f0f0f4" }}>
        <div className="relative flex items-center justify-center" style={{ height: 280, background: `linear-gradient(160deg, ${p.c1}14, ${p.c2}1f)` }}>
          <span style={{ fontSize: 80 }}>{p.emoji}</span>
          <div className="absolute top-4 left-4 flex gap-2">
            {p.tags.map((t) => (
              <span key={t} className="text-[0.72rem] font-bold uppercase tracking-wide text-white px-3 py-1.5 rounded-full"
                style={{ background: `linear-gradient(120deg, ${p.c1}, ${p.c2})`, boxShadow: `0 6px 16px -6px ${p.c1}aa` }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: p.c1 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.c1 }} />
            {p.mundo === "bebe" ? "Linha Bebê" : "Presentes"}
          </div>
          <h3 className="font-display font-bold text-ink text-xl mt-2">{p.nome}</h3>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-xs text-ink-soft">a partir de</span>
              <div className="font-display font-extrabold text-ink text-2xl leading-none">R$ {p.preco}</div>
            </div>
            <a href={p.mundo === "bebe" ? "/bebe" : "/presentes"}
              className="inline-flex items-center gap-1.5 font-semibold text-sm text-white px-5 py-3 rounded-full transition-transform group-hover:scale-[1.04]"
              style={{ background: `linear-gradient(120deg, ${p.c1}, ${p.c2})` }}>
              Personalizar
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Vitrine() {
  const [filtro, setFiltro] = useState("todos");
  const lista = PRODUTOS.filter((p) => filtro === "todos" || p.mundo === filtro);
  const tabs: [string, string][] = [["todos", "Todos"], ["bebe", "Linha Bebê"], ["presente", "Presentes"]];
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg,#FAFAFA,#F3F1F7)" }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#E84525" }}>Mais queridos</span>
            <h2 className="font-display font-extrabold text-ink mt-4 leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem,3.6vw,3.2rem)" }}>A vitrine Vivassol</h2>
            <p className="text-ink-soft mt-5 text-lg leading-relaxed">Uma seleção do que mais sai — pronta para receber a sua cara.</p>
          </div>
          <div className="flex gap-2 p-1.5 rounded-full bg-white shrink-0" style={{ boxShadow: "0 10px 30px -18px rgba(17,17,24,.4)" }}>
            {tabs.map(([k, l]) => (
              <button key={k} onClick={() => setFiltro(k)}
                className="font-semibold text-sm px-5 py-2.5 rounded-full transition-all"
                style={filtro === k ? { background: "linear-gradient(120deg,#7B2DBE,#1A7ACA)", color: "#fff" } : { color: "rgba(17,17,24,.6)" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
          {lista.map((p, idx) => <ProductCard key={p.nome} p={p} idx={idx} />)}
        </div>
        <div className="flex justify-center mt-16">
          <a href="/presentes" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full bg-ink text-white v3-lift">
            Ver catálogo completo
            <Icon name="arrow" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- CTA Band ---- */
function CTABand() {
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="relative rounded-[40px] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center"
            style={{ background: "#111118" }}>
            <div className="absolute inset-0 opacity-90"
              style={{ background: "radial-gradient(circle at 20% 20%, #7B2DBE55, transparent 45%), radial-gradient(circle at 80% 70%, #E8452555, transparent 45%)" }} />
            <div className="relative">
              <img src={SYMBOL} className="w-16 h-16 mx-auto mb-7 v3-spin" alt="" />
              <h2 className="font-display font-extrabold text-white leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem,4vw,3.4rem)" }}>
                Tem uma ideia na cabeça?<br />
                <span style={{ background: "linear-gradient(90deg,#E84525,#F5801A,#F5C200,#68B82A,#00A88A,#1A7ACA,#7B2DBE,#D02060)", WebkitBackgroundClip: "text", color: "transparent" }}>
                  A gente faz brilhar.
                </span>
              </h2>
              <p className="text-white/70 mt-5 text-lg max-w-xl mx-auto">Envie sua arte, sua foto ou só a vontade. Criamos o preview antes de produzir — você aprova e a gente entrega.</p>
              <div className="flex flex-wrap gap-4 justify-center mt-9">
                <a href="https://wa.me/5534999999999" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-ink bg-white v3-lift">
                  <Icon name="wpp" className="w-5 h-5" /> Começar meu pedido
                </a>
                <a href="/presentes" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-white v3-lift"
                  style={{ background: "linear-gradient(120deg,#7B2DBE,#D02060)" }}>
                  Ver portfólio
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Footer V3 ---- */
function FooterV3() {
  return (
    <footer className="bg-ink text-white/70 pt-16 pb-10">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-3">
              <img src={SYMBOL} alt="Vivassol" width={40} height={40} />
              <span className="font-display font-extrabold text-white text-2xl tracking-tight">Vivassol</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">Cada detalhe brilha mais com a Vivassol. Fábrica de personalizados feita de afeto e capricho.</p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com/vivassol.com.br" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-white font-medium px-4 py-2.5 rounded-full"
                style={{ background: "linear-gradient(120deg,#D02060,#7B2DBE)" }}>
                <Icon name="insta" className="w-5 h-5" /> @vivassol.com.br
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Produtos</h4>
            <ul className="space-y-3">
              {["Linha Bebê", "Canecas", "Camisetas", "Presentes", "Polaroides"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Atendimento</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Icon name="pin" className="w-4 h-4 text-white/50" /> Monte Carmelo e Região</li>
              <li className="flex items-center gap-2"><Icon name="truck" className="w-4 h-4 text-white/50" /> Enviamos para todo o Brasil</li>
              <li className="flex items-center gap-2"><Icon name="wpp" className="w-4 h-4 text-white/50" /> Pedidos pelo WhatsApp</li>
            </ul>
          </div>
        </div>
        <div className="h-px my-10 rounded-full opacity-40"
          style={{ background: "linear-gradient(90deg,#E84525,#F5801A,#F5C200,#68B82A,#00A88A,#1A7ACA,#7B2DBE,#D02060)" }} />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <span>© 2026 Vivassol Personalizados. Feito à mão, com carinho.</span>
          <span className="font-display">Surpreenda-se e surpreenda.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- App ---- */
export function HomeV3Client() {
  const slides: Slide[] = useMemo(() =>
    SLIDES_BASE.map((s) => ({
      ...s,
      tint: lighten(s.accent, 0.82),
      tint2: lighten(s.accent2, 0.80),
    })), []);

  return (
    <>
      <Script
        src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"
        type="module"
        strategy="lazyOnload"
      />
      <style>{`
        @keyframes v3ProgressFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes v3ProgressRetract { from { transform: scaleX(1); } to { transform: scaleX(0); } }
        @keyframes v3floaty { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-22px) } }
        @keyframes v3floaty2 { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(16px) } }
        @keyframes v3spinslow { to { transform: rotate(360deg) } }
        .v3-float { animation: v3floaty 6s ease-in-out infinite; }
        .v3-float2 { animation: v3floaty2 7s ease-in-out infinite; }
        .v3-spin { animation: v3spinslow 36s linear infinite; }
        .v3-lift { transition: transform .45s cubic-bezier(.16,1,.3,1), box-shadow .45s ease; }
        .v3-lift:hover { transform: translateY(-10px); }
        .v3-reveal { opacity:0; transform: translateY(34px); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
        .v3-reveal.v3-shown { opacity:1; transform:none; }

        /* entrance anims */
        .v3-is-active.anim-rise .v3-stagger > * { opacity:0; transform: translateY(40px); }
        .v3-is-active.anim-rise.v3-stagger > * { animation: v3rise .9s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes v3rise { to { opacity:1; transform:none; } }

        .v3-from-left { opacity:0; transform: translateX(-60px); }
        .v3-from-right { opacity:0; transform: translateX(70px); }
        .v3-is-active .v3-from-left { animation: v3slideLeft .95s cubic-bezier(.16,1,.3,1) forwards; }
        .v3-is-active .v3-from-right { animation: v3slideRight 1s cubic-bezier(.16,1,.3,1) .08s forwards; }
        @keyframes v3slideLeft { to { opacity:1; transform:none; } }
        @keyframes v3slideRight { to { opacity:1; transform:none; } }

        .v3-stagger > *:nth-child(1){ animation-delay:.05s; }
        .v3-stagger > *:nth-child(2){ animation-delay:.18s; }
        .v3-stagger > *:nth-child(3){ animation-delay:.32s; }
        .v3-stagger > *:nth-child(4){ animation-delay:.46s; }
      `}</style>
      <Hero slides={slides} fillMs={5000} rot="-20deg" />
      <Diferenciais />
      <DoisMundos />
      <Vitrine />
      <CTABand />
      <FooterV3 />
    </>
  );
}
