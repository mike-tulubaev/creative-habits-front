import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth.guard';
import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: IntroComponent, canActivate: [AuthGuard] },
      { path: 'video', component: VideoComponent, canActivate: [AuthGuard] },
      { path: 'take-survey', component: TakeSurveyComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
