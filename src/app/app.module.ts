import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProfileRevealModule } from './pages/profile-reveal/profile-reveal.module';
import { CreativeLandscapeModule } from './pages/creative-landscape/creative-landscape.module';
import { HomeModule } from './pages/home/home.module';
import { ScienceModule } from './pages/science/science.module';
import { SurveyModule } from './pages/survey/survey.module';
import { TeamModule } from './pages/team/team.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { CacheDirective } from './shared/cache/cache.directive';
import { PreloaderService } from './shared/cache/preloader.service';

export function preloaderFunction(service: PreloaderService) {
  // service.preload('/assets/img/intro/img1.png');
  // service.preload('/assets/img/intro/img2.png');
  // service.preload('/assets/img/intro/img3.png');
  // service.preload('/assets/img/intro/img4.png');
  // service.preload('/assets/img/home/title.svg');
  // service.preload('/assets/video/Landscapes.mp4');
  // service.preload('/assets/video/home-bg.mp4');
  // service.preload('/assets/img/habits/Monotasker.png');
  // service.preload("/assets/img/habits/Multitasker.png");
  // service.preload("/assets/img/habits/Specialist.png");
  // service.preload("assets/img/habits/Solo-Creator.png");
  // service.preload("/assets/img/habits/Collaborator.png");
  // service.preload("/assets/img/habits/Self-Assured.png");
  // service.preload("assets/img/habits/Love-Distractions.png");
  // service.preload("/assets/img/habits/Dislike-Distractions.png");
  // service.preload("/assets/img/habits/Inwardly-Inspired.png");
  // service.preload("/assets/img/habits/Outwardly-Inspired-5.png");
  // service.preload("/assets/img/habits/Rational.png");
  // service.preload("/assets/img/habits/Intuitive.png");
  // service.preload("/assets/img/habits/Internally-Motivated.png");
  // service.preload("/assets/img/habits/Externally-Motivated.png");
  // service.preload("/assets/img/habits/Kinetic.png");
  // service.preload("/assets/img/habits/Non-Kinetic.png");
  // service.preload("/assets/img/habits/Comfortable-with-Mess.png");
  // service.preload("/assets/img/habits/Slow-Paced.png");
  // service.preload("/assets/img/habits/Fast-Paced.png");
  // service.preload("/assets/img/habits/Risk-Averse.png");
  // service.preload("/assets/img/habits/Risk-Friendly.png");
  // service.preload("/assets/img/habits/Make-it-Happen.png");
  // service.preload("/assets/img/habits/Let-it-Happen.png");
  // service.preload("/assets/img/habits/Tenacious.png");
  // service.preload("/assets/img/habits/Reframer.png");
  // service.preload("/assets/img/habits/Public-Spaces.png");
  // service.preload("/assets/img/habits/Private-Spaces.png");
  // service.preload("/assets/img/habits/Noise.png");
  // service.preload("/assets/img/habits/Nature-Lover.png");
  // service.preload("/assets/img/habits/Nature-Agnostic.png");
  // service.preload("/assets/img/habits/Novelty-Seeker.png");
  // service.preload("/assets/img/habits/Routine-Seeker.png");
  // service.preload("/assets/img/habits/Stifled-by-Constraints.png");
  // service.preload("/assets/img/habits/Stimulated-by-Constraints.png");
  // service.preload("/assets/img/habits/Early-Bird.png");
  // service.preload("/assets/img/habits/Night-Owl.png");

  // service.preload("/assets/img/landscape/map/map.png");
  // service.preload("/assets/img/landscape/map/focus_mononovous_map.png");
  // service.preload("/assets/img/landscape/map/mono_routinus_map.png");
  // service.preload("/assets/img/landscape/map/novo_gregarious_map.png");
  // service.preload("/assets/img/landscape/map/socialis_adventurous_map.png");
  // service.preload("/assets/img/landscape/map/solo_noctus_map.png");
  // service.preload("/assets/img/landscape/map/sui_inspira_map.png");
  // service.preload("/assets/img/landscape/map/yolo_chaotis_map.png");

  // service.preload("/assets/img/landscape/plants/focus_mononovous_white.png");
  // service.preload("/assets/img/landscape/plants/focus_mononovous.png");
  // service.preload("/assets/img/landscape/plants/solo_noctus_white.png");
  // service.preload("/assets/img/landscape/plants/solo_noctus.png");
  // service.preload("/assets/img/landscape/plants/sui_inspira_white.png");
  // service.preload("/assets/img/landscape/plants/sui_inspira.png");
  // service.preload("/assets/img/landscape/plants/mono_routinus_white.png");
  // service.preload("/assets/img/landscape/plants/mono_routinus.png");
  // service.preload("/assets/img/landscape/plants/socialis_adventurous_white.png");
  // service.preload("/assets/img/landscape/plants/socialis_adventurous.png");
  // service.preload("/assets/img/landscape/plants/yolo_chaotis_white.png");
  // service.preload("/assets/img/landscape/plants/yolo_chaotis.png");
  // service.preload("/assets/img/landscape/plants/novo_gregarious_white.png");
  // service.preload("/assets/img/landscape/plants/novo_gregarious.png");

  // service.preload("/assets/img/landscape/science.png");

  // service.preload("/assets/img/species/rare_breed_bg.png");
  // service.preload("/assets/img/species/rare_breed_title.svg");

  // service.preload("/assets/img/survey/seed-animation.gif");
  // service.preload("/assets/img/science/fig1.png");
  // service.preload("/assets/img/science/fig2.png");

  // service.preload("/assets/img/science/results1.png");
  // service.preload("/assets/img/science/results2.png");
  // service.preload("/assets/img/science/results3.png");
  // service.preload("/assets/img/science/results4.png");
  // service.preload("/assets/img/science/results5.png");
  // service.preload("/assets/img/science/results6.png");
  // service.preload("/assets/img/science/results7.png");
  // service.preload("/assets/img/science/study_bg.png");

  // service.preload("/assets/video/seed_wide.mp4");
  // service.preload("/assets/seedling-new.gif");
  // service.preload("/assets/img/survey/seed1.png");
  return () => service.complete.toPromise();
  // return () =>  new Promise((resolve, reject) => { })
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    ProfileRevealModule,
    CreativeLandscapeModule,
    HomeModule,
    ScienceModule,
    SurveyModule,
    TeamModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {

  }
}
