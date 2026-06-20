/* Banco de artes Vivassol — organizado por categoria.
   Cada arte: { id, name, cat, svg }  (svg = markup interno, viewBox 0 0 120 120)
   Exposto em window para o configurador. */
(function () {
  const H = '#E84525', O = '#F5801A', Y = '#F5C200', G = '#68B82A',
        T = '#00A88A', B = '#1A7ACA', V = '#7B2DBE', M = '#D02060', INK = '#2A2A33';

  const heart = (c) => `<path d="M60 101C20 74 22 39 45 39c9 0 15 7 15 12 0-5 6-12 15-12 23 0 25 35-15 62z" fill="${c}"/>`;

  const ARTS = [
    // ---- Amor ----
    { id:'heart', name:'Coração', cat:'Amor', svg: heart(H) },
    { id:'two-hearts', name:'Casal', cat:'Amor', svg:
      `<g>${heart(M).replace('60 101','46 96').replace('M46 96C20','M46 96C8')}</g>
       <g transform="translate(26,8) scale(.78)">${heart(H)}</g>` },
    { id:'love-word', name:'Love', cat:'Amor', svg:
      `<text x="60" y="58" font-family="Sora,sans-serif" font-weight="800" font-size="34" fill="${M}" text-anchor="middle">love</text>
       <g transform="translate(40,58) scale(.34)">${heart(H)}</g>` },

    // ---- Bebê ----
    { id:'bear', name:'Ursinho', cat:'Bebê', svg:
      `<circle cx="34" cy="34" r="13" fill="${O}"/><circle cx="86" cy="34" r="13" fill="${O}"/>
       <circle cx="60" cy="62" r="34" fill="${Y}"/>
       <circle cx="48" cy="56" r="4.5" fill="${INK}"/><circle cx="72" cy="56" r="4.5" fill="${INK}"/>
       <ellipse cx="60" cy="72" rx="11" ry="9" fill="#fff"/><circle cx="60" cy="70" r="4" fill="${INK}"/>
       <path d="M60 74v6" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>` },
    { id:'cloud-stars', name:'Nuvem & Estrelas', cat:'Bebê', svg:
      `<path d="M34 70a16 16 0 0 1 4-31 20 20 0 0 1 38-4 15 15 0 0 1 6 35z" fill="${B}" opacity=".85"/>
       <g fill="${Y}"><path d="M92 30l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/><path d="M22 26l2 5 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1z"/></g>` },
    { id:'baby-feet', name:'Pezinhos', cat:'Bebê', svg:
      `<g fill="${M}"><ellipse cx="42" cy="70" rx="15" ry="20"/><circle cx="30" cy="50" r="4"/><circle cx="38" cy="46" r="4.5"/><circle cx="47" cy="46" r="4.5"/><circle cx="55" cy="50" r="4"/></g>
       <g fill="${T}" transform="translate(36,4)"><ellipse cx="42" cy="70" rx="15" ry="20"/><circle cx="30" cy="50" r="4"/><circle cx="38" cy="46" r="4.5"/><circle cx="47" cy="46" r="4.5"/><circle cx="55" cy="50" r="4"/></g>` },

    // ---- Datas ----
    { id:'mom', name:'Para Mãe', cat:'Datas', svg:
      `<text x="60" y="64" font-family="Sora,sans-serif" font-weight="800" font-size="30" fill="${M}" text-anchor="middle">mãe</text>
       <g transform="translate(48,66) scale(.3)">${heart(H)}</g>` },
    { id:'dad', name:'Para Pai', cat:'Datas', svg:
      `<path d="M30 52c8-8 18-6 30-6s22-2 30 6c-8 2-12 8-18 8-5 0-8-4-12-4s-7 4-12 4c-6 0-10-6-18-8z" fill="${INK}"/>
       <text x="60" y="86" font-family="Sora,sans-serif" font-weight="800" font-size="22" fill="${B}" text-anchor="middle">super pai</text>` },
    { id:'tree', name:'Natal', cat:'Datas', svg:
      `<path d="M60 16l20 28H40zM60 34l24 32H36zM60 52l28 36H32z" fill="${G}"/>
       <rect x="54" y="88" width="12" height="14" fill="${O}"/>
       <circle cx="60" cy="14" r="6" fill="${Y}"/>` },

    // ---- Frases ----
    { id:'coffee', name:'Café Primeiro', cat:'Frases', svg:
      `<path d="M34 40h44v22a16 16 0 0 1-16 16H50a16 16 0 0 1-16-16z" fill="${INK}"/>
       <path d="M78 46h8a8 8 0 0 1 0 16h-8" fill="none" stroke="${INK}" stroke-width="5"/>
       <path d="M44 30c0-5 6-5 6-10M56 30c0-5 6-5 6-10" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/>
       <text x="60" y="104" font-family="Sora,sans-serif" font-weight="700" font-size="13" fill="${INK}" text-anchor="middle">café primeiro</text>` },
    { id:'boss', name:'Chefe do Dia', cat:'Frases', svg:
      `<path d="M30 64l-6-30 18 14 18-22 18 22 18-14-6 30z" fill="${Y}"/>
       <rect x="30" y="64" width="60" height="8" fill="${O}"/>
       <text x="60" y="98" font-family="Sora,sans-serif" font-weight="800" font-size="16" fill="${INK}" text-anchor="middle">chefe</text>` },

    // ---- Pets ----
    { id:'paw', name:'Patinha', cat:'Pets', svg:
      `<g fill="${V}"><ellipse cx="60" cy="74" rx="22" ry="18"/><circle cx="34" cy="50" r="9"/><circle cx="50" cy="38" r="9"/><circle cx="70" cy="38" r="9"/><circle cx="86" cy="50" r="9"/></g>` },
    { id:'cat', name:'Gatinho', cat:'Pets', svg:
      `<path d="M30 36l10 18M90 36l-10 18" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
       <path d="M30 36l4 22M90 36l-4 22" fill="none"/>
       <circle cx="60" cy="66" r="30" fill="${T}"/>
       <circle cx="49" cy="62" r="4" fill="${INK}"/><circle cx="71" cy="62" r="4" fill="${INK}"/>
       <path d="M60 70l-4 5h8z" fill="${M}"/>
       <path d="M60 75v4M52 74l-12-3M68 74l12-3M52 80l-12 3M68 80l12 3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>` },

    // ---- Aniversário ----
    { id:'cake', name:'Bolo', cat:'Aniversário', svg:
      `<rect x="34" y="58" width="52" height="34" rx="6" fill="${M}"/>
       <path d="M34 70c8 6 12 0 13 0s5 6 13 0 12 6 13 0 5 6 13 0" stroke="#fff" stroke-width="4" fill="none"/>
       <rect x="57" y="40" width="6" height="16" fill="${T}"/>
       <path d="M60 30c4 4 4 8 0 10-4-2-4-6 0-10z" fill="${O}"/>` },
    { id:'balloons', name:'Balões', cat:'Aniversário', svg:
      `<ellipse cx="46" cy="44" rx="18" ry="22" fill="${H}"/><ellipse cx="76" cy="50" rx="16" ry="20" fill="${B}"/>
       <path d="M46 66c0 8 6 8 6 16M76 70c0 8-6 8-6 16" stroke="${INK}" stroke-width="2.5" fill="none"/>
       <path d="M46 66l-3 5h6zM76 70l-3 5h6z" fill="${INK}"/>` },

    // ---- Fé ----
    { id:'cross', name:'Fé', cat:'Fé', svg:
      `<g fill="${V}"><rect x="52" y="24" width="16" height="72" rx="4"/><rect x="34" y="44" width="52" height="16" rx="4"/></g>
       <g stroke="${Y}" stroke-width="3" stroke-linecap="round"><path d="M60 12v8M88 24l-6 6M32 24l6 6"/></g>` },
    { id:'faith-word', name:'Gratidão', cat:'Fé', svg:
      `<text x="60" y="64" font-family="Sora,sans-serif" font-weight="800" font-size="22" fill="${T}" text-anchor="middle">gratidão</text>
       <path d="M30 74c20 8 40 8 60 0" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>` },
  ];

  const CATS = ['Tudo', 'Amor', 'Bebê', 'Datas', 'Frases', 'Pets', 'Aniversário', 'Fé'];

  window.VIVA_ARTS = ARTS;
  window.VIVA_ART_CATS = CATS;
})();
