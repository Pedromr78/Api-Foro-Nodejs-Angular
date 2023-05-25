import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users?: User[];
  public url: string;
  public page_title?:string;
  constructor(
    private _userService: UserService
  ) {
    this.url = global.url;
    this.page_title ='Usuarios'
  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers().subscribe({
      next: (data: any) => {
        console.log(data)
        this.users = data.users;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
