import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreativeLandscapeRoutingModule } from './creative-landscape-routing.module';
import { CreativeLandscapeComponent } from './creative-landscape.component';

@NgModule({
  declarations: [CreativeLandscapeComponent],
  exports: [CreativeLandscapeComponent],
  imports: [CommonModule, CreativeLandscapeRoutingModule],
})
export class CreativeLandscapeModule {}
