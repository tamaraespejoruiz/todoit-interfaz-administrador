import { Rol } from "./rol";
import { Vehiculo } from "./vehiculo";

export  interface Registro {
    id?:number;
    email:string;
    fullName:string;
    address:string;
    cellPhone:string;
    isAccepted?:boolean;
    isDeleted?:boolean;
    observations:string;
    password:string;
    vehicle:Vehiculo | null;
    rol:Rol;
  }