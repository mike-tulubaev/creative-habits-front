import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss'],
})
export class TakeSurveyComponent implements OnInit {
  interviewResult$: Observable<boolean> = this.store
    .select(InterviewState.result)
    .pipe(map((result) => !!result));

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
