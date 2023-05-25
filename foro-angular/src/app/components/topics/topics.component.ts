import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService, UserService]
})
export class TopicsComponent implements OnInit {
  public status?: string;
  public topics: any;
  public page_title: string;
  public tocken?: string;
  public identity?: any;

  public totalPages:any;
  public pages:any;
  public next_page:any;
  public prev_page:any;
  public number_pages:any;


  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _router: Router,
    private _route:ActivatedRoute
  ) {
    this.page_title = 'Listado de todos los Temas';
    this.loadUser();
  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      var page = +params['page'];
      if(!page || page==null || page== undefined){
        page=1;
        this.prev_page=1;
        this.next_page=2;
      }

      this.getTopics(page);
    })

  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe({
      next: (data: any) => {
        if(data.status=='succes'){
        this.status = 'succes'
      
        this.topics = data.topics;
        this.totalPages= data.totalPages

        var number_pages = [];
        for(var i =1; i<= this.totalPages; i++){
          number_pages.push(i);
        }
        this.number_pages= number_pages;

        if(page >= 2){
          this.prev_page= page-1;
        }else{
          this.prev_page= 1;
        }
        if(page< this.totalPages){
          this.next_page= page+1
        }else{
          this.next_page= this.totalPages;
        }
      }else{
        this.status='error';
      }
      },
      error: (err) => {
        console.log(err)
        this.status = 'error';
      }
    })
  }
  loadUser() {
    this.identity = this._userService.getIdentity();
    this.tocken = this._userService.getTocken();
  }


}
