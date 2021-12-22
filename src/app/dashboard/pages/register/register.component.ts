import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { SignUpService } from '../../services/sing-up.service';
import { Registro } from '../../models/registro';
import { Rol } from '../../models/rol';
import { Vehiculo } from '../../models/vehiculo';
import Swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  hide = true;

  formulario = new FormGroup ({
    personal: new FormControl(''),
    nombre : new FormControl('', Validators.pattern(/^[^0-9]+$/)), 
    email: new FormControl('', Validators.email), 
    contraseña : new FormControl(''),  
    direccion : new FormControl(''),
    telefono : new FormControl('', Validators.pattern(/^\d+$/)), 
    vehiculo : new FormControl('')
  })

  constructor(private signUpService: SignUpService) { }
  @ViewChild(MatSelect) filtro!: MatSelect;


  ngOnInit(): void {  }

  
  onSubmit(formDirective: FormGroupDirective) {
    this.signUpService.save(this.getUsuarioFromFormulario()).subscribe(
      resp => {
        Swal.fire(
          '¡Actualizado!',
          'Se creó un personal de forma exitosa.',
          'success'
        )  
      }, 
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo crear el usuario!',
        })        
      });
    formDirective.resetForm();
    this.formulario.reset();
  }

  esCadete() {
    if (this.formulario.get("personal")?.value === '2') {
      return true;
    }
    return false;
  }
  getRolFromRegistro(id: string):Rol {
    if (id === '2') {
      return { 
        id: 2, 
        name: "Cadete", 
        isDeleted: 0
      }
    } else {
      return {
        id: 3,
        name: "Cliente",
        isDeleted: 0 
      }
    }
  }

  getVehiculoFromRegistro(id: string):Vehiculo {
    if (id === '1') {
      return {
        id: 1, 
        name: "Bicicleta", 
        isDeleted: 0
      }
    } else if (id === '2') {
      return {
        id: 2, 
        name: "Motocicleta", 
        isDeleted: 0
      }      
    } else {
      return {
        id: 3, 
        name: "Automovil", 
        isDeleted: 0
      }       
    }
  }

  getUsuarioFromFormulario():Registro {
    const rol = this.getRolFromRegistro(this.formulario.get("personal")?.value);
    let vehiculo: Vehiculo | null = this.getVehiculoFromRegistro(this.formulario.get("vehiculo")?.value);
    if (rol.id === 3) {
      vehiculo = null; 
    }
    const registro: Registro = {
      fullName: this.formulario.get("nombre")?.value,
      email: this.formulario.get("email")?.value,
      password: this.formulario.get("contraseña")?.value,
      address: this.formulario.get("direccion")?.value,
      cellPhone: this.formulario.get("telefono")?.value,
      observations: '',
      vehicle: vehiculo,
      rol: rol,
      isAccepted: true
    };
    
    return registro;
  }
}
