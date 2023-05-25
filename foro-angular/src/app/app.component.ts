import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements DoCheck {
  title = 'foro-angular';
public identity: any;
public tocken:any;
public url?:string;
public search?: string;

constructor(    
  private _userService: UserService,
  private _router:Router, 
  private _route:ActivatedRoute
  ){
this.loadUser();
this.url= global.url;
}

  ngDoCheck(){
    this.loadUser();
  
   
  }
  loadUser(){
    this.identity=this._userService.getIdentity();
    this.tocken=this._userService.getTocken();
  }

  logout(){    
    localStorage.clear();
    this.identity=null;
    this.tocken=null;
    this._router.navigate(['inicio']);
  }

  gosearch(){
    this._router.navigate(['/buscar', this.search]);
  }

}
