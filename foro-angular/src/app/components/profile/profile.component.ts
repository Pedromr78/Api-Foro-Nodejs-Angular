import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from 'src/app/services/global';
import { TopicService } from 'src/app/services/topic.service';
import { Topic } from 'src/app/models/topic';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {


  public user: User;
  public topics?: Topic[];
  public url: string;
  public page_title?: string;



  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router:Router, 
    private _route:ActivatedRoute
  ) {
    this.url = global.url;
    this.page_title = 'Perfil';
    this.user= new User('','','','','','','')
  }


ngOnInit(){
  this._route.params.subscribe(params => {
    
    this.getUser(params['id']);
    this.getTopicsByUser(params['id']);
    // console.log(this.user);
    // console.log(this.topics)
  })

}

  getUser(userId:any){
    this._userService.getUser(userId).subscribe({
      next: (data:any) => {
       
        if(data.status=='success'){
         console.log(data)
        
         this.user=data.user;
        
        }else{
          console.log('error');
        }
       },
       error: (err) => {
         console.log(err);
        
        }
    })
  }
  getTopicsByUser(userId:any) {
    // console.log(this.identity)
    this._topicService.getTopicsByUser(userId).subscribe({
      next: (data:any) => {
       
        if(data.status=='success'){
         
        console.log(data)
         this.topics=data.topics;
        
        }else{
          console.log('error');
        }
       },
       error: (err) => {
         console.log(err);
        
        }
    })
  }

}
