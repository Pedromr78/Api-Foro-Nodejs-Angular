import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService, UserService]
})
export class SearchComponent {
  public status?: string;
  public topics: any;
  public page_title: string;
  public tocken?: string;
  public identity?: any;



  constructor(
    private _topicService: TopicService,
    private _userService: UserService,
    private _router: Router,
    private _route:ActivatedRoute
  ) {
    this.page_title = 'Resultados de Busqueda ';
    this.loadUser();
  }

  ngOnInit() {
    this._route.params.subscribe(params=>{
      this.getSearch(params['search']);
    })
  
  
  }

  getSearch(search:string){
    this._topicService.search(search).subscribe({
      next:(data:any)=>{
      
        if(data.status=='success'){
          this.page_title = 'Resultados de Busqueda ';
          this.page_title = this.page_title + '"'+ search + '"';
          this.topics=data.topics;
        }else{
          console.log('error');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.tocken = this._userService.getTocken();
  }
}
