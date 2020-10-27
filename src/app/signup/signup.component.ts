import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm = this._fb.group({
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
    this._authService.signup(this.signupForm.value)
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
