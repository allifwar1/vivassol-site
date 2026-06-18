# Vivassol Site 🌈

E-commerce premium da **Vivassol Personalizados** — produtos personalizados para
bebês e presentes únicos.

> 🧠 O **Vivassol Gerencial** é a fonte da verdade de produtos e estoque.
> Este site é um canal de venda: lê o catálogo e envia pedidos de volta.
> Ver `docs/INTEGRACAO-SITE.md` no repositório do Gerencial.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — design system com as cores da marca
- **Framer Motion** — animações fluidas
- **React Three Fiber** — visualizador 3D (Fase 2)

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha os valores
npm run dev                  # abre em http://localhost:3000
```

## Documentação do projeto

- `docs/ESCOPO-E-METAS.md` — escopo completo, roadmap e metas.

## Estrutura

```
app/
  components/        componentes de UI (Navbar, Footer, Logo, Button…)
    home/            seções da home (Hero, Segments, Studio3D…)
  lib/               integrações (gerencial.ts = API do Gerencial)
  page.tsx           home
  [rota]/page.tsx    demais páginas
public/
  favicon.ico
  icons/             ícones e manifest
docs/                escopo e documentação
```

## Status

Fase 1 (base + design system + home) — em andamento.
Ver roadmap completo em `docs/ESCOPO-E-METAS.md`.
