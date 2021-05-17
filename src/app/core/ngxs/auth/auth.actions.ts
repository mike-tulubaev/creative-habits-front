export class SetUserAuthenticated {
  static readonly type = '[Auth] Set User Authenticated';
  constructor(public payload: boolean) {}
}
