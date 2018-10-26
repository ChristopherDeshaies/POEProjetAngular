import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public ldapLoginCtrl: FormControl;
  public ldapPasswordCtrl: FormControl;
  public loginForm: FormGroup;
  usertag: string = "";

  constructor(
    private fb: FormBuilder,
    private authenticationService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ldapLoginCtrl = this.fb.control('', Validators.required);
    this.ldapPasswordCtrl = this.fb.control('', Validators.required);
    this.loginForm = this.fb.group({
      email: this.ldapLoginCtrl,
      password: this.ldapPasswordCtrl
    });
    this.logout();
  }

  login() {
    const ldapInformation = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
      return this.authenticationService.login(ldapInformation.email,ldapInformation.password).subscribe(  
      success => {
        if (JSON.parse(localStorage.getItem('user'))[0] != undefined) {  
          this.router.navigate(['commandes']); 
        }
      },
      error => console.log(error)
    )
  }

  logout() {    
    localStorage.removeItem('user');
  }

}
