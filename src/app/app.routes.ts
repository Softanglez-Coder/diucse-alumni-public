import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages').then(c => c.Home),
        title: 'Home - DIUCSE Alumni',
        pathMatch: 'full'
    },
    {
        path: 'portal',
        loadComponent: () => import('./pages').then(c => c.Portal),
        title: 'Portal - DIUCSE Alumni',
    },
];
