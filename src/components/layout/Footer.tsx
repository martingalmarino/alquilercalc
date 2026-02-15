import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-slate-50">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 sm:py-12 md:flex-row md:items-start md:justify-between">
      <div className="max-w-xs">
        <p className="flex items-center gap-2 font-extrabold text-slate-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">A</span>
          Alquileres+AR
        </p>
        <p className="mt-2 text-slate-500">
          Calculadora de actualización de alquileres para Argentina. Datos oficiales de BCRA, INDEC y datos.gob.ar.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-slate-500 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
        <Link href="/calculadora" className="transition hover:text-slate-800">
          Calculadora
        </Link>
        <Link href="/indices" className="transition hover:text-slate-800">
          Índices
        </Link>
        <Link href="/metodologia" className="transition hover:text-slate-800">
          Metodología
        </Link>
        <Link href="/faq" className="transition hover:text-slate-800">
          FAQ
        </Link>
        <Link href="/guias" className="transition hover:text-slate-800">
          Guías
        </Link>
      </div>
    </div>
    <div className="border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-slate-400 sm:px-6">
        © {new Date().getFullYear()} Alquileres+AR — Proyecto de código abierto
      </div>
    </div>
  </footer>
);
