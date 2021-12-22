import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { StatusTravelService } from '../../services/status-travel.service';
import { TableHistoryComponent } from '../../components/table-history/table-history.component';
import { Travel } from '../../models/travel';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import Swal  from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass']
})

export class HistoryComponent implements OnInit, AfterViewInit {

  constructor(private statusTravelService: StatusTravelService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableHistoryComponent) table!: TableHistoryComponent;

  ngAfterViewInit() {
    this.table.setPaginator(this.paginator, this.sort);
  }
  ngOnInit(): void {
    this.mostrarCargando();
    this.cargarHistorialViajes();
  }

  cargarHistorialViajes(): void {
    this.statusTravelService.getViajesCancelados().subscribe(resp => {
      let resultado: Travel[] = [];
      for (const resultadoParcial of resp) {
        for (const viaje of resultadoParcial) {
          if (viaje) {
            if (viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length - 1].cadete &&
              viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length - 1].operator) {
              resultado.push(viaje);
            }
          } 
        }
      }
      this.table.setData(resultado);
      this.ocultarCargando();
    })
  }

   
  mostrarCargando() {
    Swal.fire({
      title: 'Cargando ...',
      allowOutsideClick: false, 
      didOpen: () => Swal.showLoading()
    });
  } 

  ocultarCargando() {
    Swal.close();
  }

  
}
