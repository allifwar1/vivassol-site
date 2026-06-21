// ============================================================
// Vivassol — integração com o Gerencial (Google Apps Script)
//
// O catálogo é lido via GET (sem token) — dados públicos.
// Pedidos são criados via POST com SITE_TOKEN (append-only,
// não dá acesso admin à planilha).
//
// Se reimplantar o Apps Script, atualize GERENCIAL_API_URL.
// ============================================================

export const GERENCIAL_API_URL =
  "https://script.google.com/macros/s/AKfycbzToP7-yPt40C_XUuqtOqZmG9pYmQIUC30D2Q2gph_4vZGqMX_6dvu7qcCi9ISyLQTt/exec";

// Token limitado: só permite criar pedidos, não acessa dados admin.
export const SITE_TOKEN = "site_v1_f8e3a2b4c6d1e9f7a3b5c2d4e6f1a8b3";

// Cores padrão por categoria (para fallback quando não tem imagem)
export const COR_CATEGORIA: Record<string, [string, string]> = {
  "Bebê":      ["#E84525", "#F5801A"],
  "Presentes": ["#7B2DBE", "#D02060"],
  "Camisetas": ["#68B82A", "#F5C200"],
  "Canecas":   ["#00A88A", "#1A7ACA"],
};

export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  unidade: string;
  descricao: string;
  imagem_url: string;
  destaque: boolean;
}

export interface ItemCarrinho {
  produto_id: string;
  produto_nome: string;
  quantidade: number;
  preco_unit: number;
}

export async function fetchCatalogo(): Promise<Produto[]> {
  try {
    const res = await fetch(`${GERENCIAL_API_URL}?acao=obterCatalogo`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.ok && Array.isArray(data.dados?.produtos)) {
      return data.dados.produtos as Produto[];
    }
  } catch {
    // ignora erros de rede (mostra fallback no componente)
  }
  return [];
}

export async function criarPedidoSite(payload: {
  itens: ItemCarrinho[];
  cliente_nome: string;
  cliente_telefone: string;
  observacoes?: string;
  personalizacao?: string;
  entrega?: string;
}): Promise<{ ok: boolean; id_venda?: string; erro?: string }> {
  try {
    const res = await fetch(GERENCIAL_API_URL, {
      method: "POST",
      // text/plain evita preflight CORS — Apps Script aceita e parseia como JSON
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        acao: "criarPedidoSite",
        site_token: SITE_TOKEN,
        payload,
      }),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, erro: String(e) };
  }
}

// Formata preço: 49.9 → "49,90"
export function formatPreco(preco: number): string {
  return preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Monta link do WhatsApp com mensagem pré-formatada para um produto
export function wppLinkProduto(produto: Produto): string {
  const msg = encodeURIComponent(
    `Olá! Quero fazer um pedido:\n\n*${produto.nome}*\nR$ ${formatPreco(produto.preco)}\n\nPoderia me ajudar com a personalização?`
  );
  return `https://wa.me/5534999999999?text=${msg}`;
}

// Monta link do WhatsApp para um carrinho completo
export function wppLinkCarrinho(itens: ItemCarrinho[], clienteNome?: string): string {
  const lista = itens.map(i => `• ${i.produto_nome} x${i.quantidade} — R$ ${formatPreco(i.preco_unit * i.quantidade)}`).join("\n");
  const total = itens.reduce((s, i) => s + i.preco_unit * i.quantidade, 0);
  const msg = encodeURIComponent(
    `Olá! Quero fazer um pedido${clienteNome ? ` (${clienteNome})` : ""}:\n\n${lista}\n\n*Total: R$ ${formatPreco(total)}*\n\nComo prosseguimos?`
  );
  return `https://wa.me/5534999999999?text=${msg}`;
}
