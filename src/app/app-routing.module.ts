import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Pages - Components
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

//Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'home'    , component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login'   , component: LoginComponent },
  { path: 'forgot-password'   , component: ForgotPasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
