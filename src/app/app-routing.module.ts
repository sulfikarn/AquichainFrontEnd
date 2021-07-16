import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthMiddleware } from './middleware/auth';

import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthLayoutComponent } from './layouts/body-layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/body-layout/admin-layout/admin-layout.component';

import { IaDashboardComponent } from './views/components/industry-admin/ia-dashboard/ia-dashboard.component';
import { IaAlertViewerComponent } from './views/components/industry-admin/ia-alert-viewer/ia-alert-viewer.component';
import { IaIndustryManagementComponent } from './views/components/industry-admin/ia-industry-management/ia-industry-management.component';
import { IaProductManagementComponent } from './views/components/industry-admin/ia-product-management/ia-product-management.component';

import { SiaDashboardComponent } from './views/components/sub-industry-admin/sia-dashboard/sia-dashboard.component';

import { SaDashboardComponent } from './views/components/super-admin/sa-dashboard/sa-dashboard.component';
import { SaSourceManagementComponent } from './views/components/super-admin/sa-source-management/sa-source-management.component';
import { SaUserManagementComponent } from './views/components/super-admin/sa-user-management/sa-user-management.component';
import { SaIndustryManagementComponent } from './views/components/super-admin/sa-industry-management/sa-industry-management.component';
import { SaAlertViewerComponent } from './views/components/super-admin/sa-alert-viewer/sa-alert-viewer.component';

import { PageNotFoundComponent } from './views/components/page-not-found/page-not-found.component';
import { ProfileComponent } from './views/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'sub-industry-admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SiaDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'industry-management', component: SiaDashboardComponent },
      { path: 'alerts', component: SiaDashboardComponent },
    ],
  },
  {
    path: 'industry-admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: IaDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'industry-management', component: IaIndustryManagementComponent },
      { path: 'product-management', component: IaProductManagementComponent },
      { path: 'alerts', component: IaAlertViewerComponent },
    ],
  },
  {
    path: 'super-admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SaDashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'source-management', component: SaSourceManagementComponent },
      { path: 'industry-management', component: SaIndustryManagementComponent },
      { path: 'user-management', component: SaUserManagementComponent },
      { path: 'alerts', component: SaAlertViewerComponent },
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
