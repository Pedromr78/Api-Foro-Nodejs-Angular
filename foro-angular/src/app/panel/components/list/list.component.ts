import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {
  public page_title?: string;
  public topic: Topic;
  public identity: any;
  public tocken: any;
  public status?: string;

  public topics:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Mis Temas';
    this.topic = new Topic('', '', '', '', '', '', this.identity, null);
 
  }
  ngOnInit() {
    this.loadUser();
    this.getTopicsByUser(); 
  }
 

  getTopicsByUser() {
    // console.log(this.identity)
    this._topicService.getTopicsByUser(this.identity._id).subscribe({
      next: (data:any) => {
       
        if(data.status=='success'){
         
         this.status='succes';
         this.topics=data.topics;
        
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

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.tocken = this._userService.getTocken();
  }
  deleteTopic(id:number){
    this._topicService.delete(id,this.tocken).subscribe({
      next: (data:any) => {
        
        if(data.status=='success'){
         
         this.status='succes';
         this.getTopicsByUser(); 
        
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
