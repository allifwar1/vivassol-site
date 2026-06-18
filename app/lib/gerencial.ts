/**
 * Cliente da API do Vivassol Gerencial (Google Apps Script).
 *
 * REGRA DE OURO (ver docs/INTEGRACAO-SITE.md no repo VivassolGerencial):
 * - O Gerencial é a fonte da verdade de produtos e estoque. O site só LÊ.
 * - O token é secreto e vive SÓ no servidor — nunca no navegador.
 *   Por isso este arquivo só pode ser importado em código server-side
 *   (rotas /api, Server Components, Server Actions).
 *
 * Esqueleto preparado para a Fase 2 (catálogo) e Fase 3 (criarPedidoSite).
 */

const API_URL = process.env.GERENCIAL_API_URL;
const API_TOKEN = process.env.GERENCIAL_API_TOKEN;

type AcaoGerencial =
  | "ping"
  | "obterTudo"
  | "obterCatalogo" // ação enxuta a criar no Code.gs (Fase 2)
  | "criarPedidoSite"; // ação atômica a criar no Code.gs (Fase 3)

type RespostaGerencial<T> =
  | { ok: true; dados: T }
  | { ok: false; erro: string };

/**
 * Faz uma chamada POST autenticada à API do Gerencial.
 * Lança erro se as variáveis de ambiente não estiverem configuradas.
 */
export async function chamarGerencial<T = unknown>(
  acao: AcaoGerencial,
  payload: Record<string, unknown> = {}
): Promise<RespostaGerencial<T>> {
  if (!API_URL || !API_TOKEN) {
    throw new Error(
      "GERENCIAL_API_URL e GERENCIAL_API_TOKEN precisam estar configurados no ambiente."
    );
  }

  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: API_TOKEN, acao, payload }),
    // catálogo pode ser cacheado; pedido nunca. Ajustamos por chamada na Fase 2/3.
    cache: "no-store",
  });

  if (!resposta.ok) {
    return { ok: false, erro: `Erro HTTP ${resposta.status}` };
  }

  return (await resposta.json()) as RespostaGerencial<T>;
}

/** Testa a conexão com o Gerencial. */
export async function pingGerencial() {
  return chamarGerencial("ping");
}
