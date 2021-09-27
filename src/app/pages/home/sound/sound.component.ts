import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { Subject, pipe } from 'rxjs';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  showSound = false;
  showBackdrop = false;
  showModal = false;

  wasAudioBtnClick$:Subject<boolean>;

  constructor(private navbarService: NavbarService) {
    this.wasAudioBtnClick$ = this.navbarService.wasAudioBtnClick$;
    this.wasAudioBtnClick$.subscribe((val)=>{
      if(val) {
        this.close()
      }
    })
  }

  ngOnInit(): void {
    this.show();
  }

  show() {
    setTimeout(() => {
      document.body.style.overflow = 'hidden';
      this.showSound = true;
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
      this.showSound = false;
      document.body.style.overflow = '';
    }, 600);
  }

  playAudio() {
    this.navbarService.playAudio();
  }

  ngOnDestroy(): void {
    this.wasAudioBtnClick$.unsubscribe();
  }
}
