"use client";

import { useEffect, useState } from "react";
import type { Produto } from "../lib/tipos";
import { formatarPreco } from "../lib/produtos";
import Link from "next/link";

const SENHA = "vivassol2026";

const CAT_LABEL: Record<string, string> = {
  bebe: "Bebê",
  presentes: "Presentes",
};

const STATUS_STYLE: Record<string, string> = {
  ativo: "bg-green-100 text-green-700",
  inativo: "bg-red-100 text-red-600",
};

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [filtroCateg, setFiltroCateg] = useState("todos");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "1") {
      setAutenticado(true);
    }
  }, []);

  useEffect(() => {
    if (!autenticado) return;
    fetch("/data/produtos.json")
      .then((r) => r.json())
      .then((d) => setProdutos(d.produtos));
  }, [autenticado]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (senha === SENHA) {
      sessionStorage.setItem("admin_auth", "1");
      setAutenticado(true);
    } else {
      setErro("Senha incorreta.");
    }
  }

  if (!autenticado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-dark p-6">
        <div className="w-full max-w-sm rounded-4xl border border-white/10 bg-white/[0.04] p-10">
          <div className="rule-rainbow mb-6 !h-1 !w-20" />
          <h1 className="font-display text-2xl font-bold text-white">Painel Vivassol</h1>
          <p className="mt-1 text-sm text-white/50">Acesso restrito</p>
          <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white placeholder-white/30 focus:border-brand-violet focus:outline-none"
            />
            {erro && <p className="text-sm text-brand-coral">{erro}</p>}
            <button
              type="submit"
              className="rounded-2xl bg-white py-3 font-semibold text-ink transition-opacity hover:opacity-90"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filtrados = produtos.filter((p) => {
    const matchBusca =
      busca === "" ||
      p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      p.sku.toLowerCase().includes(busca.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()));
    const matchCateg = filtroCateg === "todos" || p.categoria === filtroCateg;
    return matchBusca && matchCateg;
  });

  const ativos = produtos.filter((p) => p.ativo).length;

  return (
    <div className="min-h-screen bg-surface-dark text-white">
      {/* Header admin */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container-vs flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rule-rainbow h-6 !w-1 rounded-full" />
            <span className="font-display text-lg font-bold">Painel Vivassol</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/50 hover:text-white" target="_blank">
              Ver site →
            </Link>
            <button
              type="button"
              onClick={() => { sessionStorage.removeItem("admin_auth"); setAutenticado(false); }}
              className="text-sm text-white/50 hover:text-white"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container-vs py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total de anúncios" value={String(produtos.length)} />
          <StatCard label="Ativos" value={String(ativos)} cor="text-green-400" />
          <StatCard label="Inativos" value={String(produtos.length - ativos)} cor="text-red-400" />
          <StatCard label="Categorias" value="2" />
        </div>

        {/* Título + ações */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl font-bold">Anúncios</h2>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/60">
            Para adicionar um produto, fale com o Claude Code
          </span>
        </div>

        {/* Filtros */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            placeholder="Buscar por SKU, título ou tag..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand-violet focus:outline-none"
          />
          <div className="flex gap-2">
            {["todos", "bebe", "presentes"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFiltroCateg(c)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  filtroCateg === c
                    ? "bg-white text-ink"
                    : "border border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {c === "todos" ? "Todos" : c === "bebe" ? "Bebê" : "Presentes"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela desktop */}
        <div className="mt-6 hidden overflow-hidden rounded-3xl border border-white/10 md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-4 text-left">SKU</th>
                <th className="px-5 py-4 text-left">Título</th>
                <th className="px-5 py-4 text-left">Categoria</th>
                <th className="px-5 py-4 text-left">Preço</th>
                <th className="px-5 py-4 text-left">Estoque</th>
                <th className="px-5 py-4 text-left">Personalização</th>
                <th className="px-5 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p, i) => (
                <tr
                  key={p.sku}
                  className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                    i % 2 === 0 ? "" : "bg-white/[0.015]"
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-xs text-white/60">{p.sku}</td>
                  <td className="px-5 py-4 font-medium text-white">{p.titulo}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/70">
                      {CAT_LABEL[p.categoria]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white">
                    <span className="font-semibold">{formatarPreco(p.preco)}</span>
                    {p.preco_original && (
                      <span className="ml-2 text-xs text-white/40 line-through">
                        {formatarPreco(p.preco_original)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-white/70">{p.estoque}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.personalizacao.map((pp) => (
                        <span key={pp} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                          {pp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[p.ativo ? "ativo" : "inativo"]}`}>
                      {p.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtrados.length === 0 && (
            <div className="py-16 text-center text-white/40">
              Nenhum produto encontrado.
            </div>
          )}
        </div>

        {/* Cards mobile */}
        <div className="mt-6 flex flex-col gap-4 md:hidden">
          {filtrados.map((p) => (
            <div key={p.sku} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-white/40">{p.sku}</p>
                  <h3 className="mt-1 font-semibold text-white">{p.titulo}</h3>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[p.ativo ? "ativo" : "inativo"]}`}>
                  {p.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/60">
                <span>{CAT_LABEL[p.categoria]}</span>
                <span>·</span>
                <span className="font-semibold text-white">{formatarPreco(p.preco)}</span>
                <span>·</span>
                <span>Estoque: {p.estoque}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.personalizacao.map((pp) => (
                  <span key={pp} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                    {pp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/30">
          {filtrados.length} de {produtos.length} produtos · Dados de{" "}
          <span className="font-mono">/data/produtos.json</span>
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, cor = "text-white" }: { label: string; value: string; cor?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs text-white/40">{label}</p>
      <p className={`mt-1 font-display text-3xl font-bold ${cor}`}>{value}</p>
    </div>
  );
}
