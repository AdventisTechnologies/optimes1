
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: undefined,
  assets: new Map([
['index.csr.html', {size: 67450, hash: '17fcd9d9562a6ce255d88894d5cdd7988a8548350c37aba99c6c6a1bd07d2047', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 8471, hash: '0d8f41c28ff2e91ac5587e1667c762e78324eef0a517255cf02be6e2123bbb41', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-2D3D26H3.css', {size: 431274, hash: '4WJkXh1tqCw', text: () => import('./assets-chunks/styles-2D3D26H3_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
