import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
                private loginService: LoginService,
                private router: Router
              ) { }

  ngOnInit(): void { }

  user: Usuario = {
    email:'',
    password:'',
  };

  hide = true;
  formularioLogin = new FormGroup ({
    email: new FormControl('', Validators.email), 
    password : new FormControl('') 
  })


  onSubmit(formDirective: FormGroupDirective) {
    this.user = this.formularioLogin.value;
    this.loginService.login(this.user.email, this.user.password).subscribe(  (resp:any) => {

      if (resp.rol.id !== 1) {
        Swal.fire ({
          icon: 'error',
          title: 'Oops...',
          text: 'No sos administradr. Permiso denegado',
          width:'65%',
          timer: 5000,
          timerProgressBar: true,

          allowOutsideClick: false, 
          allowEscapeKey: false,
          allowEnterKey: false, 
          stopKeydownPropagation: false
        })
        this.router.navigate(['/auth/login']);
        return;
      }
      localStorage.setItem('idRolUsuario', JSON.stringify(resp.rol.id));
      localStorage.setItem('userLogeado', JSON.stringify(this.user.email));
      localStorage.setItem('nombreUsuario', JSON.stringify(resp.fullName));
      localStorage.setItem('idAdministrador', JSON.stringify(resp.id)); 
      this.router.navigate(['/dashboard/travel']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña invalida!',
      })
    })    

    formDirective.resetForm();
    this.formularioLogin.reset();
  } 

}
