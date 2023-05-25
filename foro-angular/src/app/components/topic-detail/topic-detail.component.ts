import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';
import { Comment } from 'src/app/models/comment';
import { NgForm } from '@angular/forms';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {
  public status?: string;
  public topics: any;
  public page_title: string;
  public tocken?: string;
  public identity?: any;
  public topic: Topic;
  public comment: Comment;
  public comments: any;
  public url: any;
  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _commentService: CommentService
  ) {
    this.loadUser();
    this.page_title = 'Listado de todos los Temas';
    this.comment = new Comment('', '', '', '');
    this.topic = new Topic('', '', '', '', '', '', '', '');
    this.url= global.url;
  }

  ngOnInit() {
    this.loadUser();
    this.getTopic();
  }


  loadUser() {
    this.identity = this._userService.getIdentity();
    this.tocken = this._userService.getTocken();
  }


  getTopic() {

    this._route.params.subscribe((params: Params) => {

      this._topicService.getTopic(params['id']).subscribe({
        next: (data: any) => {

          if (data.status == 'success') {





            this.topic = data.topic;
            this.comments = data.topic.comments;

          } else {
            this.status = 'error';

          }
        },
        error: (err) => {
          console.log(err);
          this.status = 'error';

        }
      })
    })

  }


  onSubmit(form: NgForm) {
    this.comment.user=this.identity._id;
    this._commentService.add(this.tocken, this.topic._id, this.comment).subscribe({
      next: (data: any) => {

        if (data.status == 'success') {
          this.status = 'succes';
          this.getTopic();
          console.log(data)
          form.reset();



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
  delete(id:any){
    this._route.params.subscribe((params: Params) => {
      this._commentService.delete(this.tocken,params['id'],id).subscribe({
        next: (data: any) => {
          console.log(data)
          if (data.status == 'success') {
           
            this.getTopic();
            console.log(data)
            
  
  
  
          } else {
           
            console.log(data);
          }
        },
        error: (err) => {
          console.log(err);
         
  
        }
      })
    })
  }
}

