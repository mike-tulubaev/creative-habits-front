import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss'],
})
export class ScienceComponent implements OnInit {
  interviewResult$: Observable<boolean> = this.store
    .select(InterviewState.result)
    .pipe(map((result) => !!result));

  selectedPerson: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {}

  selectPerson(person: string) {
    this.selectedPerson = person;
  }

  closeWindow() {
    this.selectedPerson = '';
  }
}
