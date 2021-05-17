import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InterviewStateModel } from 'src/app/core/models/interview-state.model';
import { Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  @Input() currentIndex: number | null = null;
  interview: Observable<InterviewStateModel> = this.store.select(
    (state) => state.interview
  );
  questions: Observable<Question[]> = this.store.select(
    (state) => state.questions
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
