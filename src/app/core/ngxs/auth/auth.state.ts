import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Navigate } from "@ngxs/router-plugin";
import { Action, NgxsOnInit, State, StateContext, StateToken } from "@ngxs/store";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthStateModel } from "../../models/auth-state.model";
import { SetUserAuthenticated } from "./auth.actions";

const AUTH_TOKEN: StateToken<AuthStateModel> = new StateToken(
  'auth'
);

@State<AuthStateModel>({
  name: AUTH_TOKEN,
  defaults: {
    isAuthenticated: false
  },
})
@Injectable()
export class AuthState implements NgxsOnInit {

  constructor(private router: Router) {

  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {

    const { isAuthenticated } = ctx.getState();

    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate(['/home']);
  }

  @Action(SetUserAuthenticated)
  setUserAuth(ctx: StateContext<AuthStateModel>, action: SetUserAuthenticated) {
    return of(action.payload).pipe(tap(() => {
      ctx.patchState({
        isAuthenticated: action.payload
      });
    }))
  }
}