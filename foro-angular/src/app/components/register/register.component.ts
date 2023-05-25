import { Component,OnInit } from '@angular/core';
import{ User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
 public page_title: string;
public user:User;
public status: any;

constructor(
  private _userService: UserService
){
this.page_title='Registrate';
this.user = new User('','','','','','','ROLE.USER');


}


  ngOnInit(){
    
  }

  onSubmit(form: NgForm): void {
   this._userService.register(this.user).subscribe({
    next: (data:any) => {
     if(data.status=='success' && data.user){
      this.status='success';
      form.reset();
      console.log(data);
     }else{
      this.status='error';
     }
   
    },
    error: (err) => {
     console.log(err);
     this.status='error';
    }
  }) 
}

}
