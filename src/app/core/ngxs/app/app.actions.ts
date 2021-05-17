import { CreativeSpeciesEnum } from '../../models/creative-species.enum';

export class SetIsLoadingAction {
  static readonly type = '[App] Set is loading flag';
  constructor(public payload: boolean) {}
}

export class SetIsLandscapeHabitsAction {
  static readonly type = '[App] Set is landscape habits';
  constructor(public payload: boolean) {}
}

export class SetWasLandscapeIntroShownAction {
  static readonly type = '[App] Set was landscape intro shown';
  constructor() {}
}

export class SelectedClusterOfLandscapeHabitsAction {
  static readonly type = '[App] Set selected cluster of landscape map';
  constructor(public payload: CreativeSpeciesEnum | undefined) {}
}

export class SetLastSelectedClusterAction {
  static readonly type = '[App] Set last selected cluster';
  constructor(public payload: CreativeSpeciesEnum | undefined) {}
}
