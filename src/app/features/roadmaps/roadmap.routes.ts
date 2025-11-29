import { Routes } from '@angular/router';

export const ROADMAP_ROUTES: Routes = [
  {
    path: '',
    title: 'Roadmaps',
    loadComponent: () =>
      import('./layout/roadmap-layout/roadmap-layout.component').then(
        (m) => m.RoadmapLayoutComponent
      ),
    children: [
      {
        path: ':id',
        title: 'Roadmap Details',
        loadComponent: () =>
          import('./pages/roadmap-details/roadmap-details.component').then(
            (m) => m.RoadmapDetailsComponent
          ),
      },
    ],
  },
];
