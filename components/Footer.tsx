import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] py-12">
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h4 className="text-lg font-serif tracking-[0.12em] uppercase">
            Carter
          </h4>
          <p className="mt-2 text-sm text-slate-300">
            Curadoria manauara com seleção precisa.
          </p>
        </div>

        {/* Compras */}
        <div>
          <h5 className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Compras
          </h5>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              Pagamentos processados por{" "}
              <a
                href="https://shopay.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] underline underline-offset-4"
              >
                Shopay
              </a>
              {" - "}
              <a
                href="https://canvi.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] underline underline-offset-4"
              >
                Canvi
              </a>
            </li>
          </ul>
        </div>

        {/* Sobre */}
        <div>
          <h5 className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Sobre
          </h5>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link
                href="/sobre"
                className="block hover:text-[var(--accent)]"
                aria-label="Sobre a Carter"
              >
                Carter
              </Link>
            </li>
            <li>
              <Link
                href="/transparencia"
                className="block hover:text-[var(--accent)]"
                aria-label="Página de transparência"
              >
                Transparência
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h5 className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Contato
          </h5>
          <p className="mt-3 text-sm text-slate-300">WhatsApp Carter</p>
          <p className="text-sm text-slate-300">suporte@carter.com</p>

          {/* Logos */}
          <div className="mt-4 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-muted)] ring-1 ring-white/10 shadow-md sm:h-20 sm:w-20">
              <Image
                src="/images/logocarter.png"
                alt="Carter"
                width={68}
                height={68}
                className="object-contain"
              />
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-muted)] ring-1 ring-white/10 shadow-md sm:h-20 sm:w-20">
              <Image
                src="/images/logoshopay.png"
                alt="Shopay"
                width={68}
                height={68}
                className="object-contain"
              />
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-muted)] ring-1 ring-white/10 shadow-md sm:h-20 sm:w-20">
              <Image
                src="/images/logocanvi.svg"
                alt="Canvi"
                width={68}
                height={68}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="container pt-10 text-xs uppercase tracking-[0.2em] text-slate-400">
        <Link href="/admin/login" className="hover:text-[var(--accent)]">
          Copyright
        </Link>{" "}
        {new Date().getFullYear()} Carter — Pagamentos processados por{" "}
        <a
          href="https://painel.shopay.com.br/vitrine-shopay?c=264f9420-9536-4c3d-b406-5cf10895c37e"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] underline underline-offset-4"
        >
          Shopay
        </a>
        {" - "}
        <a
          href="https://canvi.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] underline underline-offset-4"
        >
          Canvi
        </a>
        {" — "}
        Todos os direitos reservados. Desenvolvido por{" "}
        <a
          href="https://devrenatovieira.cartergroup.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)] underline underline-offset-4"
        >
          Renato Vieira
        </a>
      </div>
    </footer>
  );
}
