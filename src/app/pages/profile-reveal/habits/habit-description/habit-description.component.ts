import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HABITS_DARK } from 'src/app/core/models/habits.model';
import { FADE_HABITS, SLIDE_FROM_LEFT } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-habit-description',
  templateUrl: './habit-description.component.html',
  styleUrls: ['./habit-description.component.scss'],
  animations: [SLIDE_FROM_LEFT, FADE_HABITS],
})
export class HabitDescriptionComponent implements OnInit {
  @Input() habit: string = '';
  darkModeHabits = HABITS_DARK;

  @Output() close = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  closeDetails() {
    this.close.next();
  }
}
