import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  showPolicy = false;
  showBackdrop = false;
  showModal = false;

  constructor() { }

  ngOnInit(): void {
    this.show();
  }

  show() {
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
      this.showPolicy = true;
    }, 500);
    setTimeout(() => {
      this.showBackdrop = true;
    }, 600);
    setTimeout(() => {
      this.showModal = true;
    }, 1200);
  }

  close() {
    this.showModal = false;
    setTimeout(() => {
      this.showBackdrop = false;
    }, 500);
    setTimeout(() => {
      this.showPolicy = false;
      document.body.style.overflow = '';
    }, 600);
  }
}
