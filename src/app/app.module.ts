// import { SelectionModel } from '@angular/cdk/collections';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule,NgOption } from '@ng-select/ng-select';


// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {MatSelectModule} from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

// Import ng-circle-progress
import { AuthMiddleware } from './middleware/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Environment
import { environment } from '../environments/environment';
// App components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// View Components
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthLayoutComponent } from './layouts/body-layout/auth-layout/auth-layout.component';
import { PageNotFoundComponent } from './views/components/page-not-found/page-not-found.component';
import { IaDashboardComponent } from './views/components/industry-admin/ia-dashboard/ia-dashboard.component';
import { IaAlertViewerComponent } from './views/components/industry-admin/ia-alert-viewer/ia-alert-viewer.component';
import { IaIndustryManagementComponent } from './views/components/industry-admin/ia-industry-management/ia-industry-management.component';
import { IaProductManagementComponent } from './views/components/industry-admin/ia-product-management/ia-product-management.component';
import { SiaDashboardComponent } from './views/components/sub-industry-admin/sia-dashboard/sia-dashboard.component';
import { SaDashboardComponent } from './views/components/super-admin/sa-dashboard/sa-dashboard.component';
import { AdminLayoutComponent } from './layouts/body-layout/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layouts/header/admin-header/admin-header.component';
import { SaSourceManagementComponent } from './views/components/super-admin/sa-source-management/sa-source-management.component';
import { SaUserManagementComponent } from './views/components/super-admin/sa-user-management/sa-user-management.component';
import { SaIndustryManagementComponent } from './views/components/super-admin/sa-industry-management/sa-industry-management.component';
import { SaAlertViewerComponent } from './views/components/super-admin/sa-alert-viewer/sa-alert-viewer.component';
import { AdminSidebarComponent } from './layouts/sidebar/admin-sidebar/admin-sidebar.component';
import { SaTableRowExpansionComponent } from './views/modals/super-admin/sa-table-row-expansion/sa-table-row-expansion.component';
import { ProfileComponent } from './views/components/profile/profile.component';
import { SaCreateSourceManagementComponent } from './views/modals/super-admin/sa-create-source-management/sa-create-source-management.component';
import { IaAddSubIndustryComponent } from './views/modals/industry-admin/ia-add-sub-industry/ia-add-sub-industry.component';
import { IaAddProductComponent } from './views/modals/industry-admin/ia-add-product/ia-add-product.component'
import { IaTableRowExpansionComponent } from './views/modals/industry-admin/ia-table-row-expansion/ia-table-row-expansion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   AuthLayoutComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    IaDashboardComponent,
    IaAlertViewerComponent,
    IaIndustryManagementComponent,
    IaProductManagementComponent,
    SiaDashboardComponent,
    SaDashboardComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    SaSourceManagementComponent,
    SaUserManagementComponent,
    SaIndustryManagementComponent,
    SaAlertViewerComponent,
    AdminSidebarComponent,
    SaTableRowExpansionComponent,
    ProfileComponent,
    SaCreateSourceManagementComponent,
    IaAddSubIndustryComponent,
    IaAddProductComponent,
    IaTableRowExpansionComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapAPI,
    }),
    AgmDirectionModule,     // agm-direction
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgSelectModule,
    MatSelectModule,
    MatSelectFilterModule,
  ],
  entryComponents: [

    SaTableRowExpansionComponent,
    SaCreateSourceManagementComponent,
    IaTableRowExpansionComponent,
    IaAddSubIndustryComponent,
    IaAddProductComponent
],
  providers: [AuthMiddleware],
  bootstrap: [AppComponent],
})
export class AppModule { }
