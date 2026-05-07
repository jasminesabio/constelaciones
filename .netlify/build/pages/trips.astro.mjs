import { f as createComponent, j as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, k as Fragment } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import { a as getTrips, g as getPeople } from '../chunks/airtable_Bc-A5OtI.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const trips = await getTrips("approved");
  const people = await getPeople();
  const destinations = [...new Set(trips.map((t) => t.destination))];
  const sortedTrips = trips.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  const uniquePeople = [...new Set(trips.map((t) => t.person_name).filter(Boolean))].sort();
  const uniqueCountries = [...new Set(trips.map((t) => {
    const parts = t.destination.split(",");
    return parts[parts.length - 1].trim();
  }))].sort();
  const uniqueMonths = [...new Set(trips.map((t) => {
    const date = new Date(t.start_date);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }))].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
  function parseJSON(jsonString) {
    if (!jsonString) return null;
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }
  function formatDate(dateStr, options) {
    return new Date(dateStr).toLocaleDateString("en-US", options);
  }
  function formatDateTime(dateStr, options) {
    return new Date(dateStr).toLocaleString("en-US", options);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones \u2014 Trips", "data-astro-cid-lz5tnd2w": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section page-header" data-astro-cid-lz5tnd2w> <div class="wrap" data-astro-cid-lz5tnd2w> <h1 data-astro-cid-lz5tnd2w>All trips</h1> <p data-astro-cid-lz5tnd2w>Summer adventures across ${destinations.length}+ destinations</p> </div> </section> <section class="section" data-astro-cid-lz5tnd2w> <div class="wrap" data-astro-cid-lz5tnd2w> <div class="filters-section" data-astro-cid-lz5tnd2w> <div class="filters-title" data-astro-cid-lz5tnd2w>Filter Trips</div> <div class="filters-grid" data-astro-cid-lz5tnd2w> <div class="filter-group" data-astro-cid-lz5tnd2w> <label class="filter-label" for="filter-person" data-astro-cid-lz5tnd2w>Person</label> <select id="filter-person" class="filter-select" data-astro-cid-lz5tnd2w> <option value="" data-astro-cid-lz5tnd2w>All people</option> ${uniquePeople.map((person) => renderTemplate`<option${addAttribute(person, "value")} data-astro-cid-lz5tnd2w>${person}</option>`)} </select> </div> <div class="filter-group" data-astro-cid-lz5tnd2w> <label class="filter-label" for="filter-country" data-astro-cid-lz5tnd2w>Country</label> <select id="filter-country" class="filter-select" data-astro-cid-lz5tnd2w> <option value="" data-astro-cid-lz5tnd2w>All countries</option> ${uniqueCountries.map((country) => renderTemplate`<option${addAttribute(country, "value")} data-astro-cid-lz5tnd2w>${country}</option>`)} </select> </div> <div class="filter-group" data-astro-cid-lz5tnd2w> <label class="filter-label" for="filter-month" data-astro-cid-lz5tnd2w>Month</label> <select id="filter-month" class="filter-select" data-astro-cid-lz5tnd2w> <option value="" data-astro-cid-lz5tnd2w>All months</option> ${uniqueMonths.map((month) => renderTemplate`<option${addAttribute(month, "value")} data-astro-cid-lz5tnd2w>${month}</option>`)} </select> </div> </div> <div id="active-filters" class="active-filters" data-astro-cid-lz5tnd2w></div> </div> <div id="trip-count" class="trip-count" data-astro-cid-lz5tnd2w></div> ${sortedTrips.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-lz5tnd2w": true }, { "default": async ($$result3) => renderTemplate`${sortedTrips.map((trip) => {
    const person = people.find((p) => p.id === trip.person_id);
    const personName = trip.person_name || person?.name || "Unknown";
    const startDateOpts = { month: "short", day: "numeric" };
    const endDateOpts = { month: "short", day: "numeric", year: "numeric" };
    const startDate = formatDate(trip.start_date, startDateOpts);
    const endDate = formatDate(trip.end_date, endDateOpts);
    const flightTo = parseJSON(trip.flight_to);
    parseJSON(trip.flight_from);
    const accommodation = parseJSON(trip.accommodation);
    const events = parseJSON(trip.events);
    const country = trip.destination.split(",").pop()?.trim() || "";
    const tripMonth = new Date(trip.start_date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    return renderTemplate`<div class="trip-card"${addAttribute(personName, "data-person")}${addAttribute(country, "data-country")}${addAttribute(tripMonth, "data-month")} data-astro-cid-lz5tnd2w> <div class="trip-header" data-astro-cid-lz5tnd2w> <h3 class="trip-destination" data-astro-cid-lz5tnd2w>${trip.destination}</h3> <div class="trip-meta" data-astro-cid-lz5tnd2w> ${trip.event_tag && renderTemplate`<span class="trip-tag" data-astro-cid-lz5tnd2w>${trip.event_tag}</span>`} <span class="trip-dates" data-astro-cid-lz5tnd2w>📅 ${startDate} — ${endDate}</span> <span class="trip-person" data-astro-cid-lz5tnd2w>👤 ${personName}</span> </div> </div> <div class="trip-body" data-astro-cid-lz5tnd2w> ${flightTo && renderTemplate`<div class="trip-section" data-astro-cid-lz5tnd2w> <div class="section-title" data-astro-cid-lz5tnd2w>✈️ Flight There</div> <div class="flight-info" data-astro-cid-lz5tnd2w> <div class="flight-route" data-astro-cid-lz5tnd2w> ${flightTo.departure_airport} → ${flightTo.arrival_airport} ${flightTo.status && renderTemplate`<span${addAttribute(`status-badge status-${flightTo.status.toLowerCase()}`, "class")} data-astro-cid-lz5tnd2w> ${flightTo.status === "booked" ? "\u2705 Booked" : "\u{1F532} TBD"} </span>`} </div> <div class="flight-details" data-astro-cid-lz5tnd2w> ${flightTo.airline && renderTemplate`<div data-astro-cid-lz5tnd2w>${flightTo.airline} ${flightTo.flight_number}</div>`} ${flightTo.departure_time && renderTemplate`<div data-astro-cid-lz5tnd2w>Departs: ${formatDateTime(flightTo.departure_time, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>`} ${flightTo.arrival_time && renderTemplate`<div data-astro-cid-lz5tnd2w>Arrives: ${formatDateTime(flightTo.arrival_time, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>`} ${flightTo.booking_ref && renderTemplate`<div data-astro-cid-lz5tnd2w>Booking ref: ${flightTo.booking_ref}</div>`} </div> </div> </div>`} ${accommodation && renderTemplate`<div class="trip-section" data-astro-cid-lz5tnd2w> <div class="section-title" data-astro-cid-lz5tnd2w>🏠 Accommodation</div> <div class="accommodation-info" data-astro-cid-lz5tnd2w> <div class="accommodation-name" data-astro-cid-lz5tnd2w> ${accommodation.name || "TBD"} ${accommodation.status && renderTemplate`<span${addAttribute(`status-badge status-${accommodation.status.toLowerCase()}`, "class")} data-astro-cid-lz5tnd2w> ${accommodation.status === "booked" && "\u2705 Booked"} ${accommodation.status === "options" && "\u{1F532} Reviewing options"} ${accommodation.status === "TBD" && "\u{1F532} TBD"} </span>`} </div> ${accommodation.type && renderTemplate`<div class="accommodation-type" data-astro-cid-lz5tnd2w>${accommodation.type}</div>`} ${accommodation.notes && renderTemplate`<div class="accommodation-notes" data-astro-cid-lz5tnd2w>${accommodation.notes}</div>`} </div> </div>`} ${events && events.length > 0 && renderTemplate`<div class="trip-section" data-astro-cid-lz5tnd2w> <div class="section-title" data-astro-cid-lz5tnd2w>🎉 Events & Highlights</div> <ul class="events-list" data-astro-cid-lz5tnd2w> ${events.map((event) => renderTemplate`<li class="event-item" data-astro-cid-lz5tnd2w> <div class="event-name" data-astro-cid-lz5tnd2w>${event.name}</div> <div class="event-details" data-astro-cid-lz5tnd2w> ${event.date && event.time && renderTemplate`<div data-astro-cid-lz5tnd2w>${formatDate(event.date, { month: "short", day: "numeric" })} at ${event.time}</div>`} ${event.location && renderTemplate`<div data-astro-cid-lz5tnd2w>📍 ${event.location}</div>`} ${event.notes && renderTemplate`<div class="event-note" data-astro-cid-lz5tnd2w>${event.notes}</div>`} </div> </li>`)} </ul> </div>`} ${trip.notes && renderTemplate`<div class="trip-section" data-astro-cid-lz5tnd2w> <div class="section-title" data-astro-cid-lz5tnd2w>📝 Notes</div> <div class="trip-notes" data-astro-cid-lz5tnd2w>${trip.notes}</div> </div>`} </div> </div>`;
  })}` })}` : renderTemplate`<div class="empty-state" data-astro-cid-lz5tnd2w> <p data-astro-cid-lz5tnd2w>No trips scheduled yet. Check back soon!</p> </div>`} </div> </section>  ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/trips/index.astro", void 0);

const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/trips/index.astro";
const $$url = "/trips";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
