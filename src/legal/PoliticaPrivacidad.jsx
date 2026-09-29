import { OWNER } from '../config'
import { LegalLayout, Section } from './LegalLayout'

function PoliticaPrivacidad() {
  return (
    <LegalLayout title="Política de privacidad" updated="29 de septiembre de 2026">
      <p>
        Esta política explica cómo tratamos tus datos personales cuando usas esta web, reservas una demo, escribes en el chat o nos
        contactas por WhatsApp, de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
        Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <Section title="1. Responsable del tratamiento">
        <ul>
          <li><strong>Responsable:</strong> {OWNER.name} ({OWNER.brand})</li>
          <li><strong>NIF:</strong> {OWNER.nif}</li>
          <li><strong>Domicilio:</strong> {OWNER.address}</li>
          <li><strong>Correo electrónico:</strong> <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a></li>
          <li><strong>Teléfono:</strong> {OWNER.phone}</li>
        </ul>
      </Section>

      <Section title="2. Qué datos recogemos">
        <ul>
          <li>
            <strong>Calendario de reserva y chat de la web</strong> (GoHighLevel / LeadConnector): nombre, correo electrónico,
            teléfono y tipo de negocio, además del contenido de lo que escribas en el chat.
          </li>
          <li>
            <strong>WhatsApp:</strong> tu número de teléfono, tu nombre de perfil y el contenido de las conversaciones que mantengas
            con nosotros.
          </li>
          <li><strong>Correo electrónico y teléfono:</strong> los datos que nos facilites al contactarnos por esas vías.</li>
        </ul>
        <p>
          No necesitamos datos de salud ni otras categorías especiales de datos. Te pedimos que no los incluyas en el chat ni en tus
          mensajes.
        </p>
      </Section>

      <Section title="3. Chat atendido por inteligencia artificial">
        <p>
          El chat de esta web está atendido por un <strong>asistente de inteligencia artificial</strong>, no por una persona. Sus
          respuestas se generan de forma automática a partir de la información de {OWNER.brand}. Puede ayudarte a resolver dudas y a
          reservar la demo, pero no toma decisiones que produzcan efectos jurídicos sobre ti ni te afecten de forma significativa.
        </p>
        <p>
          Si prefieres hablar con una persona, escríbenos a <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a> o llámanos al{' '}
          {OWNER.phone}.
        </p>
      </Section>

      <Section title="4. Para qué usamos tus datos">
        <ul>
          <li>Responder a tus consultas por el chat, WhatsApp, correo electrónico o teléfono.</li>
          <li>Gestionar la demo: reservarla, enviarte la confirmación y los recordatorios, y cambiarla o cancelarla si lo pides.</li>
        </ul>
        <p>No usaremos tus datos para finalidades distintas de estas sin informarte antes.</p>
      </Section>

      <Section title="5. Base jurídica">
        <ul>
          <li>
            <strong>Tu consentimiento</strong> (art. 6.1.a RGPD), que nos das al escribirnos o al rellenar el formulario de reserva.
            Puedes retirarlo en cualquier momento.
          </li>
          <li>
            <strong>La aplicación de medidas precontractuales a petición tuya</strong> (art. 6.1.b RGPD), para organizar la demo y
            enviarte la información que nos pidas sobre nuestros servicios.
          </li>
        </ul>
      </Section>

      <Section title="6. Cuánto tiempo conservamos tus datos">
        <p>
          Los conservamos mientras sean necesarios para atender tu consulta y gestionar la demo. Si después contratas nuestros
          servicios, se conservarán durante la relación comercial. En cualquier caso, cuando dejen de ser necesarios se mantendrán
          bloqueados solo durante los plazos legales en los que pudieran exigirse responsabilidades, y después se suprimirán.
        </p>
      </Section>

      <Section title="7. Quién más trata tus datos">
        <p>
          No cedemos tus datos a terceros, salvo obligación legal. Para prestar el servicio usamos proveedores que tratan datos por
          cuenta nuestra (encargados del tratamiento):
        </p>
        <ul>
          <li>
            <strong>HighLevel, Inc.</strong> (GoHighLevel / LeadConnector), EE. UU.: calendario de reservas, chat con asistente de IA
            y gestión de contactos.
          </li>
          <li><strong>WhatsApp</strong> (grupo Meta): conversaciones por WhatsApp.</li>
          <li><strong>Vercel Inc.</strong>, EE. UU.: alojamiento de la web.</li>
          <li>Nuestro proveedor de correo electrónico, para las comunicaciones por email.</li>
        </ul>
      </Section>

      <Section title="8. Transferencias internacionales">
        <p>
          Algunos de estos proveedores están en Estados Unidos o pueden acceder a los datos desde allí. En esos casos, las
          transferencias se hacen con las garantías previstas en el RGPD, como el Marco de Privacidad de Datos UE-EE. UU. o las
          cláusulas contractuales tipo aprobadas por la Comisión Europea, según el proveedor.
        </p>
      </Section>

      <Section title="9. Tus derechos">
        <p>
          Puedes ejercer tus derechos de <strong>acceso, rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad</strong>, y retirar tu consentimiento en cualquier momento, escribiendo a{' '}
          <a href={`mailto:${OWNER.email}`}>{OWNER.email}</a> o por correo postal a {OWNER.address}. Si es necesario para comprobar
          tu identidad, te pediremos que la acredites.
        </p>
        <p>
          Si consideras que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección
          de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
        </p>
      </Section>

      <Section title="10. Menores de edad">
        <p>
          Esta web se dirige a profesionales y negocios. No recogemos de forma consciente datos de menores de 14 años.
        </p>
      </Section>

      <Section title="11. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a pérdidas, accesos no autorizados o
          usos indebidos.
        </p>
      </Section>

      <Section title="12. Cambios en esta política">
        <p>
          Podemos actualizar esta política para adaptarla a cambios legales o de nuestros servicios. La fecha de la última
          actualización aparece al principio de esta página. Más información sobre las cookies en la{' '}
          <a href="/politica-cookies">política de cookies</a>.
        </p>
      </Section>
    </LegalLayout>
  )
}

export default PoliticaPrivacidad
