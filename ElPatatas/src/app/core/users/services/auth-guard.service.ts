import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * intercept les url pour vérifier si les utilisateurs sont connectés
 * renvoie au login sinon
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public auth: AuthenticationService, 
    public router: Router
  ) { }

  /**
   * vérifie si l'utilisateur est authentifié
   */
  canActivate(): boolean {
    if (!this.auth.authenticatedUser.value) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
