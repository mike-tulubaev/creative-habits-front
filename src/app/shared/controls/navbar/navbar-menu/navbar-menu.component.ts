import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  @Input() isDarkMode: Observable<boolean> | undefined;

  interviewResult$: Observable<InterviewResultModel> = this.store
  .select(InterviewState.result)
  .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  creativeSpecies$ = this.interviewResult$.pipe(
    map((result) => result.Creative_Species)
  );

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
