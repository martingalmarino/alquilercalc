import Link from "next/link";

export const Header = () => (
  <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
      <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">A</span>
        Alquileres+AR
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
        <Link href="/calculadora" className="transition hover:text-slate-900">
          Calculadora
        </Link>
        <Link href="/indices" className="transition hover:text-slate-900">
          Índices
        </Link>
        <Link href="/metodologia" className="transition hover:text-slate-900">
          Metodología
        </Link>
        <Link href="/faq" className="transition hover:text-slate-900">
          FAQ
        </Link>
      </nav>
      <Link
        href="/calculadora"
        className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-500"
      >
        Calcular ahora
      </Link>
    </div>
  </header>
);
