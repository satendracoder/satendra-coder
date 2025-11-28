import { Routes } from '@angular/router';

export const KIDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/kids-layout/kids-layout').then((m) => m.KidsLayout),
    // children: [],
  },
];
