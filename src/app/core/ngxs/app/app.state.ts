import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AppStateModel } from '../../models/app-state.model';
import {
  SelectedClusterOfLandscapeHabitsAction,
  SetIsLandscapeHabitsAction,
  SetIsLoadingAction,
  SetLastSelectedClusterAction,
  SetWasLandscapeIntroShownAction,
} from './app.actions';

const APP_TOKEN: StateToken<AppStateModel> = new StateToken('app');

@State<AppStateModel>({
  name: APP_TOKEN,
  defaults: {
    isLoading: false,
    isLandscapeHabits: false,
    wasLandscapeIntroShown: false,
    selectedClusterOfLandscapeHabits: undefined,
    lastSelectedCluster: undefined,
  },
})
@Injectable()
export class AppState {
  @Selector()
  static isLoading(state: AppStateModel) {
    return state.isLoading;
  }

  @Selector()
  static landscapeHabitsData(state: AppStateModel) {
    return {
      isLandscapeHabits: state.isLandscapeHabits,
      selectedCluster: state.selectedClusterOfLandscapeHabits,
    };
  }

  @Selector()
  static wasLandscapeIntroShown(state: AppStateModel) {
    return state.wasLandscapeIntroShown;
  }

  @Selector()
  static lastSelectedCluster(state: AppStateModel) {
    return state.lastSelectedCluster;
  }

  @Action(SetIsLoadingAction)
  public setIsLoading(
    ctx: StateContext<AppStateModel>,
    action: SetIsLoadingAction
  ) {
    ctx.patchState({ isLoading: action.payload });
  }

  @Action(SetIsLandscapeHabitsAction)
  public setIsLandscapeHabits(
    ctx: StateContext<AppStateModel>,
    action: SetIsLandscapeHabitsAction
  ) {
    ctx.patchState({ isLandscapeHabits: action.payload });
  }

  @Action(SetWasLandscapeIntroShownAction)
  public setWasLandscapeIntroShown(ctx: StateContext<AppStateModel>) {
    ctx.patchState({ wasLandscapeIntroShown: true });
  }

  @Action(SelectedClusterOfLandscapeHabitsAction)
  public selectedClusterOfLandscapeHabits(
    ctx: StateContext<AppStateModel>,
    action: SelectedClusterOfLandscapeHabitsAction
  ) {
    ctx.patchState({ selectedClusterOfLandscapeHabits: action.payload });
  }

  @Action(SetLastSelectedClusterAction)
  public setLastSelectedCluster(
    ctx: StateContext<AppStateModel>,
    action: SetLastSelectedClusterAction
  ) {
    ctx.patchState({ lastSelectedCluster: action.payload });
  }
}
