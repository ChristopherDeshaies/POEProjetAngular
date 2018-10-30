import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../users/services/authentication.service';
import { User } from '../../users/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user : User;
    nomUtilisateur : string;
    prenomUtilisateur : string;
    isLogin : boolean=false;

    constructor(
      private authentication: AuthenticationService,
      private router: Router
      ) { }

    ngOnInit() {
      this.authentication.getAuthenticatedUser()
      .subscribe((data:User) => {this.user = data;
        try{
          this.nomUtilisateur = this.user[0]['nom'];
          this.prenomUtilisateur = this.user[0]['prenom'];
          if (this.user != null){
            this.isLogin = true;
          }
        }catch(e) {
          console.log(e);
        }}
          );
    }

    /**
   * permet de se déconnecter, à changer plus tard!! ce n'est pas une appli web
   */
    logout() {    
      localStorage.removeItem('user');
      //this.authentication.next(null);
      this.isLogin = false;
      this.router.navigate(['/login']);
    }

}
