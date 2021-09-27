import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';
import { InterviewResultModel } from 'src/app/core/models/interview-result.model';
import {
  SelectedClusterOfLandscapeHabitsAction,
  SetLastSelectedClusterAction,
  SetWasLandscapeIntroShownAction,
} from 'src/app/core/ngxs/app/app.actions';
import { AppState } from 'src/app/core/ngxs/app/app.state';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { DELTA_LIMIT, SCROLL_TIMEOUT } from 'src/app/core/scroll.settings';
import {
  APPEARENCE_DELAY_500,
  FADE_APPEARENCE_DELAY_500,
} from 'src/app/shared/animations/enter-leave.animation';
import { MAP_STATES } from 'src/app/shared/animations/state-transition.animation';

enum LandscapeStepsEnum {
  INTRO,
  MAP_ALL,
  HABITS,
}

@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [APPEARENCE_DELAY_500, FADE_APPEARENCE_DELAY_500, MAP_STATES],
})
export class LandscapeComponent implements OnInit {
  public get selectedCluster(): CreativeSpeciesEnum | undefined {
    return this._selectedCluster;
  }
  public set selectedCluster(v: CreativeSpeciesEnum | undefined) {
    this._selectedCluster = v;
    this.store.dispatch(new SetLastSelectedClusterAction(v));
  }
  //-- scroll routing --//
  private timeout = SCROLL_TIMEOUT;
  private scrollRoutingIsActive = false;
  private _delta = 0;
  private scrollTimer: any;
  private set delta(v: number) {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    this._delta = v;
    if (Math.abs(this._delta) > DELTA_LIMIT) {
      if (this._delta < 0) {
        this._delta = 0;
        this.goToPrevStep();
      } else {
        this._delta = 0;
        this.goToNextStep();
      }
    } else if (this._delta !== 0) {
      this.scrollTimer = setTimeout(() => {
        this._delta = 0;
      }, this.timeout);
    }
  }
  private get delta(): number {
    return this._delta;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (this.scrollRoutingIsActive) {
      this.delta += event.deltaY;
    }
  }
  //-- scroll routing end --//

  steps = LandscapeStepsEnum;
  step = this.steps.INTRO;

  clusters = CreativeSpeciesEnum;
  _selectedCluster: CreativeSpeciesEnum | undefined = undefined;
  areClustersSelectable = false;

  interviewResult$: Observable<InterviewResultModel> = this.store
    .select(InterviewState.result)
    .pipe(filter((res) => !!res)) as Observable<InterviewResultModel>;

  //for map
  affinity$ = this.interviewResult$.pipe(
    map((result) => ({
      MONO_ROUTINUS: result['Mono Routinus_affinity'] * 100,
      YOLO_CHAOTIS: result['Yolo Chaotis_affinity'] * 100,
      SOCIALIS_ADVENTUROUS: result['Socialis Adventurous_affinity'] * 100,
      FOCUS_MONONOVOUS: result['Focus Mononovous_affinity'] * 100,
      NOVO_GREGARIOUS: result['Novo Gregarious_affinity'] * 100,
      SUI_INSPIRA: result['Sui Inspira_affinity'] * 100,
      SOLO_NOCTUS: result['Solo Noctus_affinity'] * 100,
    }))
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.activateScrollRouting();
  }

  goToNextStep() {
    if(this.step == this.steps.INTRO) {
      this.step++;
      this.activateScrollRouting();
    }
    if(this.step == this.steps.MAP_ALL) {
      this.makeClustersSelectable();
    }
  }

  goToPrevStep() {
    this.activateScrollRouting();
    if (this.step > this.steps.INTRO) {
      this.step--;
      if (this.step === this.steps.MAP_ALL) {
        this.selectedCluster = undefined;
      }
    } else {
      this.interviewResult$.pipe(first()).subscribe((result) => {
        if (result.Creative_Species === -1) {
          this.router.navigate(['/profile-reveal', 'rare-breed']);
        } else {
          this.router.navigate(['/profile-reveal', 'habits']);
        }
      });
    }
  }

  goToMap() {
    this.activateScrollRouting();
    this.selectedCluster = undefined;
    this.step = this.steps.MAP_ALL;
    this.makeClustersSelectable();
  }

  goToHabits() {
    this.scrollRoutingIsActive = false;
    this.interviewResult$.pipe(first()).subscribe((result) => {
      if(this.selectedCluster) {
        this.store.dispatch(
        new SelectedClusterOfLandscapeHabitsAction(
          this.selectedCluster ? this.selectedCluster : result.Creative_Species
        )
      );
      }
    });
    this.step = this.steps.HABITS;
  }

  onMouseEnterPlant(event: MouseEvent) {
    if (this.step === this.steps.MAP_ALL && this.areClustersSelectable) {
      const target = event.target as HTMLElement;
      const clusterName = target.dataset.cluster!;
      this.selectedCluster = clusterName as CreativeSpeciesEnum;
    }
  }

  onMouseLeavePlant(event: MouseEvent) {
    if (this.step === this.steps.MAP_ALL) {
      this.selectedCluster = undefined;
    }
  }

  private activateScrollRouting() {
    this.scrollRoutingIsActive = false;
    setTimeout(() => {
      this.scrollRoutingIsActive = true;
    }, this.timeout);
  }

  private makeClustersSelectable() {
    this.areClustersSelectable = false;
    setTimeout(() => (this.areClustersSelectable = true), 100);
  }
}
