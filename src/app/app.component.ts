import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, pairwise, tap } from 'rxjs/operators';
import { AppState } from './core/ngxs/app/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menuOpenTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  showMenu: boolean = false;
  title = 'hacking-creativity';

  isLoading$: Observable<boolean> = this.store.select(AppState.isLoading);

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.closeMenu());

    this.store
      .select((state) => state.auth.isAuthenticated)
      .pipe(
        tap((val) => {
          if (!val) {
            this.router.navigate(['/']);
          }
        })
      )
      .subscribe();
  }

  openMenu() {
    this.showMenu = true;
  }

  closeMenu() {
    this.showMenu = false;
  }
}
