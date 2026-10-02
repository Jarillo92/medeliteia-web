import { LayoutTemplate, MousePointerClick, Smartphone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'

const POINTS = [
  { icon: LayoutTemplate, title: 'Diseño a medida, sin plantillas', text: 'Una web con la imagen de tu negocio, no una más de catálogo.' },
  { icon: MousePointerClick, title: 'Pensada para que reserven', text: 'Cada sección lleva a reservar, sin rodeos.' },
  { icon: Smartphone, title: 'Rápida y cómoda en el móvil', text: 'Donde tus clientes la van a abrir casi siempre.' },
];

// Maqueta de navegador con una web real hecha por nosotros: la de MOOV Huesca
function BrowserMock() {
  return (
    <figure>
      <div className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[12px] text-subtle">moovhuesca.es</div>
        </div>
        <img
          src="/moov-web.webp"
          alt="Portada de la web de MOOV Huesca, con el botón para reservar una clase de prueba gratis"
          width="1200"
          height="750"
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-center text-[14px] text-subtle">
        Web de MOOV Huesca, diseñada y desarrollada por MedElite IA
      </figcaption>
    </figure>
  );
}

function WebSection() {
  return (
    <section id="webs" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Webs a medida"
              title="Una web que lleva a reservar,"
              accent="no solo a mirar"
              lead="Si tu web se ha quedado anticuada, la diseñamos a medida y pensada para que tus visitas reserven. Como la de MOOV Huesca, donde sus clientes reservan su clase de prueba online, en dos clics."
            />

            <Stagger className="mt-10 space-y-6">
              {POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <StaggerItem key={point.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-bright shadow-[inset_0_0_0_1px_rgba(91,140,255,0.22)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted">{point.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <BrowserMock />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default WebSection
