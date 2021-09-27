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
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import { SpeciesViewEnum } from 'src/app/core/models/species.model';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpeciesComponent implements OnInit {
  public speciesView = SpeciesViewEnum.INTRO;
  //-- scroll routing --//
  private timeout = 500;
  private scrollRoutingIsActive = false;
  private _delta = 0;
  public isCirclesAnimated: boolean = false;
  private set delta(v: number) {
    this._delta = v;
    const element = document.querySelector('.row--species-reveal');
    if (element && this.scrollRoutingIsActive) {
      if (this._delta < 0 && element.scrollTop === 0) {
        this._delta = 0;
        this.goToPrevStep();
      }
      if (this._delta > 0 && element.scrollTop === element.scrollHeight - element.clientHeight) {
        this._delta = 0;
        this.goToNextStep();
      }
    }
    this.scrollRoutingIsActive = false;
  }
  private get delta(): number {
    return this._delta;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (this.scrollRoutingIsActive) {
      this.delta += event.deltaY;
      if (this.delta < 0) this.delta = 0;
    }

    if (!this.scrollRoutingIsActive) {
      const element = document.querySelector('.col--page-species');
      if (element && (element.scrollTop === element.scrollHeight - element.clientHeight || element.scrollTop === 0)) {
        this.activateScrollRouting();
      }
      return;
    }
  }
  //-- scroll routing end --//

  interviewResult$: Observable<InterviewResultModel> = this.store
    .select(InterviewState.result)
    .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  creativeSpeciesEnum = CreativeSpeciesEnum;
  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = this.store
    .select(InterviewState.result)
    .pipe(map((result) => result?.Creative_Species));

  clusterAffinity$ = this.interviewResult$.pipe(
    map((result) => result.Cluster_Affinity),
    map((affinity) => (affinity ? affinity * 100 : 0))
  );

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

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    //@ts-ignore
    document.querySelector('body')?.classList.add('fixed');
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }

  ngOnDestroy(): void {
    //@ts-ignore
    document.querySelector('body')?.classList.remove('fixed');
  }

  public goToNextStep = () => {
    this.scrollRoutingIsActive = false;
    if (this.speciesView != SpeciesViewEnum.CIRCLES) {
      this.speciesView = this.speciesView + 1;
      document.querySelector('app-species')?.classList.remove('up');
      document.querySelector('app-species')?.classList.add('down');
      return;
    }
    else if (!this.isCirclesAnimated) {
      this.isCirclesAnimated = true;
    }
    else {
      this.router.navigate(['/profile-reveal', 'habits']);
    }
  }

  goToPrevStep() {
    this.scrollRoutingIsActive = false;
    if (this.speciesView != SpeciesViewEnum.INTRO) {
      this.speciesView = this.speciesView - 1;
      document.querySelector('app-species')?.classList.add('up');
      document.querySelector('app-species')?.classList.remove('down');
      this.isCirclesAnimated = false;
      return;
    }
  }

  private activateScrollRouting() {
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }
}
