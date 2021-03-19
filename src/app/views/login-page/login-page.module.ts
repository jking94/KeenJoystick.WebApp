// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// App
import { LoginPageComponent } from './login-page.component';
import { loginPageRoutes } from './login-page.routing';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginPageRoutes)
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
