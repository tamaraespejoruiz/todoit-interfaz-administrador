import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Travel } from '../../models/travel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StatusTravelService } from '../../services/status-travel.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['cliente', 'direccion', 'estado'];
  constructor(private statusTravelService: StatusTravelService) { }
  dataSource = new MatTableDataSource<Travel>();

  obtenerNombreStatusTravel(statusTravel: number): string {
    switch (statusTravel) {
      case 1: return "Pendiente a retirar";
      case 2: return "Retiro asignado";
      case 3: return "Retirado";
      case 4: return "Pendiente de reparación";
      case 5: return "Reparado";
      case 6: return "Entrega asignada";
      case 7: return "Pendiente de entrega";
      case 8: return "Entregado";
      case 9: return "Recibido";
      case 10: return "Renunciado";
    }
    return "";
  }

  cambiarEstado(element: Travel, event: MatSelectChange) {
    const estadoAnterior = this.obtenerStatusTravel(element),
    estadoNuevo = event.value;

    event.source.writeValue(estadoAnterior);
    const swalConfig: SweetAlertOptions = {
      title: "Estás a punto de cambiar el estado de un viaje",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    };
    const estadosQueRequierenCadetes = ["2", "3", "6", "7", "8", "9"];
    let idCadete = 0;
    if (estadosQueRequierenCadetes.findIndex(e => e === estadoNuevo) !== -1) {
      swalConfig.text = 'Ingrese el ID del cadete';
      swalConfig.input = 'number';
      swalConfig.preConfirm = (cadete) => {
        idCadete = cadete;
      }
    }

    Swal.fire(swalConfig).then((result) => {
      if (result.isConfirmed) {
        this.statusTravelService.postTravel(element.id, estadoNuevo, JSON.parse(localStorage.getItem("idAdministrador")??"0"), false, idCadete).subscribe(
          resp => {
            event.source.writeValue(event.value);
            Swal.fire(
              '¡Actualizado!',
              'El estado del viaje ha sido actualizado.',
              'success'
            )            
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo actualizar el estado del viaje!',
            })             
          }); 

      }
    })
  }
  ngOnInit(): void {
  }

  setPaginator(paginator: MatPaginator, sort: MatSort) {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }
  setData(viajes: Travel[]) {
    this.dataSource.data = viajes;
  }

  obtenerStatusTravel(element: Travel): string {
    return '' + element.travelEquipmentDTOs[element.travelEquipmentDTOs.length - 1].statusTravel;
  }

}
