import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D5hssA0S.mjs';
import { a as getTrips, g as getPeople } from '../../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const trips = await getTrips("approved");
  const trip = trips.find((t) => t.airtableId === id);
  const people = await getPeople();
  if (!trip) {
    return Astro2.redirect("/trips");
  }
  const person = people.find((p) => p.name === trip.person_name);
  const startDate = new Date(trip.start_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const endDate = new Date(trip.end_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${trip.destination} \u2014 Constelaciones`, "data-astro-cid-tzeexwjt": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section trip-hero" data-astro-cid-tzeexwjt> <div class="wrap" data-astro-cid-tzeexwjt> <h1 data-astro-cid-tzeexwjt>${trip.destination}</h1> ${trip.event_tag && renderTemplate`<span class="trip-tag" data-astro-cid-tzeexwjt>${trip.event_tag}</span>`} <div class="trip-meta" data-astro-cid-tzeexwjt> <div data-astro-cid-tzeexwjt> <strong data-astro-cid-tzeexwjt>When:</strong> ${startDate} — ${endDate} </div> ${person && renderTemplate`<div data-astro-cid-tzeexwjt> <strong data-astro-cid-tzeexwjt>Who:</strong> <a${addAttribute(`/friends/${person.airtableId}`, "href")} data-astro-cid-tzeexwjt>${person.name}</a> </div>`} </div> </div> </section> <section class="section trip-detail" data-astro-cid-tzeexwjt> <div class="wrap" data-astro-cid-tzeexwjt> <div class="trip-card-info" data-astro-cid-tzeexwjt> ${trip.notes && renderTemplate`<div class="info-row" data-astro-cid-tzeexwjt> <div class="info-label" data-astro-cid-tzeexwjt>Details</div> <p class="info-value" data-astro-cid-tzeexwjt>${trip.notes}</p> </div>`} ${trip.last_updated && renderTemplate`<div class="info-row" data-astro-cid-tzeexwjt> <div class="info-label" data-astro-cid-tzeexwjt>Last updated</div> <div class="info-value" data-astro-cid-tzeexwjt>${trip.last_updated}</div> </div>`} <div class="cta-row" data-astro-cid-tzeexwjt> <a href="/trips" class="btn-secondary" data-astro-cid-tzeexwjt>← Back to trips</a> </div> </div> </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/trips/[id].astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/trips/[id].astro";
const $$url = "/trips/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
