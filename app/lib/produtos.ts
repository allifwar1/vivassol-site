import type { Produto, Categoria } from "./tipos";

let _cache: Produto[] | null = null;

export async function getTodosProdutos(): Promise<Produto[]> {
  if (_cache) return _cache;
  const res = await fetch("/data/produtos.json", { cache: "no-store" });
  const json = await res.json();
  _cache = json.produtos as Produto[];
  return _cache;
}

export async function getProdutosPorCategoria(categoria: Categoria): Promise<Produto[]> {
  const todos = await getTodosProdutos();
  return todos.filter((p) => p.categoria === categoria && p.ativo);
}

export async function getProdutoPorSku(sku: string): Promise<Produto | null> {
  const todos = await getTodosProdutos();
  return todos.find((p) => p.sku === sku) ?? null;
}

export function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function desconto(preco: number, original: number): number {
  return Math.round(((original - preco) / original) * 100);
}
