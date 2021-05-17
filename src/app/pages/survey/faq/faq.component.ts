import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqSurveyComponent implements OnInit {
  @Output() close: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeFAQ() {
    this.close.next();
  }
}
