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
import { SignupPageComponent } from './signup-page.component';
import { signupPageRoutes } from '../signup-page/signup-page.routing';



@NgModule({
  declarations: [
    SignupPageComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(signupPageRoutes)
  ],
  exports: [
    SignupPageComponent
  ]
})
export class SignupPageModule { }
