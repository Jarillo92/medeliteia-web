import { OWNER } from '../config'
import { LegalLayout, Section } from './LegalLayout'

// Servicios revisados en el código de la web (septiembre de 2026)
const SERVICES = [
  {
    service: 'Calendario de reserva de la demo',
    provider: 'HighLevel, Inc. (GoHighLevel / LeadConnector)',
    domains: 'api.leadconnectorhq.com, link.msgsndr.com',
    purpose: 'Mostrar los huecos disponibles, registrar tu reserva y ajustar el tamaño del calendario. Puede guardar cookies técnicas o datos en tu navegador para funcionar.',
  },
  {
    service: 'Chat con asistente de IA',
    provider: 'HighLevel, Inc. (GoHighLevel / LeadConnector)',
    domains: 'widgets.leadconnectorhq.com',
    purpose: 'Mostrar el chat y mantener tu conversación abierta mientras navegas. Puede guardar un identificador de la conversación en tu navegador.',
  },
  {
    service: 'Alojamiento de la web',
    provider: 'Vercel Inc.',
    domains: OWNER.website,
    purpose: 'Servir la web. No instala cookies de analítica ni de publicidad.',
  },
];

function PoliticaCookies() {
  return (
    <LegalLayout title="Política de cookies" updated="29 de septiembre de 2026">
      <Section title="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita. Algo
          parecido ocurre con otras tecnologías de almacenamiento del navegador, como el almacenamiento local. En esta política usamos
          «cookies» para referirnos a todas ellas.
        </p>
      </Section>

      <Section title="2. Qué cookies usa esta web">
        <p>
          <strong>{OWNER.brand} no instala cookies propias de analítica, de publicidad ni de seguimiento.</strong> La tipografía está
          incluida en la propia web, sin conexión a Google Fonts ni a otros servidores.
        </p>
        <p>
          Las únicas cookies que pueden instalarse son las de los servicios de terceros integrados en la web, necesarios para que
          funcionen el calendario de reservas y el chat:
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Proveedor y dominios</th>
                <th>Para qué</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.service}>
                  <td>{s.service}</td>
                  <td>
                    {s.provider}
                    <br />
                    <span className="text-subtle">{s.domains}</span>
                  </td>
                  <td>{s.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Los nombres y la duración exactos de estas cookies los decide cada proveedor y pueden cambiar. Puedes consultarlos en la{' '}
          <a href="https://www.gohighlevel.com/privacy-policy" target="_blank" rel="noopener noreferrer">política de privacidad de
          HighLevel</a> y en la{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de privacidad de
          Vercel</a>.
        </p>
      </Section>

      <Section title="3. Enlaces a otras webs">
        <p>
          Los botones de WhatsApp, LinkedIn e Instagram son enlaces normales: no cargan nada de esos servicios en esta web. Si los
          pulsas, pasarás a sus sitios, que tienen sus propias políticas de cookies.
        </p>
      </Section>

      <Section title="4. Consentimiento">
        <p>
          Las cookies descritas son técnicas y necesarias para prestar los servicios que usas en la web (reservar la demo y escribir
          en el chat), por lo que están exentas de consentimiento según el artículo 22.2 de la LSSI-CE. Si en el futuro añadimos
          cookies de analítica o publicidad, te pediremos tu consentimiento antes de instalarlas.
        </p>
      </Section>

      <Section title="5. Cómo bloquear o borrar las cookies">
        <p>
          Puedes bloquear o borrar las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox, Edge u otros). Ten en
          cuenta que, si las bloqueas, es posible que el calendario de reservas o el chat no funcionen correctamente.
        </p>
      </Section>

      <Section title="6. Más información">
        <p>
          Para cualquier duda, escríbenos a <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a>. Puedes ver cómo tratamos tus datos
          en la <a href="/politica-privacidad">política de privacidad</a>.
        </p>
      </Section>
    </LegalLayout>
  )
}

export default PoliticaCookies
