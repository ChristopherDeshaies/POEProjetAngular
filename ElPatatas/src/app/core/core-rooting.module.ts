import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/components/login/login.component';
import { AdminComponent } from './users/components/admin/admin.component';
import { EmployesComponent } from './users/components/employes/employes.component';
import { RoleGuardService } from '../core/users/services/role-guard.service';
import { AuthGuardService } from '../core/users/services/auth-guard.service';

const routes: Routes = [
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
  {
    path: 'comptabilite',
    canActivate: [RoleGuardService],
    loadChildren: '../comptabilite/comptabilite.module#ComptabiliteModule' 
  },
  {
    path: 'stocks',
    canActivate: [RoleGuardService],
    loadChildren: '../gestionstocks/gestionstocks.module#GestionstocksModule'
  },
  {
    path: 'planning',
    canActivate: [RoleGuardService],
    loadChildren: '../planning/planning.module#PlanningModule'
  },
  {
    path: 'employes',
    canActivate: [RoleGuardService],
    component: EmployesComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRootingModule { }
