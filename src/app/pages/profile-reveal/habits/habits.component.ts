import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
  group,
} from '@angular/animations';
import { EventManager } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CREATIVE_SPECIES_WHITE_BG } from 'src/app/core/models/creative-species.enum';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { HabitViewEnum } from 'src/app/core/models/habits.model';
import { FADE_HABIT_VIEW, FADE_HABIT_LIST, FADE_HABITS } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['../habits.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    FADE_HABIT_VIEW
  ]
})
export class HabitsComponent implements OnInit {

  public habitView = HabitViewEnum.INTRO;

  //-- scroll routing --//
  private timeout = 500;
  private scrollRoutingIsActive = false;
  private _delta = 0;
  private set delta(v: number) {
    this._delta = v;
    const element = document.querySelector('.page-habits__container');
    if (element && this.scrollRoutingIsActive) {
      if (this._delta < 0 && element.scrollTop === 0) {
        this._delta = 0;
        this.goToPrevStep();
      }
      if (this._delta > 0 && element.scrollTop === element.scrollHeight - element.clientHeight) {
        this._delta = 0;
        this.goToNextStep();
      }
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
    if (!path.filter((el) => el && el.nodeType && el.nodeType === Node.ELEMENT_NODE && el.classList.contains('cover-half__full-height')).length) {
      this.closeHabitDetails();
      // @ts-ignore
      if (document.activeElement != document.body) document.activeElement.blur();
    }

    if (!this.scrollRoutingIsActive) {
      const element = document.querySelector('.page-habits__container');
      if (element && (element.scrollTop === element.scrollHeight - element.clientHeight || element.scrollTop === 0)) {
        this.activateScrollRouting();
      }
      return;
    }
    if (!(event.target as HTMLElement).className.includes('cover-half')) {
      this.delta += event.deltaY;
    }
  }
  //-- scroll routing end --//

  interviewResult$: Observable<InterviewResultModel> = this.store
    .select(InterviewState.result)
    .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  createiveSpecies$ = this.interviewResult$.pipe(
    map((result) => result.Creative_Species)
  );

  clusterAffinity$ = this.interviewResult$.pipe(
    map((result) => result.Cluster_Affinity),
    map((affinity) => (affinity ? affinity * 100 : 0))
  );

  darkModeClass$ = this.createiveSpecies$.pipe(
    map((species) =>
      species ? CREATIVE_SPECIES_WHITE_BG.includes(species) : false
    )
  );

  selectedHabit: string = '';

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    //@ts-ignore
    document.querySelector('body')?.classList.add('fixed');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.height = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.width = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.overflow = 'auto');
  }

  showHabbitDetails(habitName: string = '') {
    this.selectedHabit = habitName;
  }

  closeHabitDetails() {
    this.selectedHabit = '';
  }

  goToNextStep() {
    this.scrollRoutingIsActive = false;
    if (this.habitView != HabitViewEnum.DOWNLOAD) {
      this.habitView = this.habitView + 1;
      document.querySelector('app-habits')?.classList.remove('up');
      document.querySelector('app-habits')?.classList.add('down');
      return;
    }
    //this.router.navigate(['/profile-reveal', 'landscape']);
  }

  goToPrevStep() {
    this.scrollRoutingIsActive = false;
    if (this.habitView != HabitViewEnum.INTRO) {
      this.habitView = this.habitView - 1;
      document.querySelector('app-habits')?.classList.add('up');
      document.querySelector('app-habits')?.classList.remove('down');
      return;
    }
    document.querySelector('app-habit-digging')?.classList.add('leave');
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
      this.router.navigate(['/profile-reveal', 'species']);
    }, 750);
  }

  private activateScrollRouting() {
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }

  ngOnDestroy(): void {
    //@ts-ignore
    document.querySelector('body')?.classList.remove('fixed');
  }
}
