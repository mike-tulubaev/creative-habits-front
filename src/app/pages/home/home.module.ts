import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { VideoComponent } from './video/video.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    IntroComponent,
    VideoComponent,
    TakeSurveyComponent,
  ],
  exports: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
