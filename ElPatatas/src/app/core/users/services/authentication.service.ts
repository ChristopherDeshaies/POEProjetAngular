import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

/**
 * url d'accès aux utilisateurs sur le server json
 */
const urlUser = "http://127.0.0.1:3000/users";

/**
 * vérifie si l'utilisateur est autorisé à se connecter
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
 * Gestion de l'authentification
 */
  protected authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User(0,'','','','','','','',''));

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * vérifie la présence du couple (email,password) sur le server json
   * l'utilisateur connecté est pour l'instant en localstorage, !! à changer: ce n'est pas une appli web
   * @param email 
   * @param password 
   * @returns un objet USER
   */
  login(email: string, password: string): Observable<User> {
    let params = new HttpParams().set('email', email).set('password', password);
    return this.httpClient.get<User>(`${urlUser}`, { params })
    .pipe(
        map(response => { 
                      if (response[0] != null) {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.authenticatedUser.next(response);                       
                        return response;
                      }else{
                        throw new Error('Identifiants inconnus');
                      }                 
                    }
           )
      );
  }

  /**
   * Déconnecte l'utilisateur logué
   */
  // public logout(): Observable<Response> {
  //   return service.httpclient.get(urlLogin)
  //     .pipe(
  //       map((response: Response) => {
  //         this.authenticatedUser.next(ANONYMOUS_USER);
  //         this.router.navigate(['/login']);
  //         return response;
  //       })
  //     );
  // }

  /**
   * Récupére l'utilsiteur connecté
   */
  public getAuthenticatedUser(): Observable<User> {
    return this.authenticatedUser;
  }

  /**
   * vérifie si l'utilisateur est connecté
   */
  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('user');
    // return token != null;
    let btrouve = false;
    this.getAuthenticatedUser().subscribe((data) => btrouve = (data != null));
    return (btrouve);
  }
}
