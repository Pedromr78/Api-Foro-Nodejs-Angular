import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders } from './app.routing';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MomentModule } from 'angular2-moment';
import { PanelModule } from './panel/panel.module';
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UserGuard } from './services/user.guard';
import { NoUserGuard } from './services/noUser.guard';
import { UserService } from './services/user.service';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService,
    NoUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
