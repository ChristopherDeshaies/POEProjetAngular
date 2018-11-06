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
    isAdmin : boolean= false;

    constructor(
      private authentication: AuthenticationService,
      private router: Router
      ) { }

    ngOnInit() {
      this.authentication.getAuthenticatedUser()
      .subscribe((data:User) => {this.user = data;
        try{
          if (this.user != null){
            this.nomUtilisateur = this.user[0]['nom'];
            this.prenomUtilisateur = this.user[0]['prenom'];
            this.isLogin = true;
            if (this.user[0]['role']=="admin"){
              this.isAdmin=true;
            }else{
              this.isAdmin=false;
            }
          }else{
            this.isLogin = false;
          }
        }catch(e) {
          console.log(e);
          this.router.navigate(['/login']) 
        }}
          );
    }

    /**
   * permet de se déconnecter, à changer plus tard!! ce n'est pas une appli web
   */
    logout() {    
      localStorage.removeItem('user');
      this.isLogin = false;
      this.isAdmin=false;
      this.authentication.logout().subscribe();
    }

    // login() {    
    //   localStorage.removeItem('user');
    //   //this.authentication.next(null);
    //   this.isLogin = false;
    //   this.router.navigate(['/login']);
    // }

    navigateCompta() {
      this.router.navigate(['/comptabilite']);
    }
  
    navigateStocks() {
      this.router.navigate(['/stocks']);
    }
  
    navigateEmployes() {
      this.router.navigate(['/employes']);
    }
  
    navigateCommandes() {
      this.router.navigate(['/commandes']);
    }

    navigatePlanning() {
      this.router.navigate(['/planning']);
    }
}
