import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './controls/popup/popup.component';
import { TooltipComponent } from './controls/tooltip/tooltip.component';
import { NavbarComponent } from './controls/navbar/navbar.component';
import { MenuComponent } from './controls/menu/menu.component';
import { IconComponent } from './icon/icon.component';
import { RouterModule } from '@angular/router';
import { NavbarMenuComponent } from './controls/navbar/navbar-menu/navbar-menu.component';
import { PreloaderComponent } from './controls/preloader/preloader.component';
import { CacheDirective } from './cache/cache.directive';

@NgModule({
  declarations: [
    PopupComponent,
    TooltipComponent,
    NavbarComponent,
    NavbarMenuComponent,
    MenuComponent,
    IconComponent,
    PreloaderComponent,
    CacheDirective
  ],
  exports: [
    PopupComponent,
    TooltipComponent,
    NavbarComponent,
    MenuComponent,
    IconComponent,
    PreloaderComponent,
    CacheDirective
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
