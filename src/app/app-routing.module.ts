import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonUserGuard } from './anon-user.guard';
import { AuthUserGuard } from './auth-user.guard';
import { AuthService } from './auth.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [ AnonUserGuard ] },
  { path: 'signup', component: SignupComponent, canActivate: [ AnonUserGuard ] },
  { path: 'users', component: UsersListComponent, canActivate: [ AuthUserGuard ] },
  { path: 'create', component: CreateUserComponent, canActivate: [ AuthUserGuard ] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthUserGuard, AnonUserGuard]
})
export class AppRoutingModule { }
