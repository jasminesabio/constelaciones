import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import { g as getPeople, a as getTrips } from '../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const people = await getPeople();
  const trips = await getTrips("approved");
  const peopleWithTrips = people.map((p) => ({
    ...p,
    tripCount: trips.filter((t) => t.person_name === p.name).length
  }));
  const sorted = peopleWithTrips.sort((a, b) => b.tripCount - a.tripCount);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones \u2014 Friends", "data-astro-cid-wpmbzudb": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section page-header" data-astro-cid-wpmbzudb> <div class="wrap" data-astro-cid-wpmbzudb> <h1 data-astro-cid-wpmbzudb>Friends in Constelaciones</h1> <p data-astro-cid-wpmbzudb>Roster of ${people.length} contributors</p> </div> </section> <section class="section" data-astro-cid-wpmbzudb> <div class="wrap" data-astro-cid-wpmbzudb> ${sorted.length > 0 ? renderTemplate`<div class="friends-grid" data-astro-cid-wpmbzudb> ${sorted.map((person) => renderTemplate`<a${addAttribute(`/friends/${person.airtableId}`, "href")} class="friend-card" data-astro-cid-wpmbzudb> <div class="friend-avatar" data-astro-cid-wpmbzudb> ${person.avatar_url ? renderTemplate`<img${addAttribute(person.avatar_url, "src")}${addAttribute(person.name, "alt")} style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" data-astro-cid-wpmbzudb>` : person.name.charAt(0).toUpperCase()} </div> <h3 class="friend-name" data-astro-cid-wpmbzudb>${person.name}</h3> ${person.home_city && renderTemplate`<div class="friend-city" data-astro-cid-wpmbzudb>${person.home_city}</div>`} <div class="friend-trips" data-astro-cid-wpmbzudb> <div class="trip-count" data-astro-cid-wpmbzudb>${person.tripCount}</div> <div data-astro-cid-wpmbzudb>${person.tripCount === 1 ? "trip" : "trips"}</div> </div> </a>`)} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-wpmbzudb> <p data-astro-cid-wpmbzudb>No friends listed yet. Check back soon!</p> </div>`} </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/friends/index.astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/friends/index.astro";
const $$url = "/friends";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
