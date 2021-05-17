import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { SetUserAuthenticated } from 'src/app/core/ngxs/auth/auth.actions';
import { SetInterviewResultAction } from 'src/app/core/ngxs/interview/interview.actions';
import { InterviewService } from 'src/app/core/services/interview.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalid = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe((params) => {
      if (params.id) {
        console.debug('>>>', params.id);
        this.interviewService.getResultById$(params.id).subscribe(
          (result) => {
            if (!!result && result.Creative_Species) {
              this.store.dispatch(new SetInterviewResultAction(result));
              this.store.dispatch(new SetUserAuthenticated(true));
              this.router.navigate(['/profile-reveal']);
            }
          },
          (error) => {

          }
        );
      }
    });

    const hasAuth = this.store.selectSnapshot(
      (state) => state.auth.isAuthenticated
    );

    if (hasAuth) {
      this.router.navigate(['/home']);
    }
  }

  validatePassword(text: string, ev: Event) {
    ev.preventDefault();
    this.invalid = false;
    if (text !== environment.password) {
      this.invalid = true;
    } else {
      this.store.dispatch(new SetUserAuthenticated(true));
      this.router.navigate(['/home']);
    }
  }
}
