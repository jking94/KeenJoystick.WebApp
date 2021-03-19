import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/types/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required)
      }
    );
  }

  loginUser(){
    this.authService.loginUser(this.loginForm.value)
    .pipe(
      filter(Boolean)
    ).subscribe((loginObj: any) => {
      this.authService.setToken(loginObj.token);
      this.router.navigate(['/']);
    });
  }
}
