import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users/users.service';
import { RouterModule } from '@angular/router';
import { CoreRootingModule } from './core-rooting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { LoginComponent } from '../core/users/components/login/login.component';
import { AdminComponent } from '../core/users/components/admin/admin.component';
import { EmployesComponent } from '../core/users/components/employes/employes.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRootingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,

  ],
  exports : [
    LoginComponent,
    RouterModule,
    AdminComponent,
    EmployesComponent,
  ],
  declarations: [
    LoginComponent,
    AdminComponent,
    EmployesComponent
  ],
  providers: [UsersService],
})
export class CoreModule { }
