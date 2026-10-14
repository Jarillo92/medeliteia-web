import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { DEMO_HREF } from './config'

// Texto exacto del recurso que se envía por Instagram a quien comenta CLIENTES
const PROMPT = `Actúa como un cliente nuevo que escribe por WhatsApp a mi negocio fuera de horario y pregunta el precio. Te paso cómo atiendo hoy:

- Mi mensaje de bienvenida: [pega aquí]
- Cómo respondo cuando preguntan el precio: [pega aquí]
- Mi horario y qué pasa fuera de él: [pega aquí]
- Qué hago si alguien pregunta y no reserva: [pega aquí]

Dime:
1) Dónde se me escaparía este cliente.
2) Una nota del 1 al 10 a mi primera respuesta.
3) Las 3 mejoras más fáciles.

Habla sin tecnicismos y no inventes datos que no te haya dado.`;

// Copia con la API moderna y, si falla (navegadores internos de Instagram, http), con un textarea temporal
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }
}

function PromptClientes() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // Página de recurso: no se indexa. Canonical propio, como las páginas legales
  useEffect(() => {
    document.title = 'Prompt para detectar dónde pierdes clientes | MedElite IA';
    window.scrollTo(0, 0);
    const robots = document.querySelector('meta[name="robots"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }));
    robots.content = 'noindex';
    const link = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }));
    link.href = 'https://www.medeliteia.com/prompt-clientes';
    return () => clearTimeout(timer.current);
  }, []);

  const handleCopy = async () => {
    const ok = await copyText(PROMPT);
    if (!ok) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative pt-28 pb-20 md:pt-40 md:pb-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{ background: 'radial-gradient(45% 60% at 50% 0%, rgba(47,107,255,0.14), transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl font-semibold tracking-[-0.03em] text-ink text-balance">
            Descubre dónde se te escapan los clientes
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
            Pega este prompt en Claude o ChatGPT (vale la versión gratuita), rellena los 4 huecos con cómo atiendes hoy, sin datos de tus clientes, y en 2 minutos verás dónde se te escapan.
          </p>

          <div className="panel mt-8 p-4 sm:p-6">
            <pre
              className="whitespace-pre-wrap break-words rounded-2xl border border-white/[0.06] bg-black/30 p-4 sm:p-5 font-mono text-[13.5px] sm:text-sm leading-relaxed text-ink/90 select-all"
              aria-label="Prompt para copiar"
            >
              {PROMPT}
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary mt-4 w-full py-4 text-lg"
            >
              {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
              {copied ? '¡Copiado!' : 'Copiar prompt'}
            </button>
            <span className="sr-only" role="status">{copied ? 'Prompt copiado al portapapeles' : ''}</span>
          </div>

          <a href={DEMO_HREF} className="btn-ghost mt-4 w-full py-4 text-base">
            Quiero que lo veamos juntos
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PromptClientes
