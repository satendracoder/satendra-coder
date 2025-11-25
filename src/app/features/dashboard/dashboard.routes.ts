import { Routes } from '@angular/router';

export const Dashboard_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/dashboard-layout/dashboard-layout').then(
        (dash) => dash.DashboardLayout
      ),
    children: [
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./components/user-profile/user-profile.component').then(
            (profile) => profile.UserProfileComponent
          ),
      },
    ],
  },
];
