import { Routes } from '@angular/router';

export const AppRoutes: Routes = [{
    path: 'list',
    loadComponent: () => import('./list/list.component'),
}];