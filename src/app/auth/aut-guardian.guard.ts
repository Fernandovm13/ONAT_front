import { Injectable } from '@angular/core';
import {
  CanActivateFn,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  GuardResult,
  MaybeAsync,
} from '@angular/router';
import { OrganizacionService } from '../services-interfaces/organization/organization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private organizacionService: OrganizacionService,
    private router: Router
  ) {}
  
  
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('authToken')

    if(!token){
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}

// export const autGuardianGuard: CanActivateFn = (route, state) => {
//   return true;
// };
