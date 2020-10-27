import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users : Array<Object>;
  p: number = 1;

  constructor(
    private _userService : UsersService
  ) { }

  ngOnInit(): void {
    this._userService.getUsers()
      .subscribe((res)=>{
        this.users = res.data;
      })
  }
}
