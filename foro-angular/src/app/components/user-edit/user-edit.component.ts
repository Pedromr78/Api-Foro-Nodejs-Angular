import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit, DoCheck {
  public page_title: any;
  public user: User;
  public identity: any;
  public tocken: any;
  public status?: string;
  public afuConfig: any;
  public url?: string;

  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Ajustes';
    this.url = global.url;
    this.identity = this._UserService.getIdentity();
    this.tocken = this._UserService.getTocken();
    this.user = new User(this.identity._id, this.identity.name, this.identity.surname, this.identity.email, '', this.identity.image, 'ROLE_USER');


    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: 1,
      uploadAPI: {
        url: this.url + 'upload',

        headers: {
          "Authorization": this.tocken
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: true,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu avatar',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }

    };

  }


  ngOnInit() {

  }
  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._UserService.getIdentity();
    this.tocken = this._UserService.getTocken();
  }

  avatarUpload(data: any) {
    this.user.image = data.body.user.image;

    localStorage.setItem('identity', JSON.stringify(this.user));
  }

  onSubmit(form: NgForm) {

    this._UserService.update(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.status == 'success' && data.user) {
          console.log(data)
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));

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
