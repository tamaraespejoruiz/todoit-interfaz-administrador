import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Registro } from '../../models/registro';
import { UsersService } from '../../services/user.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['nombreCompleto', 'rol', 'direccion', 'telefono', 'email', 'vehiculo', ' '];
  constructor(private usersService: UsersService) { }

  dataSource = new MatTableDataSource<Registro>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  eliminarItemCallback: (item: Registro) => void = () => {}; 

  ngOnInit(): void { }

  eliminarItem(element: Registro) {
    this.eliminarItemCallback(element);
  }
  
  setPaginator(paginator: MatPaginator, sort: MatSort) {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }


  editarItem(element: Registro) {

  }
}

