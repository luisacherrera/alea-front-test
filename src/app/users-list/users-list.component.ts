import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users : Array<Object>;
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
}
