import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterParentComponent } from './pages/register-parent/register-parent.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParentDashboardComponent } from './pages/parent-dashboard/parent-dashboard.component';
import { PrincipalDashboardComponent } from './pages/principal-dashboard/principal-dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Principal-dashboard', loadComponent: () => import('./pages/principal-dashboard/principal-dashboard.component').then(m => m.PrincipalDashboardComponent), canActivate: [AuthGuard] },
  { path: 'parent-dashboard', loadComponent: () => import('./pages/parent-dashboard/parent-dashboard.component').then(m => m.ParentDashboardComponent), canActivate: [AuthGuard] },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register-parent', loadComponent: () => import('./pages/register-parent/register-parent.component').then(m => m.RegisterParentComponent) },
  { path: 'pending-approval', loadComponent: () => import('./pages/pending-approval/pending-approval.component').then(m => m.PendingApprovalComponent) },
  { path: 'register-completed', loadComponent: () => import('./pages/registration-completed/registration-completed.component').then(m => m.RegistrationCompletedComponent) },
  { path: '**', redirectTo: 'register' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
