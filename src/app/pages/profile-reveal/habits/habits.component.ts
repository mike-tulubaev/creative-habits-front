import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CREATIVE_SPECIES_WHITE_BG } from 'src/app/core/models/creative-species.enum';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import { DownloadResults } from 'src/app/core/ngxs/interview/interview.actions';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['../habits.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class HabitsComponent implements OnInit {
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
        //this.goToNextStep();
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
    this.closeHabitDetails();
    // @ts-ignore
    if (document.activeElement != document.body) document.activeElement.blur();

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

  allHabits$ = this.interviewResult$.pipe(
    map((result) => Array.from(new Set([...result.Habits_Clus_shared, ...result.Clus_Top_Habits, ...result.Habits_unique])))
  );
  clusterHabits$ = this.interviewResult$.pipe(
    map((result) => [...result.Habits_Clus_shared, ...result.Clus_Top_Habits])
  );
  personalHabits$ = this.interviewResult$.pipe(
    map((result) => [...result.Habits_Clus_shared, ...result.Habits_unique])
  );
  sharedHabits$ = this.interviewResult$.pipe(
    map((result) => result.Habits_Clus_shared)
  );

  isClusterHabitsShown: boolean = true;
  isPersonalHabitsShown: boolean = false;
  selectedHabit: string = '';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.height = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.width = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.overflow = 'auto')
  }

  showClusterHabits() {
    this.isClusterHabitsShown = true;
    this.isPersonalHabitsShown = false;
  }

  showPersonalHabits() {
    this.isClusterHabitsShown = false;
    this.isPersonalHabitsShown = true;
  }

  showHabbitDetails(habitName: string = '') {
    this.selectedHabit = habitName;
  }

  closeHabitDetails() {
    this.selectedHabit = '';
  }

  goToNextStep() {
    this.scrollRoutingIsActive = false;
    this.router.navigate(['/profile-reveal', 'landscape']);
  }

  goToPrevStep() {
      this.scrollRoutingIsActive = false;
      document.querySelector('app-habits')?.classList.add('leave');
      setTimeout(() => {
        this.scrollRoutingIsActive = true;
        this.router.navigate(['/profile-reveal', 'species']);
      }, 750);
  }

  download(event: Event) {
    event.preventDefault();
    this.store.dispatch(new DownloadResults());
    this.router.navigate(['/profile-reveal', 'landscape']);
  }

  private activateScrollRouting() {
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }
}
