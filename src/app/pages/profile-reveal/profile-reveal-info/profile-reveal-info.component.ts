import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile-reveal-info',
  templateUrl: './profile-reveal-info.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileRevealInfoComponent implements OnInit {
  @Output() close: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeInfo() {
    this.close.next();
  }
}
