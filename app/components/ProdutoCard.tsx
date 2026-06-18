"use client";

import Link from "next/link";
import type { Produto } from "../lib/tipos";
import { formatarPreco, desconto } from "../lib/produtos";

const PLACEHOLDER_GRADIENTS: Record<string, string> = {
  bebe: "linear-gradient(135deg, #D02060 0%, #F5801A 100%)",
  presentes: "linear-gradient(135deg, #1A7ACA 0%, #7B2DBE 100%)",
};

const ICONS: Record<string, string> = {
  body: "👶",
  kit: "🎀",
  acessorio: "✨",
  caneca: "☕",
  camiseta: "👕",
  foto: "📷",
  default: "🎁",
};

export function ProdutoCard({ produto }: { produto: Produto }) {
  const grad = PLACEHOLDER_GRADIENTS[produto.categoria] ?? PLACEHOLDER_GRADIENTS.presentes;
  const icon = ICONS[produto.subcategoria] ?? ICONS.default;
  const temDesconto = produto.preco_original && produto.preco_original > produto.preco;
  const pct = temDesconto ? desconto(produto.preco, produto.preco_original!) : 0;

  return (
    <Link
      href={`/produto/${produto.sku.toLowerCase()}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-ink-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Imagem / placeholder */}
      <div className="relative aspect-square overflow-hidden">
        {produto.imagens.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={produto.imagens[0]}
            alt={produto.titulo}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: grad }}
          >
            <span className="text-6xl">{icon}</span>
          </div>
        )}

        {temDesconto && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-coral px-2.5 py-1 text-xs font-bold text-white">
            -{pct}%
          </span>
        )}
        {produto.estoque <= 5 && produto.estoque > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-orange px-2.5 py-1 text-xs font-bold text-white">
            Últimas unidades
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
          {produto.subcategoria} · {produto.sku}
        </p>
        <h3 className="font-display text-sm font-semibold leading-snug text-ink line-clamp-2">
          {produto.titulo}
        </h3>

        <div className="mt-auto flex items-end gap-2 pt-2">
          <span className="font-display text-lg font-bold text-ink">
            {formatarPreco(produto.preco)}
          </span>
          {temDesconto && (
            <span className="mb-0.5 text-xs text-ink-soft line-through">
              {formatarPreco(produto.preco_original!)}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap gap-1">
          {produto.personalizacao.slice(0, 3).map((p) => (
            <span
              key={p}
              className="rounded-full bg-surface-soft px-2 py-0.5 text-[10px] font-medium text-ink-soft"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
