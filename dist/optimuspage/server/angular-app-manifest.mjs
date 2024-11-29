
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: undefined,
  assets: new Map([
['index.csr.html', {size: 108286, hash: '777ab621d95eee233ff4f5b23e7334a3afe0cc99eb5734f2fae5bb99f9081dd4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 8471, hash: '8f3f785f687defbef908ca12ae9569185beddd9dd16ddc16016f15857a18bfd9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-2PPBJEMX.css', {size: 489143, hash: 'K4Nx2sGYd3Y', text: () => import('./assets-chunks/styles-2PPBJEMX_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
