import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth.guard';
import { SpeciesComponent } from './species/species.component';
import { NameProfileComponent } from './name/name.component';
import { ProfileRevealComponent } from './profile-reveal.component';
import { RareBreedComponent } from './rare-breed/rare-breed.component';
import { HabitsComponent } from './habits/habits.component';
import { LandscapeComponent } from './landscape/landscape.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileRevealComponent,
    children: [
      { path: '', component: NameProfileComponent, canActivate: [AuthGuard], data: {animation: 'IntroPage'} },
      { path: 'rare-breed', component: RareBreedComponent, canActivate: [AuthGuard], data: {animation: 'RareBreedPage'} },
      { path: 'species', component: SpeciesComponent, canActivate: [AuthGuard], data: {animation: 'SpeciesPage'} },
      { path: 'habits', component: HabitsComponent, canActivate: [AuthGuard], data: {animation: 'HabitsPage'} },
      { path: 'landscape', component: LandscapeComponent, canActivate: [AuthGuard], data: {animation: 'LandscapePage'} },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRevealRoutingModule { }
