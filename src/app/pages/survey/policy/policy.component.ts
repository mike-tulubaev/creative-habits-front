import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  showPolicy = false;

  constructor() { }

  ngOnInit(): void {
    this.show();
  }

  show() {
    document.body.style.overflow = 'hidden';
    this.showPolicy = true;
  }

  close() {
    document.body.style.overflow = '';
    this.showPolicy = false;
  }
}
