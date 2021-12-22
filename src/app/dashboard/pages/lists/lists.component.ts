import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListComponent } from '../../components/list/list.component';
import { Registro } from '../../models/registro';
import { UsersService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass']
})
export class ListsComponent implements OnInit, AfterViewInit {

  constructor(private usersService: UsersService) {}

  clientes:Registro[] = [];
  administradores:Registro[] = [];
  cadetes:Registro[] = [];
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSelect) filtro!: MatSelect;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ListComponent) list!: ListComponent;


  ngOnInit(): void { 
  }

  ngAfterViewInit(): void {
    this.list.eliminarItemCallback = (elemento) => this.eliminarUsuario(elemento);
    this.list.setPaginator(this.paginator, this.sort);
    this.seleccionarFiltro();
  }

  seleccionarFiltro() {
    if (this.filtro.value === 'clientes') {
      this.cargarListaUsuarioPorRol(3);
    }
    if (this.filtro.value === 'cadetes') {
      this.cargarListaUsuarioPorRol(2);
    }
    if (this.filtro.value === 'administradores') {   
      this.cargarListaUsuarioPorRol(1);
    }
    if (this.filtro.value === 'todos') {
      this.cargarListaUsuarios();
    }
  }

  cargarListaUsuarioPorRol(idRol: number): void {
    this.usersService.getUsers().subscribe(resp => {
      this.clientes = [];
      for (const user of resp) {
        if (user.rol.id === idRol && !user.isDeleted) { 
          this.clientes.push(user);
        }
      }
      this.list.dataSource.data = this.clientes;
    });
  }    

  cargarListaUsuarios(): void {
    this.usersService.getUsers().subscribe(resp => {
      this.clientes = [];
      for (const user of resp) {
        if (!user.isDeleted) {
          this.clientes.push(user);
        }
      }
      this.list.dataSource.data = this.clientes;
    });
  }
  
  eliminarUsuario(element: Registro): void { 
      Swal.fire({
      title: '¿Estas seguro de cancelar el viaje?',
      text: "Se perderá toda la información del viaje!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usersService.eliminarUsuario(element).subscribe(resp => {
            this.clientes = this.clientes.filter(e => e.id !== element.id)
            this.list.dataSource.data = this.clientes;
            Swal.fire(
              'Eliminado!',
              'Su tarjeta ha sido eliminada.',
              'success'
            )
            
          }, 
          error => {
            Swal.fire(
              'Fallo',
              'Ups',
              'error'
            )
          });
        }
      });
    }



}
