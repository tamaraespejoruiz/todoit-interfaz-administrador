import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Travel } from '../models/travel';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class StatusTravelService {

    constructor(private http: HttpClient) { }
    
    verEstadoViaje() {
        return this.http.get<Travel[]>(`api/Equipment?clientId=${localStorage.getItem('idAdministrador')}`);
    }

    getViajesPorEstados(statusTravels: number[]): Observable<Travel[][]> {
        const solicitudes = [];
        for (const statusTravel of statusTravels) {
            solicitudes.push(this.http.get<Travel[]>(`api/Travel/2/${statusTravel}`));
        }
        return forkJoin(solicitudes);
    }

    getViajesPendientes(): Observable<Travel[][]> {
        return this.getViajesPorEstados([1, 5]);
    }

    getViajesActivos(): Observable<Travel[][]> {
        return this.getViajesPorEstados([1, 2, 3, 4, 5, 6, 7, 8])
    }

    getViajesEnCurso(): Observable<Travel[][]> {
        return this.getViajesPorEstados([2, 3, 6, 7]);
    }

    getViajesCancelados(): Observable<Travel[][]> {
        return this.getViajesPorEstados([9]);
    }

    getViajesTodos(): Observable<Travel[][]> {
        return this.getViajesPorEstados([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
    postTravel(travelId: number, statusTravel: number, userOperation: number, isReasigned: boolean, idCadete: number): Observable<Travel> {
        return this.http.post<Travel>(`/api/Travel?travelId=${travelId}&statusTravel=${statusTravel}&userOperation=${userOperation}&cadeteId=${idCadete}&isReasigned=${isReasigned}`, 
        [travelId, statusTravel, userOperation, isReasigned])
    }

}