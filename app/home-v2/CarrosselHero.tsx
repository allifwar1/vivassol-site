"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const SlideScene = dynamic(
  () => import("./SlideScene").then((m) => ({ default: m.SlideScene })),
  { ssr: false }
);

const SLIDES = [
  {
    index: 0,
    eyebrow: "Linha Bebê",
    titulo: "Dê vida ao que\nvocê imagina",
    sub: "Bodys, mantas e kits com o nome do seu bebê — cada peça, única.",
    cta: "Ver linha bebê",
    href: "/bebe",
    gradFrom: "#1a0010",
    gradTo: "#4a0030",
    accent: "#D02060",
    accentLight: "#ff6ba8",
    dot: "#D02060",
  },
  {
    index: 1,
    eyebrow: "Canecas",
    titulo: "Sua caneca,\ndo seu jeito",
    sub: "Foto, texto ou arte — impressão de alta qualidade que dura pra sempre.",
    cta: "Personalizar caneca",
    href: "/produto/vs-can-001",
    gradFrom: "#1a0a00",
    gradTo: "#3d1a00",
    accent: "#F5801A",
    accentLight: "#ffc06b",
    dot: "#F5801A",
  },
  {
    index: 2,
    eyebrow: "Camisetas",
    titulo: "Vista\nsua história",
    sub: "Envie sua arte, escolha o tamanho. Veja o mockup antes de comprar.",
    cta: "Criar camiseta",
    href: "/produto/vs-cam-001",
    gradFrom: "#001020",
    gradTo: "#002a40",
    accent: "#1A7ACA",
    accentLight: "#6dc0ff",
    dot: "#1A7ACA",
  },
  {
    index: 3,
    eyebrow: "Presentes",
    titulo: "O presente\nperfeito existe",
    sub: "Polaroides, porta-retratos, caixas — transformados em memória que fica.",
    cta: "Explorar presentes",
    href: "/presentes",
    gradFrom: "#0d001a",
    gradTo: "#28004a",
    accent: "#7B2DBE",
    accentLight: "#c07bff",
    dot: "#7B2DBE",
  },
  {
    index: 4,
    eyebrow: "Vivassol",
    titulo: "Cada detalhe\nbrilha mais",
    sub: "Fábrica de personalizados feita com cuidado, criatividade e amor.",
    cta: "Conheça a Vivassol",
    href: "/sobre",
    gradFrom: "#180000",
    gradTo: "#3a0010",
    accent: "#E84525",
    accentLight: "#ff8a6b",
    dot: "#E84525",
  },
];

/* Efeito parallax de texto em cada slide (diferente por índice) */
const TEXT_VARIANTS = [
  // slide 0 — sobe
  {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
  },
  // slide 1 — desliza da esquerda
  {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: 80, transition: { duration: 0.4 } },
  },
  // slide 2 — escala
  {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 1.1, transition: { duration: 0.4 } },
  },
  // slide 3 — rotação leve
  {
    hidden: { opacity: 0, rotate: -4, y: 30 },
    visible: { opacity: 1, rotate: 0, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, rotate: 4, transition: { duration: 0.4 } },
  },
  // slide 4 — desfoque
  {
    hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: "blur(8px)", transition: { duration: 0.4 } },
  },
];

export default function CarrosselHero() {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[active];

  const handleMouse = useCallback((e: MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setMouse({
      x: (e.clientX / w - 0.5) * 2,
      y: (e.clientY / h - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  const goTo = useCallback((i: number) => {
    setActive(i);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000);
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((active + 1) % SLIDES.length);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#0d0d18" }}
    >
      {/* Background com gradiente animado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 60% 40%, ${slide.gradTo}, ${slide.gradFrom} 70%, #080810 100%)`,
          }}
        />
      </AnimatePresence>

      {/* Linha arco-íris no topo */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-rainbow z-20" />

      {/* Grid de layout: texto esquerda / 3D direita */}
      <div className="relative z-10 flex h-full items-center">
        {/* Coluna de texto */}
        <div className="flex-1 px-8 sm:px-16 lg:px-24 xl:px-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              variants={TEXT_VARIANTS[active]}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-xl"
            >
              <motion.span
                className="inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ borderColor: `${slide.accent}60`, color: slide.accentLight }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {slide.eyebrow}
              </motion.span>

              <motion.h1
                className="mt-5 font-display font-extrabold leading-[1.0] tracking-tight text-white"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", whiteSpace: "pre-line" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.titulo}
              </motion.h1>

              <motion.p
                className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg"
                style={{ maxWidth: "38ch" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slide.sub}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={slide.href}
                  className="rounded-full px-7 py-3 text-sm font-bold text-ink transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: slide.accent, boxShadow: `0 0 32px ${slide.accent}55` }}
                >
                  {slide.cta}
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:border-white/40 hover:text-white"
                >
                  ← Home
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Coluna 3D */}
        <div
          className="hidden md:block"
          style={{ width: "48%", height: "80%", flexShrink: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`scene-${active}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              style={{ width: "100%", height: "100%" }}
            >
              <SlideScene index={active} mx={mouse.x} my={mouse.y} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Setas de navegação */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition-all hover:border-white/50 hover:bg-black/50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition-all hover:border-white/50 hover:bg-black/50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Dots de navegação */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-2 overflow-hidden rounded-full transition-all duration-500"
            style={{ width: active === i ? 32 : 8, background: active === i ? s.dot : "rgba(255,255,255,0.25)" }}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="absolute bottom-10 right-8 z-20 font-display text-sm font-semibold text-white/40">
        <span style={{ color: slide.accentLight }}>{String(active + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Degrade para baixo */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-surface-dark pointer-events-none z-10" />
    </div>
  );
}
