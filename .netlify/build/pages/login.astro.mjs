import { f as createComponent, j as renderComponent, r as renderTemplate, i as createAstro, m as maybeRenderHead } from '../chunks/astro/server_B31-YbgY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D5hssA0S.mjs';
import crypto from 'crypto';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const PASSWORD = "mexicocity";
  const COOKIE_SECRET = "constelaciones-secret-key";
  function hashPassword(password) {
    return crypto.createHash("sha256").update(password + COOKIE_SECRET).digest("hex");
  }
  let error = "";
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const password = data.get("password");
    if (password === PASSWORD) {
      const token = hashPassword(PASSWORD);
      const response = new Response(null, {
        status: 302,
        headers: {
          "Location": "/",
          "Set-Cookie": `constelaciones_auth=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`
        }
      });
      return response;
    } else {
      error = "Incorrect password. Try again.";
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Constelaciones — Login", "showNav": false, "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="login-container" data-astro-cid-sgpqyurt> <div class="login-box" data-astro-cid-sgpqyurt> <h1 data-astro-cid-sgpqyurt>Constelaciones</h1> <p data-astro-cid-sgpqyurt>Where everyone's wandering this summer.</p> ${error && renderTemplate`<div class="error" data-astro-cid-sgpqyurt>${error}</div>`} <form method="POST" enctype="application/x-www-form-urlencoded" data-astro-cid-sgpqyurt> <div class="form-group" data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>
Password
<input type="password" id="password" name="password" required placeholder="Enter password" data-astro-cid-sgpqyurt> </label> </div> <button type="submit" class="btn-submit" data-astro-cid-sgpqyurt>Enter</button> </form> </div> </div> ` })}`;
}, "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/login.astro", void 0);
const $$file = "/Users/jasminesabio/Documents/Claude/Projects/Studio Jas/constelaciones/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
