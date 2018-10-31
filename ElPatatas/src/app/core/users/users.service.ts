import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";

const urlUser = "http://127.0.0.1:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpclient: HttpClient,
    private router: Router
  ) { }

  getListUsers(): Observable<User[]> {
    return this.httpclient.get<User[]>(urlUser);
  }

  getUser(email: string): Observable<User> {
    let params = new HttpParams().set('email', email);
    return this.httpclient.get<User>(`${urlUser}`, { params })
    .pipe(
        map(response => { 
          
                      if (response[0] != null) { 
                        return response;
                      }else{
                        return null;
                      }               
                    }
           )
      );
  }

  putUser(user: User) {
    const url = `${urlUser}/${user.getId()}`;
    this.httpclient.put(url,
      user)
      .subscribe(
        data => {
          console.log("PUT Request is successful ", data);
        },
        error => {
          console.log("Modification de l'utilisateur", error);
        }
      );
  }


  postUser(user: User) {
    this.httpclient.post(urlUser,
      user)
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Ajout de l'utilisateur", error);
        }
      );
  }

  deleteUser(id: number): void {
    const url = `${urlUser}/${id}`;
    this.httpclient.delete(url)
      .subscribe(error => {
                            console.log("Suppression de l'utilisateur", error);
                          }
      );
  }

  
}
