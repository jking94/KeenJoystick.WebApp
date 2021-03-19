import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }

    this.signupForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          this.containsNumberValidator,
          this.minimumLengthValidator,
          this.containsSpecialCharacterValidator
        ]),
        confirmPassword: new FormControl('', Validators.required)
      },
      { validator: this.passwordMatchValidator }
    );
  }

  signupUser(){
    this.authService.signupUser(
      {
        email: this.signupForm.controls.email.value,
        password: this.signupForm.controls.password.value
      }
    ).subscribe((loginObj: any) => {
      this.authService.setToken(loginObj.value.token);
      this.router.navigate(['/']);
    });
  }

  containsNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const CONTAINS_NUMBER_REGEX: RegExp = /\d/;
    return CONTAINS_NUMBER_REGEX.test(control.value) ? null : { containsNumberError: true };
  }

  minimumLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value.length >= 8 ? null : { minimumLengthError : true };
  }

  containsSpecialCharacterValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const SPECIAL_CHARACTER_REGEX: RegExp = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g;
    return SPECIAL_CHARACTER_REGEX.test(control.value) ? null : { containsSpecialCharacterError: true };
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return password !== confirmPassword ? group.get('confirmPassword')?.setErrors({ passwordMatchError: true}) : null;
  }
}
