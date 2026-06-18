# Vivassol Site — Escopo Completo e Metas do Projeto

> Documento vivo. Atualizar conforme o projeto evolui.
> Criado em: junho/2026 | Dono: Allif

---

## 1. Visão do Produto

Um site de e-commerce **premium e original** para a Vivassol — fábrica de produtos personalizados. O design deve ser comparável ao nível Samsung/Apple: limpo, impactante, responsivo e sem qualquer cara de template. O site deve transmitir que a Vivassol é uma marca séria e diferenciada.

**Domínio:** www.vivassol.com.br _(a comprar)_

---

## 2. Os Dois Segmentos da Vivassol

A Vivassol atua em dois nichos que devem ser apresentados de forma **separada mas integrada** — um único site que comunica os dois mundos com clareza.

### Segmento 1 — Bebê
Roupas e acessórios personalizados para bebês:
- Body personalizado
- Macacão personalizado
- Camiseta infantil personalizada
- Kit manta + naninha
- Kit manta + naninha Premium
- Porta maternidade personalizada
- Prendedor de chupeta personalizado
- Body com sainha
- Outros itens personalizados para bebê

### Segmento 2 — Presentes Personalizados
Itens personalizados para presentear:
- Caneca personalizada
- Garrafinha personalizada
- Camiseta adulta personalizada
- Porta-retrato com foto
- Fotos polaroides
- Cachepô personalizado
- Caixa de bombom personalizada
- Outros itens personalizados para presente

---

## 3. Páginas e Seções do Site

### Páginas Públicas
| Página | Descrição |
|---|---|
| `/` | Home — vitrine principal com elementos 3D |
| `/bebe` | Categoria bebê com todos os produtos |
| `/presentes` | Categoria presentes com todos os produtos |
| `/produto/[slug]` | Página individual de cada produto com personalizador |
| `/busca` | Busca e filtros por produtos |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalização de compra com pagamento |
| `/pedido/[id]` | Confirmação e status do pedido |
| `/sobre` | Sobre a Vivassol — história, valores, equipe |
| `/contato` | Fale conosco / WhatsApp / Instagram |
| `/politicas` | Políticas de troca, prazo, privacidade |

### Painel Administrativo (só Allif e Karen)
| Página | Descrição |
|---|---|
| `/admin` | Login do painel |
| `/admin/dashboard` | Resumo: vendas do dia, semana, mês |
| `/admin/pedidos` | Lista e detalhe de todos os pedidos |
| `/admin/produtos` | Gerenciar produtos (criar, editar, ativar/desativar) |
| `/admin/anuncios` | Publicar/editar anúncios e banners do site |

---

## 4. Experiência Visual — Padrão de Design

- Nível de referência: **Apple Store, Samsung, Lojas renomadas** — clean, moderno, sem excessos
- Totalmente responsivo: celular é prioridade (maioria dos clientes acessa pelo celular)
- Identidade visual baseada na logo e paleta da Vivassol (colorido mas elegante)
- Animações sutis e fluidas — nada piscando ou chamativo demais
- Tipografia cuidada, espaçamento generoso, imagens de alta qualidade
- **Zero cara de template** — cada elemento deve parecer feito sob medida

---

## 5. Elementos 3D da Home (diferencial)

A página home terá elementos 3D interativos que mostram os produtos sendo personalizados em tempo real:

| Elemento | Descrição |
|---|---|
| Caneca 3D | Caneca girando, cliente vê a estampa mudar. Frase: "Sua imaginação em uma caneca" |
| Body de Bebê 3D | Body interativo mostrando personalização (nome, arte) |
| Camiseta com mockup | Pessoa faz upload de arte e vê o mockup instantâneo na camiseta |

Cada elemento 3D na home é uma "isca" — ao clicar, o cliente é levado para a página completa de personalização do produto.

---

## 6. Personalizador de Produtos (por página de produto)

Cada produto terá seu próprio personalizador interativo. Exemplos:

**Caneca:**
- Escolher cor da caneca
- Digitar texto / nome
- Enviar imagem ou escolher arte pronta
- Ver preview 3D ao vivo
- Adicionar ao carrinho com ficha de produção

**Body de bebê:**
- Escolher cor/modelo
- Digitar nome do bebê
- Escolher temática (unicórnio, futebol, etc.)
- Ver preview no produto

**Camiseta adulta:**
- Escolher tamanho e cor
- Upload de arte própria OU escolher arte do catálogo
- Ver mockup gerado automaticamente

---

## 7. Painel Admin — Funcionalidades

### Anúncios
- Criar produto novo com: nome, descrição, fotos, preço, segmento (bebê/presente), opções de personalização
- Ativar/desativar produto sem deletar
- Definir ordem de exibição
- Upload de fotos do produto

