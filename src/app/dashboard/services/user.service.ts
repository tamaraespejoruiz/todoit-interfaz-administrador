import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUsers(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`api/Users?userOperation=1`)
  }

  eliminarUsuario(usuario: Registro): Observable<Registro> {
    usuario.isDeleted = true;
    return this.http.post<Registro>('api/Users', usuario);
  }
}