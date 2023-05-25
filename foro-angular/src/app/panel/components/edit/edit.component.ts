import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Form, NgForm } from '@angular/forms';

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {
  public page_title?: string;
  public topic: Topic;
  public identity: any;
  public tocken: any;
  public status?: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Editar Tema';
    this.topic = new Topic('', '', '', '', '', '', this.identity, null);
  }

  ngOnInit(): void {
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

          } else {
            this.status = 'error';
            this._router.navigate(['/panel'])
          }
        },
        error: (err) => {
          console.log(err);
          this.status = 'error';

        }
      })
    })

  }
  onSubmit(form: Form) {
    console.log(this.topic)

    this._topicService.update(this.tocken, this.topic._id, this.topic).subscribe({
      next: (data: any) => {
        console.log(data)
        if (data.status == 'success') {
          this.status = 'succes';
          this.topic = data.topicUpdated;
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

}
