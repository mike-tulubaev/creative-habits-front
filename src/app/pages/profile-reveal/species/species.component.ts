import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import {
  CreativeSpeciesEnum,
  CREATIVE_SPECIES_WHITE_BG,
} from 'src/app/core/models/creative-species.enum';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { SCROLL_TIMEOUT, DELTA_LIMIT } from 'src/app/core/scroll.settings';
import { FADE_IN_OUT } from 'src/app/shared/animations/enter-leave.animation';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
  animations: [FADE_IN_OUT],
  encapsulation: ViewEncapsulation.None,
})
export class SpeciesComponent implements OnInit {
  //-- scroll routing --//
  private timeout = SCROLL_TIMEOUT;
  private scrollRoutingIsActive = false;
  private _delta = 0;
  private set delta(v: number) {
    this._delta = v;
    if (this._delta > DELTA_LIMIT) {
      document.querySelector('app-species-description')?.classList.add('leave');
      setTimeout(() => {
        this._delta = 0;
        this.router.navigate(['/profile-reveal', 'habits']);
      }, 750);
    }
  }
  private get delta(): number {
    return this._delta;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    event.preventDefault();
    if (this.scrollRoutingIsActive) {
      this.delta += event.deltaY;
      if(this.delta < 0) this.delta = 0;
    }
  }
  //-- scroll routing end --//

  creativeSpeciesEnum = CreativeSpeciesEnum;
  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = this.store
    .select(InterviewState.result)
    .pipe(map((result) => result?.Creative_Species));

  darkModeClass$ = this.createiveSpecies$.pipe(
    map((species) =>
      species ? CREATIVE_SPECIES_WHITE_BG.includes(species) : false
    )
  );

  colFlowerClass$ = this.createiveSpecies$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'col--focus-mononovous-text';
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'col--mono-routinus-text';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'col--novo-gregarious-text';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'col--socialis-adventurous-text';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'col--solo-noctus-text';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'col--sui-inspira-text';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'col--yolov-haotis--text';
        default:
          return '';
      }
    })
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }

}
