import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string
  public user: User;
  public status: any;
  public identity: any;
  public tocken: any;

  constructor(
    private _userService: UserService,
    private _router:Router, 
    private _route:ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE.USER');
  }

  ngOnInit(): void {

  }
  onSubmit(form: NgForm) {
    this._userService.login(this.user).subscribe({
      next: (data: any) => {
        if (data.status == 'success' && data.user) {
          this.status = 'success';
          this.identity = data.user;

      
          this._userService.login(this.user, true).subscribe({

            next: (data: any) => {
              if(data.tocken){
               this.status='success';
              this.tocken= data.tocken;
              
                 //PERSISTO LOS DATOS
              //Para guardarlolos datos en  en el storage para poder llevarme los datos a otras url como posts
              localStorage.setItem('tocken', this.tocken);
              //Local storage solo puede tener string o numerico
              localStorage.setItem('identity', JSON.stringify(this.identity));

              form.reset();
              this._router.navigate(['inicio']);


              }else{
               this.status='error';
              }

            },
            error: (err) => {
              console.log(err);
              this.status = 'error';
            }

          })



        } else {
          this.status = 'error';
        }

      },
      error: (err) => {
        console.log(err);
        this.status = 'error';
      }
    })

  }

}
