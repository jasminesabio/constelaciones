import { f as createComponent, l as renderHead, r as renderTemplate, n as renderSlot, i as createAstro } from './astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                        */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "Constelaciones", showNav = true } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>${title}</title>${renderHead()}</head> <body> ${showNav && renderTemplate`<nav> <div class="wrap nav-row"> <a class="nav-wordmark" href="/">Constelaciones</a> <ul class="nav-links"> <li><a href="/trips">Trips</a></li> <li><a href="/overlaps">Overlaps</a></li> <li><a href="/friends">Friends</a></li> <li><a href="/tickets">Tickets</a></li> </ul> </div> </nav>`} <main> ${renderSlot($$result, $$slots["default"])} </main> <footer> <div class="wrap footer-row"> <a class="footer-wordmark" href="/">Constelaciones</a> <ul class="footer-links"> <li><a href="/trips">Trips</a></li> <li><a href="/overlaps">Overlaps</a></li> <li><a href="/friends">Friends</a></li> <li><a href="/tickets">Tickets</a></li> </ul> <p class="footer-tagline">Where everyone's wandering this summer · © 2026</p> </div> </footer> </body></html>`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
