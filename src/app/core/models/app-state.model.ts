import { CreativeSpeciesEnum } from './creative-species.enum';

export interface AppStateModel {
  isLoading: boolean;
  isLandscapeHabits: boolean;
  wasLandscapeIntroShown: boolean;
  selectedClusterOfLandscapeHabits: CreativeSpeciesEnum | undefined;
  lastSelectedCluster: CreativeSpeciesEnum | undefined;
}
