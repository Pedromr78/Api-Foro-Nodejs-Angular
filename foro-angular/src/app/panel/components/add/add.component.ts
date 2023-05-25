import { Component,OnInit,DoCheck } from '@angular/core';
import{Router,ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements DoCheck {
public page_title?: string;
public topic :Topic;
public identity: any;
public tocken: any;
public status?: string;

constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _topicService:TopicService
){
  this.page_title= 'Crear Tema';
  this.topic= new Topic('','','','','','',this.identity,null);
}


ngDoCheck(){
  this.loadUser()
}
onSubmit( form:NgForm){
  console.log(this.topic)
this._topicService.addTopic(this.tocken,this.topic).subscribe({
  next: (data:any) => {
   if(data.status=='succes'){
    console.log(data)
    this.status='succes';
    this.topic= data.topicStored;
    this._router.navigate(['/panel'])
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
loadUser(){
  this.identity=this._userService.getIdentity();
  this.tocken=this._userService.getTocken();
}
}
