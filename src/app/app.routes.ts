import { Routes } from '@angular/router';
import { IndexPage } from './pages/home/index-page/index-page';
import { adminGuard } from './admin/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: IndexPage,
  },

  // Auth Routes is lazy loaded
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((auth) => auth.AUTH_ROUTES),
  },

  // Admin Routes is lazy loaded
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin/admin.routes').then((admin) => admin.Admin_ROUTES),
  //   canActivate: [adminGuard],
  //   data: { roles: ['MASTER', 'ADMIN', 'STAFF'] },
  // },

  // Compiler Routes is lazy loaded
  {
    path: 'compiler',
    loadChildren: () =>
      import('./features/compiler/compiler.routes').then(
        (compiler) => compiler.Compiler_ROUTES
      ),
  },

  // Compiler Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (compiler) => compiler.Dashboard_ROUTES
      ),
  },

  // DevTools Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/dev-tool/tools.routes').then(
        (tools) => tools.TOOLS_ROUTES
      ),
  },

  // NPM Package Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/npm-package/npm.routes').then((npm) => npm.NPM_ROUTES),
  },

  // VSCODE_ROUTES Routes is lazy loaded
  {
    path: 'vscode',
    loadChildren: () =>
      import('./features/vscode-extension/vscode.routes').then(
        (vscode) => vscode.VSCODE_ROUTES
      ),
  },

  // BROWSER_ROUTES Package Routes is lazy loaded
  {
    path: 'browser',
    loadChildren: () =>
      import('./features/browser-extension/browser.routes').then(
        (browser) => browser.BROWSER_ROUTES
      ),
  },

  // Blog Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((blog) => blog.BLOG_ROUTES),
  },

  // e-Book Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/ebook/ebook.routes').then(
        (ebook) => ebook.EBOOK_ROUTES
      ),
  },

  // ROADMAP_ROUTES Package Routes is lazy loaded
  {
    path: 'roadmap',
    loadChildren: () =>
      import('./features/roadmaps/roadmap.routes').then(
        (roadmap) => roadmap.ROADMAP_ROUTES
      ),
  },

  // MENTORSHIP_ROUTES Package Routes is lazy loaded
  {
    path: 'mentorship',
    loadChildren: () =>
      import('./features/mentorship/mentorship.routes').then(
        (mentorship) => mentorship.MENTORSHIP_ROUTES
      ),
  },

  //Company is lazy loaded
  {
    path: '',
    loadComponent: () =>
      import('./layout/about-layout/about-layout').then(
        (layout) => layout.AboutLayout
      ),
    children: [
      //@_about-us routes
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/c-about-us/c-about-us').then(
            (company) => company.CAboutUs
          ),
      },
      //@_about-us routes
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/about/contact-us/contact-us.component').then(
            (company) => company.ContactUsComponent
          ),
      },
      //@_pricing-policy routes
      {
        path: 'pricing-policy',
        loadComponent: () =>
          import('./pages/about/c-pricing-policy/c-pricing-policy').then(
            (company) => company.CPricingPolicy
          ),
      },
      //@_privacy-policy routes
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/about/c-privacy-policy/c-privacy-policy').then(
            (company) => company.CPrivacyPolicy
          ),
      },
      //@_terms-and-conditions routes
      {
        path: 'terms-and-conditions',
        loadComponent: () =>
          import('./pages/about/c-terms/c-terms').then(
            (company) => company.CTerms
          ),
      },
      //@_donate routes
      {
        path: 'donate',
        loadComponent: () =>
          import('./pages/about/c-donate/c-donate').then(
            (company) => company.CDonate
          ),
      },
      //@_donate routes
      {
        path: 'community',
        loadComponent: () =>
          import('./pages/about/community-page/community-page').then(
            (company) => company.CommunityPage
          ),
      },
    ],
  },
  //@_ask-me-anything routes
  {
    path: 'invite-satendra',
    loadComponent: () =>
      import('./shared/components/other/ask-me-anything/ask-me-anything').then(
        (company) => company.AskMeAnything
      ),
  },
  //@_Become to Membars
  {
    path: 'become-a-member',
    loadComponent: () =>
      import('./shared/components/other/become-member/become-member').then(
        (become) => become.BecomeMember
      ),
  },

  // Kids Routes is lazy loaded
  {
    path: 'kids',
    loadChildren: () =>
      import('./features/kids/kids.routes').then((kids) => kids.KIDS_ROUTES),
  },

  // Tutorial Routes is lazy loaded
  {
    path: '',
    loadChildren: () =>
      import('./features/grow-learning/tutorials/tutorial.routes').then(
        (tutorial) => tutorial.TUTORIAL_ROUTES
      ),
  },

  // Core Subjects Routes is lazy loaded
  {
    path: 'subjects',
    loadChildren: () =>
      import('./features/grow-learning/core-subjects/subjects.routes').then(
        (subjects) => subjects.SUBJECTS_ROUTES
      ),
  },

  // Interview Routes is lazy loaded
  {
    path: 'interview',
    loadChildren: () =>
      import('./features/grow-learning/interview/interview.routes').then(
        (interview) => interview.INTERVIEW_ROUTES
      ),
  },

  // Interview Routes is lazy loaded
  {
    path: 'quiz',
    loadChildren: () =>
      import('./features/grow-learning/quizzes/quizzes.routes').then(
        (quizzes) => quizzes.QUIZZES_ROUTES
      ),
  },
];
