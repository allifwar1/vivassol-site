import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-surface-dark text-white">
      <div className="rule-rainbow !h-1" />
      <div className="container-vs grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Cada detalhe brilha mais com a Vivassol. Personalizados feitos à mão,
            com carinho, para bebês e presentes inesquecíveis.
          </p>
        </div>

        <FooterCol
          title="Comprar"
          links={[
            { href: "/bebe", label: "Linha Bebê" },
            { href: "/presentes", label: "Presentes" },
            { href: "/busca", label: "Buscar tudo" },
          ]}
        />
        <FooterCol
          title="A Vivassol"
          links={[
            { href: "/sobre", label: "Nossa história" },
            { href: "/contato", label: "Fale conosco" },
            { href: "/politicas", label: "Trocas e prazos" },
          ]}
        />
        <FooterCol
          title="Conecte-se"
          links={[
            { href: "https://instagram.com/vivassol.com.br", label: "Instagram" },
            { href: "/contato", label: "WhatsApp" },
          ]}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="container-vs flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Vivassol Personalizados. Todos os direitos reservados.</span>
          <span>Feito com carinho no Brasil.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
