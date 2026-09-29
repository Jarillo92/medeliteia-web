import { CHAT_WIDGET } from './config'

// Carga el chat de GoHighLevel cuando la página ya ha terminado de cargar y el navegador está libre,
// para que no compita con el hero. Mismo script y atributos que el código de GoHighLevel.
export function loadChatWidget() {
  if (typeof window === 'undefined' || document.querySelector(`script[data-widget-id="${CHAT_WIDGET.widgetId}"]`)) return;

  const inject = () => {
    const script = document.createElement('script');
    script.src = CHAT_WIDGET.src;
    script.async = true;
    script.dataset.resourcesUrl = CHAT_WIDGET.resourcesUrl;
    script.dataset.widgetId = CHAT_WIDGET.widgetId;
    document.body.appendChild(script);
  };

  const whenIdle = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(inject, { timeout: 3000 });
    else setTimeout(inject, 1500);
  };

  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}
