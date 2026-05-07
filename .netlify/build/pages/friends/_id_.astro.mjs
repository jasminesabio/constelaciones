import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead, h as addAttribute, k as Fragment } from '../../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_D5hssA0S.mjs';
import { g as getPeople, a as getTrips } from '../../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const people = await getPeople();
  const person = people.find((p) => p.airtableId === id);
  const allTrips = await getTrips("approved");
  const personTrips = person ? allTrips.filter((t) => t.person_name === person.name).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()) : [];
  if (!person) {
    return Astro2.redirect("/friends");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${person.name} \u2014 Constelaciones`, "data-astro-cid-mzay2obs": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section friend-hero" data-astro-cid-mzay2obs> <div class="wrap" data-astro-cid-mzay2obs> <div class="friend-info" data-astro-cid-mzay2obs> <div class="friend-avatar-large" data-astro-cid-mzay2obs> ${person.avatar_url ? renderTemplate`<img${addAttribute(person.avatar_url, "src")}${addAttribute(person.name, "alt")} style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" data-astro-cid-mzay2obs>` : person.name.charAt(0).toUpperCase()} </div> <div class="friend-meta" data-astro-cid-mzay2obs> <h1 data-astro-cid-mzay2obs>${person.name}</h1> ${person.home_city && renderTemplate`<div style="font-size: 0.95rem; color: var(--fog); margin-bottom: 1rem;" data-astro-cid-mzay2obs>From ${person.home_city}</div>`} <div style="font-size: 1rem; color: var(--ink);" data-astro-cid-mzay2obs> ${personTrips.length} ${personTrips.length === 1 ? "trip" : "trips"} this summer
</div> </div> </div> </div> </section> <section class="section friend-section" data-astro-cid-mzay2obs> <div class="wrap" data-astro-cid-mzay2obs> ${personTrips.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-mzay2obs": true }, { "default": async ($$result3) => renderTemplate` <h2 data-astro-cid-mzay2obs>Trips</h2> <div class="trip-list" data-astro-cid-mzay2obs> ${personTrips.map((trip) => {
    const startDate = new Date(trip.start_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    const endDate = new Date(trip.end_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return renderTemplate`<a${addAttribute(`/trips/${trip.id}`, "href")} class="trip-item" style="text-decoration: none;" data-astro-cid-mzay2obs> <div class="trip-destination" data-astro-cid-mzay2obs>${trip.destination}</div> <div class="trip-dates" data-astro-cid-mzay2obs>${startDate} — ${endDate}</div> </a>`;
  })} </div> ` })}`} <div class="cta-row" data-astro-cid-mzay2obs> <a href="/friends" class="btn-secondary" data-astro-cid-mzay2obs>← Back to friends</a> </div> </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/friends/[id].astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/friends/[id].astro";
const $$url = "/friends/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
