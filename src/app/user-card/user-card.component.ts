import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() data : any;
  @Output() deletedUser = new EventEmitter();
  subscriptions: Array<any> = [];

  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  editUser(id) {

  }
  
  deleteUser(id) {
    let deleteSubscription = this._userService.deleteUser(id)
      .subscribe({
        next: (response: any) => {
          this.deletedUser.emit(id);
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    this.handleSubscriptions(deleteSubscription);
  }

  handleSubscriptions(subs) {
    this.subscriptions.push(subs);
  }
}
