import { ServerRoute, RenderMode } from '@angular/ssr';

export const COURSES_SERVER_ROUTES: ServerRoute[] = [
  {
    path: 'courses',
    renderMode: RenderMode.Server, // SSR only (no prerender)
  },
  {
    path: 'courses/:id',
    renderMode: RenderMode.Server, // SSR only (no prerender)
  },
];
