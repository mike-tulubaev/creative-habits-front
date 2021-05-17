import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.getElementsByTagName('main')[0].classList.add('page--home-step1');
  }

  ngOnDestroy() {
    document.getElementsByTagName('main')[0].classList.remove('page--home-step1');
  }
}
