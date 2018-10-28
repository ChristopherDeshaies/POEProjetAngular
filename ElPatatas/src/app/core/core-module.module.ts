import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './users/services/authentication.service';
import { RouterModule } from '@angular/router';
import { CoreRootingModule } from './core-rooting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
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
    FormsModule
  ],
  declarations: [
    LoginComponent,
    AdminComponent,
    EmployesComponent
  ],
  providers: [AuthenticationService],
})
export class CoreModule { }
