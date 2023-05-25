import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import{ inject } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';


import { UserGuard } from './services/user.guard';
import { NoUserGuard } from './services/noUser.guard';

const appRoutes: Routes= [
    {path: '', component:HomeComponent},
    {path: 'inicio', component:HomeComponent},
    {path: 'perfil/:id', component:ProfileComponent},
    {path: 'usuarios', component:UsersComponent},
    {path: 'login', component:LoginComponent,canActivate: [() => inject(NoUserGuard).canActivate()]},
    {path: 'ajustes', component:UserEditComponent, canActivate: [() => inject(UserGuard).canActivate()]},
    {path: 'registro', component:RegisterComponent,canActivate: [() => inject(NoUserGuard).canActivate()]},
    {path: 'temas', component:TopicsComponent},
    {path: 'temas/:page', component:TopicsComponent},
    {path: 'tema/:id', component:TopicDetailComponent},
    {path: 'buscar/:search', component:SearchComponent},
    {path: '**', component:HomeComponent}
];



export const appRoutingProviders: any[]=[];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);