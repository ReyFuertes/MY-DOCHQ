import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../global/auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpsertUserComponent } from './upsert-user/upsert-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import {ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'add', component: UpsertUserComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: UpsertUserComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: ViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
