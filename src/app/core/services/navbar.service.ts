import { Injectable } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CreativeSpeciesEnum } from '../models/creative-species.enum';
import { AppState } from '../ngxs/app/app.state';
import { InterviewState } from '../ngxs/interview/interview.state';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  showSurveyFAQ$: Subject<null> = new Subject();
  showProfileRevealInfo$: Subject<null> = new Subject();

  audioSource$ = combineLatest([
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      switchMap(() =>
        this.store.selectOnce(
          (state) =>
            [
              state.router.state?.root.firstChild?.url[0],
              state.router.state?.root.firstChild?.firstChild?.firstChild
                ?.url[0],
            ] as UrlSegment[]
        )
      )
    ),
    this.store.select(AppState.landscapeHabitsData),
  ]).pipe(
    filter(([path, data]) => !!path),
    withLatestFrom(this.store.select(InterviewState.result)),
    map(([[segments, landscapeHabitsData], interview]) => {
      const cluster = interview?.Creative_Species;
      if (!segments) {
        return '';
      }
      switch (segments[0]?.path) {
        case 'home':
          return segments[1] && segments[1].path === 'video'
            ? ''
            : 'assets/audio/Intro_Meditation_Nature_Relax.mp3';
        case 'survey':
          return this.getTrackByQuestion(
              this.router.routerState.snapshot.root.firstChild?.params?.question
          );
        case 'science':
          return 'assets/audio/Intro_Meditation_Nature_Relax.mp3';

        case 'profile-reveal':
          switch (segments[1]?.path) {
            case undefined:
            case 'species':
            case 'habits':
              return this.getTrackByCluster(cluster);
            case 'landscape':
              if (landscapeHabitsData.isLandscapeHabits) {
                return this.getTrackByCluster(
                  landscapeHabitsData.selectedCluster ? landscapeHabitsData.selectedCluster : cluster
                );
              } else {
                return 'assets/audio/Landscape_Map_Under_Water.mp3';
              }
            default:
              return '';
          }
        default:
          return 'assets/audio/Intro_Meditation_Nature_Relax.mp3';
      }
    }),
    distinctUntilChanged(),
  );

  constructor(private store: Store, private router: Router) {}

  private getTrackByCluster(cluster: CreativeSpeciesEnum | undefined): string {
    switch (cluster) {
      case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
        return 'assets/audio/FocusMononovous_Stream_Small.mp3';
      case CreativeSpeciesEnum.MONO_ROUTINUS:
        return 'assets/audio/MonoRoutinus_Mysterious_Atmosphere.mp3';
      case CreativeSpeciesEnum.NOVO_GREGARIOUS:
        return 'assets/audio/NovoGregarious_Jungle_Ambience.mp3';
      case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
        return 'assets/audio/Socialis_Windy_Spring_Meadow.mp3';
      case CreativeSpeciesEnum.SOLO_NOCTUS:
        return 'assets/audio/SoloNoctus_Night_Winds.mp3';
      case CreativeSpeciesEnum.SUI_INSPIRA:
        return 'assets/audio/SuiInspira_Aurora.mp3';
      case CreativeSpeciesEnum.YOLO_CHAOTIS:
        return 'assets/audio/YoloChaotis_Small Waterfall.mp3';
      default:
        return '';
    }
  }
}
