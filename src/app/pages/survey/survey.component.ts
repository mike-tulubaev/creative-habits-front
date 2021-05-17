import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Question } from 'src/app/core/models/question.model';
import { InterviewService } from 'src/app/core/services/interview.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  @ViewChild('video') videoElem: ElementRef<HTMLVideoElement> | undefined;

  question: Observable<Question> = this.route.params.pipe(
    switchMap((params) => this.interviewService.getQuestion(params.question))
  );
  index: Observable<number> = this.route.params.pipe(
    map((params) => Number.parseInt(params.question))
  );
  progress: Observable<number> = this.interviewService.getProgress();
  showSurveyCompleted: boolean = false;
  showFAQ: boolean = false;
  maxTime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.interviewService.loadQuestionList();
    this.interviewService.interviewCompleted$.subscribe(() => {
      this.showSurveyCompleted = true;
    });
    this.navbarService.showSurveyFAQ$.subscribe(() => {
      this.showFAQ = true;
    });
  }

  vidProps(event: any) {
    this.progress.pipe(first()).subscribe((progress) => {
      if (this.videoElem) {
        this.videoElem.nativeElement.playbackRate = 0.75;
        this.videoElem.nativeElement.currentTime =
          event.srcElement.duration * progress;
      }
    });
    if (this.videoElem) {
      this.progress.subscribe((progress) => {
        if (this.videoElem) {
          this.maxTime = this.videoElem.nativeElement.duration * progress;
          if (this.videoElem.nativeElement.currentTime < this.maxTime) {
            this.videoElem.nativeElement.play();
          }
        }
      });
    }
  }

  onTimeUpdate() {
    if (this.videoElem) {
      if (this.videoElem.nativeElement.currentTime >= this.maxTime) {
        this.videoElem.nativeElement.pause();
      }
    }
  }

  hideSurveyCompleted() {
    this.showSurveyCompleted = false;
  }

  hideFAQ() {
    this.showFAQ = false;
  }

  sendInterview() {
    this.interviewService.sendInterview();
  }
}
