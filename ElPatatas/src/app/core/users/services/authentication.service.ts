import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, catchError, finalize, tap } from "rxjs/operators";
import { User } from '../models/user';

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
                        return response;
                      }else{
                        throw new Error('Identifiants inconnus');
                      }                 
                    }
           )
      );
  }

  /**
   * vérifie si l'utilisateur est connecté
   */
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return token != null;
  }
}
