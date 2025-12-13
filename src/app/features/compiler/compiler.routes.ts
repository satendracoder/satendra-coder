import { Routes } from '@angular/router';

export const Compiler_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/compiler-layout/compiler-layout').then(
        (cl) => cl.CompilerLayout
      ),
    children: [
      {
        path: 'javascript-compiler',
        loadComponent: () =>
          import(
            './pages/javascript-compiler/javascript-compiler.component'
          ).then((jscom) => jscom.JavascriptCompilerComponent),
      },

      {
        path: 'typescript-compiler',
        loadComponent: () =>
          import('./pages/ts-compiler/typescript-compiler.component').then(
            (tscom) => tscom.TypescriptCompilerComponent
          ),
      },

      {
        path: 'python-compiler',
        loadComponent: () =>
          import('./pages/python-compiler/python-compiler.component').then(
            (pycom) => pycom.PythonCompilerComponent
          ),
      },
      {
        path: 'cpp-compiler',
        loadComponent: () =>
          import('./pages/cpp-compiler/cpp-compiler.component').then(
            (cppcom) => cppcom.CppCompilerComponent
          ),
      },

      {
        path: 'go-compiler',
        loadComponent: () =>
          import('./pages/go-compiler/go-compiler.component').then(
            (gocom) => gocom.GoCompilerComponent
          ),
      },
    ],
  },
];
