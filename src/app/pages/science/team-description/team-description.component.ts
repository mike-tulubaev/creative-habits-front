import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-team-description',
  templateUrl: './team-description.component.html',
  styleUrls: ['./team-description.component.scss'],
})
export class TeamDescriptionComponent implements OnInit {
  @Input() person: string = '';
  @Output() close: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  closeWindow() {
    this.close.next();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }
}
