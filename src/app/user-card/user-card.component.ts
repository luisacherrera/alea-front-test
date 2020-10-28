import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  showEditor: boolean = false;
  editForm = this._fb.group({
    name: ['', Validators.required],
    job: ['', Validators.required]
  })

  constructor(
    private _userService: UsersService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.length = 0;
  }

  showEdit() {
    this.showEditor = !this.showEditor;
  }

  editUser(id) {
    let editSubscription = this._userService.updateUser(id, this.editForm.value)
      .subscribe({
        next: (response:any) => {
          this.data.first_name = response.name;
        },
        error: (error:any) => {
          console.error(error);
        }
      });
    
    this.handleSubscriptions(editSubscription);
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
