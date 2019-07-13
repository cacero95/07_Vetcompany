import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbaService } from '../services/data/dba.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanActivate {
  constructor(private auth:AngularFireAuth,
    private dba:DbaService,
    private router:Router){}
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.authState.pipe(map(verificar=>{
      if (verificar){
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    }))
    
  }
}
