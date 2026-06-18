import { Button } from "./components/Button";
import { Reveal } from "./components/Reveal";
import { Hero } from "./components/home/Hero";
import { SegmentsSection } from "./components/home/SegmentsSection";
import { Studio3DTeaser } from "./components/home/Studio3DTeaser";
import { FeatureStrip } from "./components/home/FeatureStrip";
import { ProdutosDestaque } from "./components/home/ProdutosDestaque";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <SegmentsSection />
      <ProdutosDestaque />
      <Studio3DTeaser />

      <section className="container-vs py-24">
        <Reveal className="relative overflow-hidden rounded-4xl bg-surface-dark px-8 py-16 text-center text-white sm:px-16 sm:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, rgba(123,45,190,0.6), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-5xl">
              Tem uma ideia na cabeça?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              A gente transforma em algo real, feito à mão, do jeitinho que você
              imaginou. Comece a personalizar agora.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/presentes" variant="dark">
                Criar meu presente
              </Button>
              <Button href="/bebe" variant="ghost" className="!border-white/30 !text-white hover:!bg-white/10">
                Ver linha bebê
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
