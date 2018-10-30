import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * intercept les routes pour vérifier le role de l'utilisateur.
 * ne sont autorisées ques les admin
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    /**
     * récupération de l'user enregistré en local storage, à changer !!! ce n'est pas une appli web
     */
    const token = JSON.parse(localStorage.getItem('user'))[0]['role'];
   
    if (
      !this.auth.isAuthenticated() || 
      token !== "admin"
      
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
