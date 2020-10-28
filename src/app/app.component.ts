import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user : boolean = false;

  constructor(
    private _authService : AuthService,
    private _router: Router
  ) {}

  onActivate(component) {
    this.user = this._authService.isLoggedIn();
  }

  logOff() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
