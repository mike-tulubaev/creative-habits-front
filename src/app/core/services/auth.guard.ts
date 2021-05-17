import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(state => state.auth.isAuthenticated).pipe(
      tap(canActivate => {
        if (!canActivate) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}