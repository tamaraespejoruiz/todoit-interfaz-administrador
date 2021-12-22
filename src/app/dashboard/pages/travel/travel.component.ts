import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { StatusTravelService } from '../../services/status-travel.service';
import { MatPaginator } from '@angular/material/paginator';
import { Travel } from '../../models/travel';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TableComponent } from '../../components/table/table.component';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.sass']
})
export class TravelComponent implements OnInit, AfterViewInit {
  constructor(private statusTravelService: StatusTravelService) { }

  viajesDisponibles: Travel[] = [];
  dataSource = new MatTableDataSource<Travel>();
  
  @ViewChild(MatSelect) filtro!: MatSelect;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(TableComponent) table!: TableComponent;


  ngAfterViewInit() {
    this.table.setPaginator(this.paginator, this.sort);
  }
  ngOnInit( ): void { 

  }

  obtenerNombreAdministrador(): string {
    return JSON.parse(localStorage.getItem('nombreUsuario')??'null');
  }

  seleccionarFiltro() {
    if (this.filtro.value === 'activos') {
      this.cargarViajesActivos();
    }
    if (this.filtro.value === 'pendientes') {
      this.cargarViajesPendientes();
    }
    if (this.filtro.value === 'enCurso') {   
      this.cargarViajesEnCurso();
    }
    if (this.filtro.value === 'cancelados') {
      this.cargarViajesCancelados();
    }
  }


  cargarViajesPendientes() {
    this.statusTravelService.getViajesPendientes().subscribe( resp => {
      let resultado:Travel[] = [];
      for (const resultadoParcial of resp) { 
        resultado = resultado.concat(resultadoParcial.filter(viaje => 
          viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length - 1].statusTravel != 10)); 
      }
      this.table.setData(resultado);
    });
  }

  cargarViajesEnCurso() {
    this.statusTravelService.getViajesEnCurso().subscribe( resp => {
      let resultado:Travel[] = [];
      for (const resultadoParcial of resp) {
        resultado = resultado.concat(resultadoParcial.filter(viaje => 
          viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length - 1].statusTravel != 10)); 
      }
      
      this.table.setData(resultado);
    });    
  }
  cargarViajesActivos() {
    this.statusTravelService.getViajesActivos().subscribe( resp => {
      let resultado:Travel[] = [];
      for (const resultadoParcial of resp) { 
        resultado = resultado.concat(resultadoParcial.filter(viaje => 
          viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length - 1].statusTravel != 10)); 
      }
      this.table.setData(resultado);
    });    
  }

  cargarViajesCancelados() {
    this.statusTravelService.getViajesCancelados().subscribe( resp => {
      let resultado: Travel[] = [];
      for (const resultadoParcial of resp) {
        resultado = resultado.concat(resultadoParcial);
      }
      this.table.setData(resultado);
    })
  }

}
