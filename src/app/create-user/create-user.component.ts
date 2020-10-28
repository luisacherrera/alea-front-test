import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  createForm = this._fb.group({
    name: '',
    job: ''
  });
  subscriptions: Array<any> = [];
  successCreate: boolean = false;

  constructor(
    private _userService: UsersService,
    private _fb: FormBuilder
  ) { }

  onSubmit(): void {
    this.subscriptions.push(this.subscriptionHandler());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  subscriptionHandler(): Subscription {
    return this._userService.createUser(this.createForm.value)
      .subscribe({
        next: (response: any) => {
          this.successCreate = true;
          setTimeout(()=>{this.successCreate = false}, 3000);
        },
        error: (error: any) => {
          console.error(error);
        }
      })
  }
}
