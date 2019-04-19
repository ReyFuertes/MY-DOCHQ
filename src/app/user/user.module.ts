/**
 * Global
 **/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { UserRoutingModule } from './user-routing.module';

/**
 * Services
 **/
import { UserService } from './user.service';
import { JwtInterceptor } from '../global/jwt.interceptor';
import { AuthGuard } from '../global/auth.guard';

/**
 * Components
 **/
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpsertUserComponent } from './upsert-user/upsert-user.component';
import { OverviewUserComponent } from './overview-user/overview-user.component';
import { ViewComponent } from './view/view.component';

import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatOptionModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    HttpClientModule,
    HttpModule,
    UserRoutingModule,
    /** Material Design imports (Start) **/
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
    /** Material Design imports (End) **/
  ],
  exports: [],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ListUsersComponent,
    UpsertUserComponent,
    OverviewUserComponent,
    ViewComponent,
  ],
  providers: [
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
})
export class UserModule { }
