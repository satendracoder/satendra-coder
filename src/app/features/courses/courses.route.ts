import { Routes } from '@angular/router';

export const Courses_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/course-layout/course-layout.component').then(
        (m) => m.CourseLayoutComponent
      ),

    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./components/courese-details/courese-details.component').then(
            (m) => m.CoureseDetailsComponent
          ),
      },
    ],
  },
];
