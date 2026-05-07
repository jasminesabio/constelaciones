import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CNEMzmoV.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/friends/_id_.astro.mjs');
const _page2 = () => import('./pages/friends.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/overlaps.astro.mjs');
const _page5 = () => import('./pages/tickets/_id_.astro.mjs');
const _page6 = () => import('./pages/tickets.astro.mjs');
const _page7 = () => import('./pages/trips/_id_.astro.mjs');
const _page8 = () => import('./pages/trips.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/friends/[id].astro", _page1],
    ["src/pages/friends/index.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/overlaps.astro", _page4],
    ["src/pages/tickets/[id].astro", _page5],
    ["src/pages/tickets/index.astro", _page6],
    ["src/pages/trips/[id].astro", _page7],
    ["src/pages/trips/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "774e59b1-1518-47a0-bb09-ea819e9fe0c5"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
