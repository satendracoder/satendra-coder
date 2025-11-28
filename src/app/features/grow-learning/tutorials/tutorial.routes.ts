import { Routes } from '@angular/router';

export const TUTORIAL_ROUTES: Routes = [
  {
    path: 'handbooks',
    loadComponent: () =>
      import('./layout/tutorial-layout/tutorial-layout').then(
        (m) => m.TutorialLayout
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./layout/tutorial-details/tutorial-details').then(
            (m) => m.TutorialDetails
          ),
      },
    ],
  },
];
