import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Router } from '@angular/router';

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
