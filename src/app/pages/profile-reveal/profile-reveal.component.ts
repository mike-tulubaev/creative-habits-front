import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
  group,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, startWith, takeUntil } from 'rxjs/operators';
import {
  CreativeSpeciesEnum,
  CREATIVE_SPECIES_WHITE_BG,
} from 'src/app/core/models/creative-species.enum';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-profile-reveal',
  templateUrl: './profile-reveal.component.html',
  styleUrls: ['./profile-reveal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routeAnimations', [
      transition('IntroPage => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              display: 'block',
              width: '100vw',
              zIndex: '1',
            }),
          ],
          {
            optional: true,
          }
        ),
        query(':leave', [
          style({
            opacity: 1,
            display: 'block',
            zIndex: '2',
          }),
        ]),
        query(':leave', [animate('0.5s', style({ opacity: 0 }))]),
        query(':enter', [animate('0.5s', style({ opacity: 1 }))], {
          optional: true,
        }),
      ]),      transition('* <=> *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              display: 'block',
              position: 'static',
              zIndex: '1',
            }),
          ],
          {
            optional: true,
          }
        ),
        query(
          ':leave',
          [
            style({
              opacity: 1,
              display: 'block',
              position: 'absolute',
              width: '100%',
              zIndex: '2',
            }),
          ],
          { optional: true }
        ),
        group([
          query(':leave', animateChild(), { optional: true }),
          query(':enter', [animate('1s', style({ opacity: 1 }))], {
            optional: true,
          }),
          query(':enter', animateChild(), { optional: true }),
          query(':leave', [animate('1s', style({ opacity: 0 }))], {
            optional: true,
          }),
        ]),
      ]),
    ]),
  ],
})
export class ProfileRevealComponent implements OnInit {
  private _destroy$: Subject<void> = new Subject<void>();
  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = this.store
    .select(InterviewState.result)
    .pipe(map((result) => result?.Creative_Species));

  pageBackground$ = this.createiveSpecies$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'assets/video/FocusMononovous.mp4';
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'assets/video/MonoRoutinus.mp4';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'assets/video/NovoGregarious.mp4';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'assets/video/SocialisAdventurous.mp4';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'assets/video/SoloNoctus.mp4';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'assets/video/SuiInspira.mp4';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'assets/video/YoloChaotis.mp4';
        default:
          return '';
      }
    })
  );

  titleImg$ = this.createiveSpecies$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'assets/img/species/focus_mononovous_title.svg';
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'assets/img/species/mono_routinus_title.svg';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'assets/img/species/novo_gregarious_title.svg';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'assets/img/species/socialis_adventurous_title.svg';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'assets/img/species/solo_noctus_title.svg';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'assets/img/species/sui_inspira_title.svg';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'assets/img/species/yolo_haotis_title.svg';
        default:
          return '';
      }
    })
  );

  pageFlowerClass$ = this.createiveSpecies$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'page-species--focus-mononovous';
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'page-species--mono-routinus';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'page-species--novo-gregarious';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'page-species--socialis-adventurous';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'page-species--solo-noctus';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'page-species--sui-inspira';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'page-species--yolov-haotis';
        default:
          return '';
      }
    })
  );

  darkModeClass$ = this.createiveSpecies$.pipe(
    map((species) =>
      species ? CREATIVE_SPECIES_WHITE_BG.includes(species) : false
    ),
    map((isDark) => (isDark ? 'page-species--reveal-light-gradient' : ''))
  );

  pageProgess$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    map(() => this.router.parseUrl(this.router.url)),
    map(
      (url) =>
        url.root.children.primary && url.root.children.primary.segments[1]?.path
    )
  );

  pageProgessClass$ = this.pageProgess$.pipe(
    map((page) => {
      switch (page) {
        case 'species':
          return 'page-species--reveal';
        case 'habits':
          return 'page-species--reveal page--habits';
        default:
          return 'page-species--intro';
      }
    })
  );

  pageClasses$ = combineLatest([
    this.pageFlowerClass$,
    this.pageProgessClass$,
    this.darkModeClass$,
  ]).pipe(map((classes) => classes.join(' ')));

  showProfileRevealInfo = false;

  constructor(
    private store: Store,
    private navbarService: NavbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  prepareRoute() {
    const outletName =
      this.route.snapshot &&
      this.route.snapshot.data &&
      this.route.snapshot.data.animation;
    return outletName ? outletName : 'UndefinedPage';
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this._destroy$)).subscribe(ev => {
      if (ev instanceof NavigationStart && ev.url === '/profile-reveal') {
        this.createiveSpecies$.pipe(first()).subscribe((cluster) => {
          if (cluster === CreativeSpeciesEnum.RARE_BREED) {
            this.router.navigate(['rare-breed'], { relativeTo: this.route });
          }
        });
      }
    })
    this.createiveSpecies$.pipe(first()).subscribe((cluster) => {
      if (cluster === CreativeSpeciesEnum.RARE_BREED) {
        this.router.navigate(['rare-breed'], { relativeTo: this.route });
      }
    });

    this.navbarService.showProfileRevealInfo$.subscribe(() => {
      this.showProfileRevealInfo = true;
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.height = '');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.width = '');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.overflow = '');
    this._destroy$.next();
    this._destroy$.complete();
  }

  hideInfo() {
    this.showProfileRevealInfo = false;
  }
}
