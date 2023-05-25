import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { global } from './global';

@Injectable()

export class CommentService {
    public url?: string;
    public identity: any;
    public tocken: any;

    constructor(
        private _http: HttpClient,
    ) {
        this.url = global.url;
    }
    add(tocken: any, topicId:any, comment:Comment): Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', tocken);
        return this._http.post(this.url + 'comment/'+topicId, params, { headers: headers });
    }
    delete(tocken: any, topicId:any, commentId:any): Observable<any> {
     
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', tocken);
        return this._http.delete(this.url + 'comment/'+topicId+'/'+commentId, { headers: headers });
    }

}