### Vendas / Dashboard
- Ver todos os pedidos recebidos pelo site
- Filtrar por status: aguardando pagamento, pago, em produção, enviado, entregue
- Ver detalhes do pedido + ficha de personalização do cliente
- Atualizar status do pedido
- Resumo financeiro: total vendido no dia/semana/mês

### Integração com Vivassol Gerencial
- Pedidos do site entram automaticamente no Gerencial (via API `criarPedidoSite`)
- Estoque e preços vêm do Gerencial (site só lê)
- Painel do site mostra vendas do site; Gerencial centraliza tudo (incluindo Shopee, ML)

---

## 8. Integrações Externas

| Sistema | Papel | Prioridade |
|---|---|---|
| Vivassol Gerencial (Apps Script) | Fonte da verdade: produtos, estoque, pedidos | Alta — desde o início |
| Mercado Pago | Gateway de pagamento principal | Alta — necessário para vender |
| WhatsApp Business | Notificações de pedido ao cliente | Média |
| Instagram (@vivassol.com.br) | Feed integrado na home / sobre | Baixa |
| Bling / Olist | ERPs para marketplaces | Futuro (quando ML/Shopee crescer) |

---

## 9. Stack Tecnológica Escolhida

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Full-stack, SEO, performance |
| 3D / Visualizador | **React Three Fiber + Drei** | 3D no React, muito maduro |
| Estilo | **Tailwind CSS** | Velocidade + controle total de design |
| Animações | **Framer Motion** | Animações fluidas e profissionais |
| Pagamento | **Mercado Pago Checkout Pro** | Mais usado no Brasil |
| Deploy | **Vercel** | Push no GitHub = publicação automática |
| Painel auth | **NextAuth.js** | Autenticação simples sem banco extra |
| Armazenamento fotos | **Cloudinary** (free tier) | Upload de imagens dos produtos |

**Por que NÃO WordPress/WooCommerce:**
WordPress limita o design ao nível de template e não suporta elementos 3D nativos. Para atingir o nível Samsung/Apple com o personalizador 3D, a stack customizada com Next.js é o único caminho.

---

## 10. Etapas de Desenvolvimento (Roadmap)

### Fase 1 — Base (Semana 1)
- [ ] Estrutura Next.js no GitHub
- [ ] Deploy no Vercel funcionando (página "em breve")
- [ ] Identidade visual base (cores, fontes, logo)
- [ ] Componentes base do design system

### Fase 2 — Vitrine (Semana 2-3)
- [ ] Integração com catálogo do Gerencial (leitura de produtos)
- [ ] Página Home com layout premium
- [ ] Elementos 3D na home (caneca, body, camiseta)
- [ ] Página de categoria (bebê / presentes)
- [ ] Página de produto com personalizador

### Fase 3 — Compra (Semana 4-5)
- [ ] Carrinho de compras
- [ ] Checkout completo
- [ ] Integração Mercado Pago
- [ ] Ação `criarPedidoSite` no Apps Script do Gerencial
- [ ] Página de confirmação de pedido

### Fase 4 — Painel Admin (Semana 6)
- [ ] Login protegido (Allif + Karen)
- [ ] Dashboard de vendas
- [ ] Gerenciamento de produtos/anúncios
- [ ] Visualização de pedidos com ficha de personalização

### Fase 5 — Polimento (Semana 7-8)
- [ ] Página Sobre, Contato, Políticas
- [ ] SEO completo
- [ ] Velocidade e performance
- [ ] Testes em celular e desktop
- [ ] Apontar domínio vivassol.com.br

### Fase 6 — Futuro
- [ ] Notificações WhatsApp
- [ ] Integração Bling/Olist (quando começar marketplaces)
- [ ] App mobile (PWA completo)
- [ ] Sistema de cupons e promoções
- [ ] Avaliações de produtos
- [ ] Programa de fidelidade

---

## 11. Regras Importantes

1. **Token da API do Gerencial NUNCA vai ao navegador** — fica só no servidor Next.js
2. **O Gerencial é o cérebro** — site só lê estoque/produtos, nunca edita direto
3. **Pedidos do site** entram no Gerencial via `criarPedidoSite` (ação atômica)
4. **Ficha de personalização** viaja junto ao pedido como JSON legível para produção
5. **Commits no GitHub a cada etapa** — Allif trabalha pelo celular via Claude Code
6. **Design primeiro** — antes de codar uma página, definir o visual

---

## 12. Configurações Manuais que Allif Precisará Fazer

_(Guias passo a passo serão escritos quando chegar a hora de cada um)_

- [ ] Criar conta na Vercel e conectar ao GitHub (para deploy automático)
- [ ] Comprar domínio vivassol.com.br e apontar para a Vercel
- [ ] Criar conta no Mercado Pago Developers e pegar as chaves
- [ ] Criar conta no Cloudinary (upload de fotos)
- [ ] Configurar variáveis de ambiente (segredos) na Vercel
- [ ] Configurar senha do painel admin

---

_Última atualização: junho/2026_
