import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() userLogged: EventEmitter<any> = new EventEmitter();

  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  subscriptions: Array<any> = [];

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
  ) { }

  onSubmit(): void {
    this.subscriptions.push(this.subscriptionHandler());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  subscriptionHandler(): Subscription {
    return this._authService.login(this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this._router.navigate(['/users']);
          this.userLogged.emit();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
  }
}
