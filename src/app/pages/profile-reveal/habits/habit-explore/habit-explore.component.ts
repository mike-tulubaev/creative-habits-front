import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CREATIVE_SPECIES_WHITE_BG } from 'src/app/core/models/creative-species.enum';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { FADE_HABIT_VIEW } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-habit-explore',
  templateUrl: './habit-explore.component.html',
  styleUrls: ['./habit-explore.component.scss']
})
export class HabitExploreComponent implements OnInit {
  @Output() showDetailsEvent = new EventEmitter<string>();

  isClusterHabitsShown: boolean = false;
  isPersonalHabitsShown: boolean = true;
  selectedHabit: string = '';

  interviewResult$: Observable<InterviewResultModel> = this.store
    .select(InterviewState.result)
    .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  createiveSpecies$ = this.interviewResult$.pipe(
    map((result) => result.Creative_Species)
  );

  // darkModeClass$ = this.createiveSpecies$.pipe(
  //   map((species) =>
  //     species ? CREATIVE_SPECIES_WHITE_BG.includes(species) : false
  //   )
  // );

  allHabits$ = this.interviewResult$.pipe(
    map((result) => Array.from(new Set([...result.Habits_Clus_shared, ...result.Clus_Top_Habits, ...result.Habits_unique])))
  );
  personalHabits$ = this.interviewResult$.pipe(
    map((result) => result.Habits_unique)
  );
  sharedHabits$ = this.interviewResult$.pipe(
    map((result) => result.Habits_Clus_shared)
  );
  clusterHabits$ = this.interviewResult$.pipe(
    map((result) => {
      return result.Clus_Top_Habits.filter(el => !result.Habits_Clus_shared.includes(el));
    })
  );

  constructor(private store: Store) { }

  ngOnInit(): void {
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
    this.showDetailsEvent.emit(habitName);
    //this.selectedHabit = habitName;
  }
}
