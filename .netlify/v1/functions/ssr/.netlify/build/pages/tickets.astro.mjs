import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import { b as getTickets, g as getPeople } from '../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const tickets = await getTickets("available");
  const people = await getPeople();
  const sortedTickets = tickets.sort((a, b) => new Date(b.last_updated || "").getTime() - new Date(a.last_updated || "").getTime());
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones \u2014 Tickets", "data-astro-cid-sgyy2tpz": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section page-header" data-astro-cid-sgyy2tpz> <div class="wrap" data-astro-cid-sgyy2tpz> <h1 data-astro-cid-sgyy2tpz>Festival & event tickets</h1> <p data-astro-cid-sgyy2tpz>Selling or seeking summer event passes</p> </div> </section> <section class="section" data-astro-cid-sgyy2tpz> <div class="wrap" data-astro-cid-sgyy2tpz> ${sortedTickets.length > 0 ? renderTemplate`<div class="tickets-grid" data-astro-cid-sgyy2tpz> ${sortedTickets.map((ticket) => {
    const seller = people.find((p) => p.airtableId === ticket.seller_id);
    const eventDate = new Date(ticket.event_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return renderTemplate`<a${addAttribute(`/tickets/${ticket.airtableId}`, "href")} class="ticket-card" data-astro-cid-sgyy2tpz> <h3 class="ticket-event" data-astro-cid-sgyy2tpz>${ticket.event_name}</h3> <div class="ticket-meta" data-astro-cid-sgyy2tpz> ${ticket.event_location} · ${eventDate} </div> <div class="ticket-price" data-astro-cid-sgyy2tpz>${ticket.asking_price}</div> ${ticket.notes && renderTemplate`<p style="font-size: 0.9rem; margin: 0.75rem 0;" data-astro-cid-sgyy2tpz>${ticket.notes}</p>`} ${seller && renderTemplate`<div class="ticket-seller" data-astro-cid-sgyy2tpz>Seller: ${seller.name}</div>`} </a>`;
  })} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-sgyy2tpz> <p data-astro-cid-sgyy2tpz>No tickets available right now. Check back soon!</p> </div>`} </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/tickets/index.astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/tickets/index.astro";
const $$url = "/tickets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
