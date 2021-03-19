// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { AuthenticationGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/views/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule),
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('../app/views/login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('../app/views/signup-page/signup-page.module').then(m => m.SignupPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
