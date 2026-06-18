"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../Reveal";
import { ProdutoCard } from "../ProdutoCard";
import { Button } from "../Button";
import type { Produto } from "../../lib/tipos";

export function ProdutosDestaque() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoria, setCategoria] = useState<"todos" | "bebe" | "presentes">("todos");

  useEffect(() => {
    fetch("/data/produtos.json")
      .then((r) => r.json())
      .then((d) => setProdutos(d.produtos));
  }, []);

  const filtrados = produtos.filter(
    (p) => p.ativo && (categoria === "todos" || p.categoria === categoria)
  );

  return (
    <section className="container-vs py-20">
      <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Produtos
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Feitos pra você
          </h2>
        </div>

        <div className="flex rounded-2xl border border-ink-line bg-surface-soft p-1">
          {(["todos", "bebe", "presentes"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                categoria === c
                  ? "bg-white text-ink shadow-soft"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {c === "todos" ? "Todos" : c === "bebe" ? "Bebê" : "Presentes"}
            </button>
          ))}
        </div>
      </Reveal>

      {filtrados.length === 0 ? (
        <div className="mt-12 py-16 text-center text-ink-soft">
          Carregando produtos...
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtrados.map((p, i) => (
            <Reveal key={p.sku} delay={i * 0.05}>
              <ProdutoCard produto={p} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center gap-3">
        <Button href="/bebe" variant="ghost">Ver linha bebê</Button>
        <Button href="/presentes" variant="ghost">Ver presentes</Button>
      </div>
    </section>
  );
}
