import { Component, OnInit } from '@angular/core';
import { StatusTravelService } from '../../services/status-travel.service';
import { Travel } from '../../models/travel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.sass']
})
export class TableHistoryComponent implements OnInit {

  displayedColumns: string[] = ['cadete', 'cliente', 'fecha', 'hora', 'estadoDelEquipo'];
  constructor(private statusTravelService: StatusTravelService) { }
  dataSource = new MatTableDataSource<Travel>();


  obtenerNombreEstadoEquipo(estado: number): string {
    switch(estado) {
      case 5:
      case 6: 
      case 7: 
      case 8: 
        return "Reparado";
      case 1: 
      case 2: 
      case 3:
      case 4:
      case 9:
      case 10:
        return "A reparar";

    }
    return "";
  }
  setPaginator(paginator: MatPaginator, sort: MatSort) {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = sort;
  }
  setData(viajes: Travel[]) {
    this.dataSource.data = viajes;
  }

  ngOnInit(): void {
  }

}
