import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';
import { InterviewState } from 'src/app/core/ngxs/interview/interview.state';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NameProfileComponent implements OnInit {
  @ViewChild('scrollIcon') scrollIcon: ElementRef<HTMLLinkElement> | undefined;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.scrollIcon) {
      const offset = document.documentElement.scrollTop;
      const height =
        document.documentElement.offsetHeight - window.innerHeight - 1;
      let opacity = offset / height;
      if (opacity > 1) {
        opacity = 1;
      }
      this.scrollIcon.nativeElement.style.opacity = opacity.toString();

      const element = document.documentElement;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.router.navigate(['profile-reveal', 'species']);
      }
    }
  }
  createiveSpecies$: Observable<
    CreativeSpeciesEnum | undefined
  > = this.store
    .select(InterviewState.result)
    .pipe(map((result) => result?.Creative_Species));

  flowerImg$ = this.createiveSpecies$.pipe(
    map((species) => {
      switch (species) {
        case CreativeSpeciesEnum.FOCUS_MONONOVOUS:
          return 'assets/img/species/focus_mononovous_scroll.png';
        case CreativeSpeciesEnum.MONO_ROUTINUS:
          return 'assets/img/species/mono_routinus_scroll.png';
        case CreativeSpeciesEnum.NOVO_GREGARIOUS:
          return 'assets/img/species/novo_gregarious_scroll.png';
        case CreativeSpeciesEnum.SOCIALIS_ADVENTUROUS:
          return 'assets/img/species/socialis_adventurous_scroll.png';
        case CreativeSpeciesEnum.SOLO_NOCTUS:
          return 'assets/img/species/solo_noctus_scroll.png';
        case CreativeSpeciesEnum.SUI_INSPIRA:
          return 'assets/img/species/sui_inspira_scroll.png';
        case CreativeSpeciesEnum.YOLO_CHAOTIS:
          return 'assets/img/species/yolo_haotis_scroll.png';
        default:
          return '';
      }
    })
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.height = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.width = '100%');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.overflow = 'auto')
  }

  ngAfterViewInit() {
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.height = '');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.width = '');
    // @ts-ignore
    document.querySelectorAll('html, body').forEach(x => x.style.overflow = '');
  }
}
