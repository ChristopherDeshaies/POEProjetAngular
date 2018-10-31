import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

/**
 * Gestion de la connexion des employés et des admins
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin : boolean=false;
  
  /**
   * variables de control du formulaire de connexion
   */
  public ldapLoginCtrl: FormControl;
  public ldapPasswordCtrl: FormControl;
  public loginForm: FormGroup;

  /**
   * @ignore
   * @param fb 
   * @param authenticationService 
   * @param router 
   */
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogin = false;
    this.ldapLoginCtrl = this.fb.control('', Validators.required);
    this.ldapPasswordCtrl = this.fb.control('', Validators.required);
    this.loginForm = this.fb.group({
      email: this.ldapLoginCtrl,
      password: this.ldapPasswordCtrl
    });
    this.logout();
  }

  /**
   * dirige vers la page admin pour un admin et la page prise de commandes pour les employés
   * en fonction du role de l'user 
   */
  login() {
      const ldapInformation = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      return this.authenticationService.login(ldapInformation.email,ldapInformation.password)
      .subscribe(  
        data => {
          if  (data[0] != undefined) {  
          if (data[0]['role'] == "employe"){
            this.router.navigate(['commandes']);
          }else{
            this.router.navigate(['admin']);
          } 
        }
      },
      error => console.log(error)
    )
  }

  /**
   * permet de se déconnecter, à changer plus tard!! ce n'est pas une appli web
   */
  logout() {    
    localStorage.removeItem('user');
  }

}
