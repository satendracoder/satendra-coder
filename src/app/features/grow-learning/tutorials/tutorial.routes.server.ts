import { ServerRoute, RenderMode } from '@angular/ssr';

export const TUTORIAL_SERVER_ROUTES: ServerRoute[] = [
  {
    path: 'handbooks',
    renderMode: RenderMode.Server, // SSR only (no prerender)
  },
  {
    path: 'handbooks/:id',
    renderMode: RenderMode.Server, // SSR only (no prerender)
  },
];
