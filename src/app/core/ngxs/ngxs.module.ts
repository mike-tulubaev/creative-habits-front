import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppState } from './app/app.state';
import { AuthState } from './auth/auth.state';
import { InterviewState } from './interview/interview.state';
import { QuestionsState } from './questions/questions.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([QuestionsState, InterviewState, AuthState, AppState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
      key: [InterviewState, AuthState, "app.wasLandscapeIntroShown"],
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
})
export class NgxsStoreModule {}
