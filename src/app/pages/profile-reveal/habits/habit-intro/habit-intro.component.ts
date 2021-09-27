import { Component, OnInit } from '@angular/core';
import { FADE_HABIT_VIEW } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-habit-intro',
  templateUrl: './habit-intro.component.html',
  styleUrls: ['./habit-intro.component.scss'],
})
export class HabitIntroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
