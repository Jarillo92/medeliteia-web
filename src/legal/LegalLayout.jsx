import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Plantilla de las páginas legales: mismo menú y pie que la web, texto a una columna
export function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    document.title = `${title} | MedElite IA`;
    window.scrollTo(0, 0);
  }, [title]);

  // Canonical propio de cada página legal (index.html declara el de la home)
  useEffect(() => {
    const link = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }));
    link.href = `https://www.medeliteia.com${window.location.pathname.replace(/\/+$/, '')}`;
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{ background: 'radial-gradient(45% 60% at 50% 0%, rgba(47,107,255,0.14), transparent 70%)' }}
          aria-hidden="true"
        />
        <article className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" aria-hidden="true" />
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">Información legal</span>
          </div>
          <h1 className="mt-5 text-[2.25rem] leading-[1.08] sm:text-5xl font-semibold tracking-[-0.03em] text-ink">{title}</h1>
          <p className="mt-4 text-[15px] text-subtle">Última actualización: {updated}</p>
          <div className="legal mt-12">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
