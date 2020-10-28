import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user : boolean = false;

  constructor(
    private _authService : AuthService
  ) {}

  onActivate(component) {
    this.user = this._authService.isLoggedIn();
  }

  logOff() {
    localStorage.removeItem('token');
  }
}
