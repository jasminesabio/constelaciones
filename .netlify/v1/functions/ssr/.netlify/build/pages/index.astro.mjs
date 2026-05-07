import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import { a as getTrips, b as getTickets, g as getPeople } from '../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const trips = await getTrips("approved");
  const tickets = await getTickets("available");
  const people = await getPeople();
  const allUpdates = [
    ...trips.slice(0, 3).map((t) => ({
      type: "trip",
      title: `${t.destination}`,
      date: t.last_updated || "recently",
      person: t.person_id
    })),
    ...tickets.slice(0, 3).map((tk) => ({
      type: "ticket",
      title: `${tk.event_name}`,
      date: tk.last_updated || "recently",
      person: tk.seller_id
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcomingOverlapCount = trips.filter((t) => {
    const endDate = new Date(t.end_date);
    return endDate > /* @__PURE__ */ new Date();
  }).length;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones \u2014 Dashboard", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section hero" data-astro-cid-j7pv25f6> <div class="wrap" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Próximos cruces</h1> <p class="hero-sub" data-astro-cid-j7pv25f6>Where ${people.length}+ friends are wandering this summer. See who's where, when.</p> <div class="cta-row" data-astro-cid-j7pv25f6> <a href="/trips" class="btn-primary" data-astro-cid-j7pv25f6>View all trips</a> </div> </div> </section> <section class="section" data-astro-cid-j7pv25f6> <div class="wrap" data-astro-cid-j7pv25f6> <div class="dashboard-grid" data-astro-cid-j7pv25f6> <div class="dashboard-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Recent updates</h2> ${allUpdates.length > 0 ? renderTemplate`<ul class="update-list" data-astro-cid-j7pv25f6> ${allUpdates.map((update) => renderTemplate`<li class="update-item" data-astro-cid-j7pv25f6> <div class="update-title" data-astro-cid-j7pv25f6> ${update.type === "trip" ? "\u2708\uFE0F" : "\u{1F3AB}"} ${update.title} </div> <div class="update-date" data-astro-cid-j7pv25f6>updated ${update.date}</div> </li>`)} </ul>` : renderTemplate`<p data-astro-cid-j7pv25f6>No updates yet. Be the first to add your summer plans.</p>`} </div> <div class="dashboard-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>At a glance</h2> <div class="stats-grid" data-astro-cid-j7pv25f6> <div class="stat-card" data-astro-cid-j7pv25f6> <div class="stat-number" data-astro-cid-j7pv25f6>${people.length}</div> <div class="stat-label" data-astro-cid-j7pv25f6>Friends</div> </div> <div class="stat-card" data-astro-cid-j7pv25f6> <div class="stat-number" data-astro-cid-j7pv25f6>${trips.length}</div> <div class="stat-label" data-astro-cid-j7pv25f6>Trips planned</div> </div> <div class="stat-card" data-astro-cid-j7pv25f6> <div class="stat-number" data-astro-cid-j7pv25f6>${tickets.length}</div> <div class="stat-label" data-astro-cid-j7pv25f6>Tickets available</div> </div> <div class="stat-card" data-astro-cid-j7pv25f6> <div class="stat-number" data-astro-cid-j7pv25f6>${upcomingOverlapCount}</div> <div class="stat-label" data-astro-cid-j7pv25f6>Upcoming overlaps</div> </div> </div> </div> </div> </div> </section> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/index.astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
