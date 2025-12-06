import { ServerRoute, RenderMode } from '@angular/ssr';

export const ADMIN_SERVER_ROUTES: ServerRoute[] = [
  {
    path: 'admin/tutorials',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
  {
    path: 'admin/tutorials/create',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
  {
    path: 'admin/tutorials/edit/:id',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
  {
    path: 'admin/courses',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
  {
    path: 'admin/courses/create',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
  {
    path: 'admin/courses/edit/:id',
    renderMode: RenderMode.Prerender, // SSR only (no prerender)
  },
];
