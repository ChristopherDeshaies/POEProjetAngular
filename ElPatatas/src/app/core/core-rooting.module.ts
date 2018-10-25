import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { UsersService } from './users/users.service';

const routes :Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [UsersService],
    component: LoginComponent
  },
  {
    path: 'commandes',
    loadChildren: '../commandes/commmandes.module#CommandesModule'
    // canActivate: [UsersService],
    // component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class CoreRootingModule { }
