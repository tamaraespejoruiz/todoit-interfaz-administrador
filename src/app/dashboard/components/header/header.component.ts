import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  estaLoggeado():boolean {
    const usuario = localStorage.getItem('userLogeado');
    if (usuario) 
      return true;
    return false;
  }

  cerrarSesion():void {
    localStorage.removeItem('userLogeado');
    localStorage.removeItem('idRolUsuario');
    localStorage.removeItem('idAdministrador');
    
    this.router.navigate(['auth/login']);
  }
}
