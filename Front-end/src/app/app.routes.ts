import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './register/register';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    {path: 'register', component: Register},
    {path: '**', redirectTo: '', pathMatch: 'full' } 
];
