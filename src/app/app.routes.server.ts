import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_SERVER_ROUTES } from './features/blog/blog.routes.server';
import { TUTORIAL_SERVER_ROUTES } from './features/grow-learning/tutorials/tutorial.routes.server';
import { ADMIN_SERVER_ROUTES } from './admin/admin.routes.server';
import { ROADMAP_SERVER_ROUTES } from './features/roadmaps/roadmap.routes.server';
import { COURSES_SERVER_ROUTES } from './features/courses/courses.routes.server';

export const serverRoutes: ServerRoute[] = [
  ...BLOG_SERVER_ROUTES,
  ...TUTORIAL_SERVER_ROUTES,
  ...ADMIN_SERVER_ROUTES,
  ...ROADMAP_SERVER_ROUTES,
  ...COURSES_SERVER_ROUTES,
  ...ADMIN_SERVER_ROUTES,

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
