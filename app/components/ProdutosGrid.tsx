"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCatalogo, wppLinkProduto, formatPreco, COR_CATEGORIA, type Produto } from "../lib/api";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Produto fallback quando a planilha não responde
const FALLBACK: Produto[] = [
  { id: "f1", nome: "Body Personalizado Bebê", categoria: "Bebê",       preco: 49.90, unidade: "un", descricao: "Body 100% algodão com nome e tema personalizado.", imagem_url: `${BASE}/images/produtos/p-body.png`,    destaque: true },
  { id: "f2", nome: "Kit Manta + Naninha",     categoria: "Bebê",       preco: 129.90, unidade: "un", descricao: "Manta e naninha bordadas com o nome do bebê.",   imagem_url: `${BASE}/images/produtos/p-kit.png`,     destaque: true },
  { id: "f3", nome: "Prendedor de Chupeta",    categoria: "Bebê",       preco: 34.90, unidade: "un", descricao: "Artesanal com nome do bebê em miçangas.",         imagem_url: `${BASE}/images/produtos/p-chupeta.png`, destaque: false },
  { id: "f4", nome: "Caneca Personalizada",    categoria: "Presentes",  preco: 44.90, unidade: "un", descricao: "Caneca de cerâmica com arte, nome ou foto.",       imagem_url: `${BASE}/images/produtos/p-caneca.png`,  destaque: true },
  { id: "f5", nome: "Camiseta Estampada",      categoria: "Camisetas",  preco: 59.90, unidade: "un", descricao: "Camiseta 100% algodão com estampa personalizada.", imagem_url: `${BASE}/images/produtos/p-camiseta.png`,destaque: false },
  { id: "f6", nome: "Polaroides (kit 12)",     categoria: "Presentes",  preco: 29.90, unidade: "un", descricao: "Fotos estilo polaroide. Kit com 12 unidades.",      imagem_url: `${BASE}/images/produtos/p-polaroide.png`,destaque: false },
];

interface ProdutosGridProps {
  /** Filtra por categoria. Se omitido, mostra todos. */
  categoria?: string;
  /** Mostra só os marcados como destaque. */
  apenasDestaques?: boolean;
  /** Quantos produtos exibir no máximo. */
  limite?: number;
  /** Título da seção. */
  titulo?: string;
  /** Subtítulo (tag acima do título). */
  tag?: string;
  tagColor?: string;
}

export function ProdutosGrid({
  categoria,
  apenasDestaques = false,
  limite,
  titulo = "Os favoritos da Vivassol",
  tag = "Mais amados",
  tagColor = "#7B2DBE",
}: ProdutosGridProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogo()
      .then((todos) => {
        let lista = todos.length > 0 ? todos : FALLBACK;
        if (categoria) lista = lista.filter((p) => p.categoria === categoria);
        if (apenasDestaques) lista = lista.filter((p) => p.destaque);
        if (limite) lista = lista.slice(0, limite);
        setProdutos(lista);
      })
      .finally(() => setLoading(false));
  }, [categoria, apenasDestaques, limite]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[28px] bg-white overflow-hidden animate-pulse"
            style={{ boxShadow: "0 24px 60px -38px rgba(17,17,24,.25)", border: "1px solid #f0f0f4" }}>
            <div className="h-48 bg-gray-100" />
            <div className="p-6 space-y-3">
              <div className="h-5 bg-gray-100 rounded-full w-3/4" />
              <div className="h-4 bg-gray-100 rounded-full w-full" />
              <div className="h-4 bg-gray-100 rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!produtos.length) {
    return (
      <div className="text-center py-16 text-ink-soft">
        <p>Nenhum produto encontrado. Fale conosco pelo WhatsApp!</p>
        <a href="https://wa.me/5534999999999" target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-white px-6 py-3 rounded-full"
          style={{ background: "linear-gradient(120deg,#E84525,#D02060)" }}>
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {produtos.map((p) => (
        <ProdutoCard key={p.id} produto={p} />
      ))}
    </div>
  );
}

export function ProdutoCard({ produto: p }: { produto: Produto }) {
  const [imgError, setImgError] = useState(false);
  const cores = COR_CATEGORIA[p.categoria] ?? ["#7B2DBE", "#D02060"];
  const [c1, c2] = cores;

  return (
    <div
      className="rounded-[28px] bg-white overflow-hidden transition-transform hover:-translate-y-2 duration-300 flex flex-col h-full"
      style={{ boxShadow: "0 24px 60px -38px rgba(17,17,24,.45)", border: "1px solid #f0f0f4" }}
    >
      {/* Imagem do produto */}
      <div className="h-48 w-full overflow-hidden relative" style={{ background: `linear-gradient(160deg, ${c1}22, ${c2}33)` }}>
        {p.imagem_url && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={p.imagem_url}
            alt={p.nome}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${c1}18, ${c2}28)` }} />
        )}
        {p.destaque && (
          <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full"
            style={{ background: `linear-gradient(120deg, ${c1}, ${c2})` }}>
            Destaque
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c1 }}>{p.categoria}</span>
        <h3 className="font-display font-bold text-ink text-xl mt-1 leading-tight">{p.nome}</h3>
        {p.descricao && (
          <p className="text-ink-soft text-sm mt-2 leading-relaxed flex-1 line-clamp-2">{p.descricao}</p>
        )}

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-xs text-ink-soft">a partir de</span>
            <div className="font-display font-extrabold text-ink text-2xl leading-none">
              R$ {formatPreco(p.preco)}
            </div>
          </div>
          <a
            href={wppLinkProduto(p)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-white px-5 py-3 rounded-full transition-opacity hover:opacity-90"
            style={{ background: `linear-gradient(120deg, ${c1}, ${c2})` }}
          >
            <WppIcon />
            Pedir
          </a>
        </div>
      </div>
    </div>
  );
}

// Seção completa com título — para usar nas páginas internas
export function ProdutosSection({
  categoria,
  apenasDestaques,
  limite,
  titulo,
  tag,
  tagColor,
}: ProdutosGridProps) {
  return (
    <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg,#FAFAFA,#F3F1F7)" }}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: tagColor ?? "#7B2DBE" }}>
            {tag ?? "Mais amados"}
          </span>
          <h2 className="font-display font-extrabold text-ink mt-4 leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2rem,3.6vw,3.2rem)" }}>
            {titulo ?? "Os favoritos da Vivassol"}
          </h2>
        </div>
        <ProdutosGrid
          categoria={categoria}
          apenasDestaques={apenasDestaques}
          limite={limite}
          titulo={titulo}
          tag={tag}
          tagColor={tagColor}
        />
      </div>
    </section>
  );
}

function WppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
