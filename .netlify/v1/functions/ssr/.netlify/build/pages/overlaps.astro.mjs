import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, k as Fragment, h as addAttribute } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import { a as getTrips, g as getPeople } from '../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Overlaps = createComponent(async ($$result, $$props, $$slots) => {
  const trips = await getTrips("approved");
  await getPeople();
  const overlaps = [];
  for (let i = 0; i < trips.length; i++) {
    for (let j = i + 1; j < trips.length; j++) {
      const trip1 = trips[i];
      const trip2 = trips[j];
      if (trip1.destination === trip2.destination) {
        const start1 = new Date(trip1.start_date);
        const end1 = new Date(trip1.end_date);
        const start2 = new Date(trip2.start_date);
        const end2 = new Date(trip2.end_date);
        if (start1 <= end2 && start2 <= end1) {
          const person1 = trip1.person_name || "Unknown";
          const person2 = trip2.person_name || "Unknown";
          if (person1 === person2) continue;
          const overlapStart = new Date(Math.max(start1.getTime(), start2.getTime()));
          const overlapEnd = new Date(Math.min(end1.getTime(), end2.getTime()));
          overlaps.push({
            destination: trip1.destination,
            people: [person1, person2],
            startDate: overlapStart.toISOString().split("T")[0],
            endDate: overlapEnd.toISOString().split("T")[0]
          });
        }
      }
    }
  }
  overlaps.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const destinations = [...new Set(overlaps.map((o) => o.destination))];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones \u2014 Overlaps", "data-astro-cid-pa5pc65n": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section page-header" data-astro-cid-pa5pc65n> <div class="wrap" data-astro-cid-pa5pc65n> <h1 data-astro-cid-pa5pc65n>Próximos cruces</h1> <p data-astro-cid-pa5pc65n>When and where friends will overlap this summer</p> </div> </section> <section class="section" data-astro-cid-pa5pc65n> <div class="wrap" data-astro-cid-pa5pc65n> <div class="tabs" data-astro-cid-pa5pc65n> <button class="tab-btn active" data-tab="timeline" data-astro-cid-pa5pc65n>Timeline</button> <button class="tab-btn" data-tab="map" data-astro-cid-pa5pc65n>Map</button> </div> <div class="tab-content active" id="timeline" data-tab="timeline" data-astro-cid-pa5pc65n> ${overlaps.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-pa5pc65n": true }, { "default": async ($$result3) => renderTemplate` <div class="filter-group" data-astro-cid-pa5pc65n> <label for="destination-filter" data-astro-cid-pa5pc65n>Filter by destination</label> <select id="destination-filter" data-astro-cid-pa5pc65n> <option value="" data-astro-cid-pa5pc65n>All destinations</option> ${destinations.map((d) => renderTemplate`<option${addAttribute(d, "value")} data-astro-cid-pa5pc65n>${d}</option>`)} </select> </div> <div class="timeline" data-astro-cid-pa5pc65n> ${overlaps.map((overlap) => {
    const startDate = new Date(overlap.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    const endDate = new Date(overlap.endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return renderTemplate`<div class="timeline-item"${addAttribute(overlap.destination, "data-destination")} data-astro-cid-pa5pc65n> <div class="timeline-destination" data-astro-cid-pa5pc65n>${overlap.destination}</div> <div class="timeline-people" data-astro-cid-pa5pc65n> ${overlap.people.join(" \u2194 ")} </div> <div class="timeline-dates" data-astro-cid-pa5pc65n> ${startDate} — ${endDate} </div> </div>`;
  })} </div> ` })}` : renderTemplate`<div class="empty-state" data-astro-cid-pa5pc65n> <p data-astro-cid-pa5pc65n>No overlaps scheduled yet. Add trips to see when friends will cross paths.</p> </div>`} </div> <div class="tab-content" id="map" data-tab="map" data-astro-cid-pa5pc65n> <div class="map-placeholder" data-astro-cid-pa5pc65n> <p data-astro-cid-pa5pc65n>Interactive map coming soon.</p> <p style="font-size: 0.9rem; margin-top: 1rem;" data-astro-cid-pa5pc65n>
In the meantime, check the timeline to see where everyone's converging.
</p> </div> </div> </div> </section>  ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/overlaps.astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/overlaps.astro";
const $$url = "/overlaps";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Overlaps,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
