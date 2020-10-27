import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._authService.login(this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
  }
}
