import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  subscriptions: Array<any>;

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
  ) { }

  onSubmit(): void {
    this.subscriptions = [
      this.subscriptionHandler()
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  subscriptionHandler(): Subscription {
    return this._authService.signup(this.signupForm.value)
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this._router.navigate([''])
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }
}
