import { OWNER } from '../config'
import { LegalLayout, Section } from './LegalLayout'

function AvisoLegal() {
  return (
    <LegalLayout title="Aviso legal" updated="29 de septiembre de 2026">
      <Section title="1. Datos identificativos">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio
          Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:
        </p>
        <ul>
          <li><strong>Titular:</strong> {OWNER.name}</li>
          <li><strong>Nombre comercial:</strong> {OWNER.brand}</li>
          <li><strong>NIF:</strong> {OWNER.nif}</li>
          <li><strong>Domicilio:</strong> {OWNER.address}</li>
          <li><strong>Correo electrónico:</strong> <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a></li>
          <li><strong>Teléfono:</strong> {OWNER.phone}</li>
          <li><strong>Sitio web:</strong> {OWNER.website}</li>
        </ul>
        <p>
          Actividad: servicios de automatización con inteligencia artificial (asistentes de atención y reserva de citas por WhatsApp y
          chat) y diseño y desarrollo de páginas web a medida.
        </p>
      </Section>

      <Section title="2. Objeto y aceptación">
        <p>
          Este aviso legal regula el acceso y el uso del sitio web {OWNER.website} (en adelante, «la web»). Al navegar por la web
          aceptas estas condiciones. Si no estás de acuerdo con ellas, te pedimos que no la utilices.
        </p>
      </Section>

      <Section title="3. Condiciones de uso">
        <p>
          Te comprometes a usar la web y sus contenidos de forma lícita, de acuerdo con la ley, la buena fe y este aviso legal. En
          particular, no debes usarla para actividades ilícitas, para dañar o sobrecargar sus sistemas, ni para introducir virus o
          cualquier otro código dañino.
        </p>
        <p>
          La información de la web tiene carácter informativo sobre los servicios de {OWNER.brand}. Las condiciones concretas de cada
          servicio, incluido su precio, se acuerdan de forma personalizada con cada cliente.
        </p>
      </Section>

      <Section title="4. Propiedad intelectual e industrial">
        <p>
          Los contenidos de la web (textos, diseño, código, logotipos, imágenes y demás elementos) son titularidad de {OWNER.name} o
          se usan con autorización de sus titulares. Queda prohibida su reproducción, distribución, comunicación pública o
          transformación sin autorización previa y por escrito, salvo para uso personal y privado.
        </p>
        <p>
          Las marcas y nombres de terceros que aparecen en la web (por ejemplo, WhatsApp, GoHighLevel o Make) pertenecen a
          sus respectivos titulares y se citan solo con fines informativos.
        </p>
      </Section>

      <Section title="5. Responsabilidad">
        <p>
          Trabajamos para que la información de la web sea correcta y esté actualizada, pero no podemos garantizar la ausencia de
          errores ni la disponibilidad continua de la web. No nos hacemos responsables de los daños que pudieran derivarse de
          interrupciones, fallos técnicos o del uso indebido de la web por parte de los usuarios.
        </p>
        <p>
          La web puede incluir enlaces a sitios de terceros (por ejemplo, WhatsApp, LinkedIn o Instagram). No controlamos esos sitios
          ni somos responsables de sus contenidos o de sus políticas de privacidad.
        </p>
      </Section>

      <Section title="6. Servicios de terceros integrados">
        <p>
          El calendario de reserva de la demo y el chat de la web funcionan con la plataforma GoHighLevel (LeadConnector). El chat
          está atendido por un asistente de inteligencia artificial. Puedes consultar cómo tratamos los datos que nos facilitas en la{' '}
          <a href="/politica-privacidad">política de privacidad</a> y qué cookies se usan en la{' '}
          <a href="/politica-cookies">política de cookies</a>.
        </p>
      </Section>

      <Section title="7. Legislación aplicable y jurisdicción">
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y
          tribunales que correspondan según la normativa aplicable. Si actúas como consumidor, serán competentes los de tu domicilio.
        </p>
      </Section>
    </LegalLayout>
  )
}

export default AvisoLegal
