import { useEffect, useRef, useState } from 'react'
import { LayoutTemplate, MousePointerClick, Smartphone } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { Reveal, Stagger, StaggerItem } from './ui/Reveal'

const POINTS = [
  { icon: LayoutTemplate, title: 'Diseño a medida, sin plantillas', text: 'Una web con la imagen de tu negocio, no una más de catálogo.' },
  { icon: MousePointerClick, title: 'Pensada para que reserven', text: 'Cada sección lleva a reservar, sin rodeos.' },
  { icon: Smartphone, title: 'Rápida y cómoda en el móvil', text: 'Donde tus clientes la van a abrir casi siempre.' },
];

const MOOV_URL = 'https://moovhuesca.es';
const MEDIA = { poster: '/media/moov-poster.webp', webm: '/media/moov-web.webm', mp4: '/media/moov-web.mp4' };

// Vídeo de scroll de la web de MOOV. No se pide nada hasta acercarse a la sección; solo se
// reproduce mientras se ve. Con movimiento reducido, Save-Data o si falla, queda el póster.
function MoovPreview() {
  const box = useRef(null);
  const video = useRef(null);
  const [mount, setMount] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData;
    if (reduced || saveData || !('IntersectionObserver' in window) || !box.current) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!mount || failed || !el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play()?.catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mount, failed]);

  return (
    <div ref={box} className="relative aspect-[1280/724] w-full bg-ground">
      <img
        src={MEDIA.poster}
        alt="Página de inicio de moovhuesca.es"
        width="1280"
        height="724"
        loading="lazy"
        className="absolute inset-0 block h-full w-full"
      />
      {mount && !failed && (
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={MEDIA.poster}
          width="1280"
          height="724"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
          className="absolute inset-0 block h-full w-full"
        >
          <source src={MEDIA.webm} type="video/webm" />
          <source src={MEDIA.mp4} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
    </div>
  );
}

// Maqueta de navegador con una web real hecha por nosotros: la de MOOV Huesca
function BrowserMock() {
  return (
    <figure>
      <a
        href={MOOV_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir la web de MOOV Huesca"
        className="group block rounded-[22px] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none"
      >
        <div className="panel overflow-hidden transition-colors duration-200 [@media(hover:hover)]:group-hover:border-white/20">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[12px] text-subtle">moovhuesca.es</div>
          </div>
          <MoovPreview />
        </div>
      </a>
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
