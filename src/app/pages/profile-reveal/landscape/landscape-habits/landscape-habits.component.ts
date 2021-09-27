import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import {
  CreativeSpeciesEnum,
  CREATIVE_SPECIES_WHITE_BG,
} from 'src/app/core/models/creative-species.enum';
import { HABITS_BY_CLUSTERS } from 'src/app/core/models/habits.model';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import {
  SelectedClusterOfLandscapeHabitsAction,
  SetIsLandscapeHabitsAction,
} from 'src/app/core/ngxs/app/app.actions';
import { AppState } from 'src/app/core/ngxs/app/app.state';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { WAIT_CHILD_ANIMATION } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-landscape-habits',
  templateUrl: './landscape-habits.component.html',
  styleUrls: ['../../habits.scss'],
  animations: [WAIT_CHILD_ANIMATION],
  encapsulation: ViewEncapsulation.None,
})
export class LandscapeHabitsComponent implements OnInit, OnDestroy {
  @Output() openMap = new EventEmitter<null>();

  darkMode: boolean = false;

  creativeSpeciesEnum = CreativeSpeciesEnum;

  interviewResult$: Observable<InterviewResultModel> = this.store
    .select(InterviewState.result)
    .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = combineLatest([
    this.store.select(AppState.lastSelectedCluster),
    this.interviewResult$.pipe(map((result) => result?.Creative_Species)),
  ]).pipe(map(([last, own]) => (last ? last : own)));

  selectedCluster$ = new BehaviorSubject<CreativeSpeciesEnum | undefined>(
    undefined
  );

  pageBackground$ = this.selectedCluster$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'assets/video/FocusMononovous.mp4';
        case -1:
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'assets/video/MonoRoutinus.mp4';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'assets/video/NovoGregarious.mp4';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'assets/video/SocialisAdventurous.mp4';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'assets/video/SoloNoctus.mp4';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'assets/video/SuiInspira.mp4';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'assets/video/YoloChaotis.mp4';
        default:
          return '';
      }
    })
  );
  pageFlowerClass$ = this.selectedCluster$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'page-species--focus-mononovous';
        case -1:
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'page-species--mono-routinus';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'page-species--novo-gregarious';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'page-species--socialis-adventurous';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'page-species--solo-noctus';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'page-species--sui-inspira';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'page-species--yolov-haotis';
        default:
          return '';
      }
    })
  );

  darkModeClass$ = this.selectedCluster$.pipe(
    map((species) => {
      const res = species ? CREATIVE_SPECIES_WHITE_BG.includes(species) : false
      this.darkMode = res ? true : false;
      return res
    }),
    map((isDark) => (isDark ? 'page-species--reveal-light-gradient' : ''))
  );

  pageClasses$ = combineLatest([
    this.pageFlowerClass$,
    this.darkModeClass$,
  ]).pipe(map((classes) => classes.join(' ')));

  selectedHabit: string = '';
  clusterHabits$ = this.selectedCluster$.pipe(
    map((cluster) => (cluster ? HABITS_BY_CLUSTERS[cluster] : []))
  );
  sharedHabits$ = this.interviewResult$.pipe(
    map((result) => [...result.Habits_Clus_shared, ...result.Habits_unique])
  );

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new SetIsLandscapeHabitsAction(true));
    this.createiveSpecies$
      .pipe(first())
      .subscribe((cluster) => this.selectedCluster$.next(cluster === -1 ? CreativeSpeciesEnum.MONO_ROUTINUS : cluster));
    this.contentWrapper = document.querySelector('.page-habits__wrapper');
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetIsLandscapeHabitsAction(false));
  }

  selectCluster(cluster: CreativeSpeciesEnum) {
    this.store.dispatch(new SelectedClusterOfLandscapeHabitsAction(cluster));
    this.selectedCluster$.next(cluster);
  }

  showHabbitDetails(habitName: string = '') {
    this.selectedHabit = habitName;
  }

  closeHabitDetails() {
    this.selectedHabit = '';
  }

  goToMap(event: Event) {
    event.preventDefault();
    this.openMap.next();
  }


  private contentWrapper: Element | null = null;

  //-- scroll routing --//
  private timeout = 500;
  private scrollRoutingIsActive = false;
  private _delta = 0;
  private set delta(v: number) {
    this._delta = v;
    const canRoute = this.contentWrapper && this.scrollRoutingIsActive;
    // @ts-ignore
    const scrollGotToTop = canRoute && this._delta < 0 && this.contentWrapper.scrollTop === 0;
    // @ts-ignore
    const scrollGotToBottom = canRoute && this._delta > this.contentWrapper.scrollHeight - this.contentWrapper.clientHeight;
    if (scrollGotToTop) {
      this._delta = 0;
    }
    // @ts-ignore
    if (scrollGotToBottom) {
      this._delta = 0;
      this.openMap.next();
    }
    this.scrollRoutingIsActive = false;
  }
  private get delta(): number {
    return this._delta;
  }



  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    // Close detail on scroll
    // @ts-ignore
    const path = event.path || (event.composedPath && event.composedPath());
    // @ts-ignore
    const scrollUnderDrawer = !path.filter((el) => el && el.nodeType && el.nodeType === Node.ELEMENT_NODE && el.classList.contains('cover-half__full-height')).length;
    if (scrollUnderDrawer) {
      this.closeHabitDetails();
      // @ts-ignore
      if (document.activeElement != document.body) {
        // @ts-ignore
        document.activeElement.blur();
      }
    }

    const canActivateScroll = !this.scrollRoutingIsActive && this.contentWrapper && (this.contentWrapper.scrollTop === this.contentWrapper.scrollHeight - this.contentWrapper.clientHeight || this.contentWrapper.scrollTop === 0)
    if (canActivateScroll) {
      this.activateScrollRouting();
      return;
    }
    if (!(event.target as HTMLElement).className.includes('cover-half')) {
      this.delta += event.deltaY;
    }
  }

  private activateScrollRouting() {
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }
}
