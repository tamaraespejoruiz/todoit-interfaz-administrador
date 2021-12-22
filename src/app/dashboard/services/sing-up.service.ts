import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  save(registro:Registro):  Observable<Registro>  {
    return  this.http.post<Registro>('/api/Users', registro);
  }

  getAll(){
    return  this.http.get<Registro>('http://localhost:3000/Users');
  }
    
}
