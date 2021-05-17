import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() closeMenu = new EventEmitter<null>();

  interviewResult$: Observable<boolean> = this.store
    .select(InterviewState.result)
    .pipe(map((result) => !!result));

  constructor(private store: Store) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.closeMenu.next();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
