import { useEffect, useState } from 'react'

// Calendario de GoHighLevel para las landings: mismo iframe y mismo script que ContactSection de la home
// (no se toca ContactSection). El script y el ajuste de altura solo corren en el navegador.
function BookingCalendar() {
  const [iframeHeight, setIframeHeight] = useState(900);

  useEffect(() => {
    const scriptId = 'ghl-form-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'iframe-resize' && event.data.height) {
        setIframeHeight(event.data.height + 20);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="rounded-[26px] bg-surface p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:p-3">
      <div className="relative isolate overflow-hidden rounded-[20px] bg-surface [transform:translateZ(0)]">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/ZFBJGeef7qz5jyRrEyYa"
          style={{ width: '100%', border: 'none', overflow: 'hidden', height: `${iframeHeight}px`, transition: 'height 0.3s ease' }}
          scrolling="no"
          id="ZFBJGeef7qz5jyRrEyYa_1784279743535"
          title="Reserva tu demo gratuita"
        />
        {/* Tapa la franja blanca del final del iframe sin recortarlo: no bloquea clics */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface from-60% to-transparent" />
      </div>
    </div>
  );
}

export default BookingCalendar
