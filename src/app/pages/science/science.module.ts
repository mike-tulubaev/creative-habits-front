import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScienceComponent } from './science.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TeamDescriptionComponent } from './team-description/team-description.component';

@NgModule({
  declarations: [ScienceComponent, TeamDescriptionComponent],
  exports: [ScienceComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ScienceModule {}
