import{ Injectable } from '@angular/core';
import{ Router,ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';


@Injectable()

export class UserGuard {

    constructor(
        private _router: Router,
        private _userService: UserService
        ){

        }

        canActivate(){
            let identity= this._userService.getIdentity();
            if(identity){
                return true;
            }else{
                this._router.navigate(['/']);
                return false;
            }          
        }
}