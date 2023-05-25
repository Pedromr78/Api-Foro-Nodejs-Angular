import{ Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
public url?:string;
public identity:any;
public tocken:any;

constructor(
    private _http: HttpClient,
){
this.url= global.url;
}

register(user:any): Observable<any>{


    let params=JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
                                  
    return this._http.post(this.url + 'register', params, { headers: headers });        

}

login(user:any, gettoken = false):Observable<any>{
    if (gettoken == true) {
        user.gettoken = true;
    }
 
    let params=JSON.stringify(user);
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, { headers: headers });        
}
getIdentity() {
    let json= localStorage.getItem('identity')
    //Hay que comprobar que sea true por que no aceota posibles nulls
    let identity = json != null ? JSON.parse(json) : null;

    if (identity && identity != null) {
        
        this.identity = identity;
    } else {
        this.identity = null;
    }

    return this.identity;
}
getTocken() {
    let tocken = localStorage.getItem('tocken');
    if (!tocken && tocken == 'undefined') {
       
        this.tocken = null;
    } else {
        this.tocken = tocken;
    }
    return this.tocken;
}
update(user: User):Observable <any> {
    let params=JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getTocken());
    return this._http.put(this.url + 'update', params, { headers: headers });   
}
getUsers(): Observable<any>{
    return this._http.get(this.url + 'users');  
}
getUser(userId:any): Observable<any>{
    return this._http.get(this.url + 'user/'+userId);  
}
}