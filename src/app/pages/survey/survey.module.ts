import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeedComponent } from './seed/seed.component';
import { QuestionComponent } from './question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FaqSurveyComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [
    SurveyComponent,
    ProgressComponent,
    SeedComponent,
    QuestionComponent,
    FaqSurveyComponent,
    PolicyComponent,
  ],
  exports: [SurveyComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SurveyModule {}
