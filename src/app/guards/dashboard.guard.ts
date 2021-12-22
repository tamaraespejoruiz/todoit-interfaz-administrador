import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivateChild {
  constructor( private router: Router) { }
   
  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     
    if (!localStorage.getItem('userLogeado')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Acceso denagado, inicie seción para continuar.',
        })
        return this.router.navigate(['./auth/login']).then(() => false);
        }
        
        return true;
    }        
  
}
