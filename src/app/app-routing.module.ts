import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ScienceComponent } from './pages/science/science.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { TeamComponent } from './pages/team/team.component';
import { LoadingComponent } from './pages/loading/loading.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'loading', component: LoadingComponent, canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import(`./pages/home/home.module`).then(m => m.HomeModule) },
  { path: 'profile-reveal', loadChildren: () => import(`./pages/profile-reveal/profile-reveal.module`).then(m => m.ProfileRevealModule) },
  { path: 'science', component: ScienceComponent, canActivate: [AuthGuard] },
  { path: 'survey/:question', component: SurveyComponent, canActivate: [AuthGuard] },
  { path: 'survey', redirectTo: 'survey/1', pathMatch: 'full' },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: ':id', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
