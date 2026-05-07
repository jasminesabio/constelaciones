import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D5hssA0S.mjs';
import { b as getTickets, g as getPeople } from '../../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const tickets = await getTickets();
  const ticket = tickets.find((t) => t.airtableId === id);
  const people = await getPeople();
  if (!ticket) {
    return Astro2.redirect("/tickets");
  }
  people.find((p) => p.airtableId === ticket.seller_id);
  const eventDate = new Date(ticket.event_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${ticket.event_name} \u2014 Constelaciones`, "data-astro-cid-bc5ragkb": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section ticket-hero" data-astro-cid-bc5ragkb> <div class="wrap" data-astro-cid-bc5ragkb> <h1 data-astro-cid-bc5ragkb>${ticket.event_name}</h1> <div style="font-size: 0.95rem; color: var(--fog);" data-astro-cid-bc5ragkb> ${ticket.event_location} · ${eventDate} </div> </div> </section> <section class="section ticket-detail" data-astro-cid-bc5ragkb> <div class="wrap" data-astro-cid-bc5ragkb> <div class="ticket-info" data-astro-cid-bc5ragkb> <div class="info-row" data-astro-cid-bc5ragkb> <div class="info-label" data-astro-cid-bc5ragkb>Price</div> <div class="ticket-price" data-astro-cid-bc5ragkb>${ticket.asking_price}</div> </div> ${ticket.notes && renderTemplate`<div class="info-row" data-astro-cid-bc5ragkb> <div class="info-label" data-astro-cid-bc5ragkb>Details</div> <p class="info-value" data-astro-cid-bc5ragkb>${ticket.notes}</p> </div>`} <div class="cta-row" data-astro-cid-bc5ragkb> <a href="/tickets" class="btn-secondary" data-astro-cid-bc5ragkb>← Back to tickets</a> </div> </div> </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/tickets/[id].astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/tickets/[id].astro";
const $$url = "/tickets/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
