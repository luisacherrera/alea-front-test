import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users : Array<any>;
  p: number = 1;
  subscriptions: Array<any>;

  constructor(
    private _userService : UsersService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.subscribeUserService()
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.length = 0;
  }

  subscribeUserService(): Subscription {
    return this._userService.getUsers()
      .subscribe((res)=>{
        this.users = res.data;
      })
  }

  removeElement(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.users.splice(i, 1);
      }
    }
  }
}
