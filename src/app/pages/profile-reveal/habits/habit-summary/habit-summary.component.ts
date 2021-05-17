import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-habit-summary',
  templateUrl: './habit-summary.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HabitSummaryComponent implements OnInit {
  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = this.store
    .select(InterviewState.result)
    .pipe(map((result) => result?.Creative_Species));

  speciesEnum = CreativeSpeciesEnum;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
