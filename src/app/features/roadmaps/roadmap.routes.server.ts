import { ServerRoute, RenderMode } from '@angular/ssr';

export const ROADMAP_SERVER_ROUTES: ServerRoute[] = [
  {
    path: 'roadmap',
    renderMode: RenderMode.Server, // SSR only (no prerender)
  },
  {
    path: 'roadmap/:id',
    renderMode: RenderMode.Server, // SSR only (no prerender)
    // Agar prerender karna ho to yahan getPrerenderParams de sakte ho
    // getPrerenderParams: () => [{ id: '1' }, { id: '2' }]
  },
];
