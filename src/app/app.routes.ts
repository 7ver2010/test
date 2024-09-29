import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: '/pages/1', pathMatch: 'full' },
  {
    path: 'pages/:id',
    loadComponent: () =>
      import('@components/pages/pages.component').then((m) => m.PagesComponent),
  }
];
