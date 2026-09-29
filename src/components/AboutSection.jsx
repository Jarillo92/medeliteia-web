import { Reveal } from './ui/Reveal'

// Quién está detrás: la foto es de cuerpo entero y se recorta a busto con object-position
// (el recorte deja fuera la esquina inferior derecha de la imagen original)
function AboutSection() {
  return (
    <section id="sobre-mi" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="panel relative mx-auto max-w-5xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(50% 80% at 15% 50%, rgba(47,107,255,0.10), transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 sm:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr] lg:gap-12">
            <div className="mx-auto w-44 overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] sm:w-full">
              <img
                src="/rafa.jpeg"
                alt="Rafa, fundador de MedElite IA"
                width="672"
                height="1536"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: '50% 37%' }}
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" aria-hidden="true" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">Quién está detrás</span>
              </div>
              <p className="mt-5 text-[1.35rem] leading-snug sm:text-[1.6rem] font-semibold tracking-[-0.02em] text-ink">
                Soy Rafa, fundador de MedElite IA. Configuro y mantengo personalmente cada asistente, así que hablas siempre con la misma persona, que conoce tu negocio.
              </p>
              <p className="mt-4 text-[15px] text-subtle">Rafa · Fundador de MedElite IA</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default AboutSection
