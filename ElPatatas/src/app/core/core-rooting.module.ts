import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { AdminComponent } from './users/components/admin/admin.component';
import { RoleGuardService } from '../core/users/services/role-guard.service';
import { AuthGuardService } from '../core/users/services/auth-guard.service';

const routes :Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'commandes',
    canActivate: [AuthGuardService],
    loadChildren: '../commandes/commandes.module#CommandesModule'
  },
  {
    path: 'admin',
    canActivate: [RoleGuardService],
    component: AdminComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class CoreRootingModule { }
