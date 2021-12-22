import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getAll() {
    return  this.http.get<Usuario>('http://vcoronado-001-site12.dtempurl.com/api/Users?userOperation=1');
  }
  login(username:string, password:string): Observable<Usuario> {
    return this.http.get<Usuario>('api/Login' + '?email=' + username + '&password=' + password);
  }
}
