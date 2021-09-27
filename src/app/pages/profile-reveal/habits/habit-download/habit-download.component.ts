import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { DownloadResults } from 'src/app/core/ngxs/interview/interview.actions';
import { ClearInterview } from 'src/app/core/ngxs/interview/interview.actions';

@Component({
  selector: 'app-habit-download',
  templateUrl: './habit-download.component.html',
  styleUrls: ['./habit-download.component.scss']
})
export class HabitDownloadComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  download(event: Event) {
    event.preventDefault();
    this.store.dispatch(new DownloadResults());
    this.router.navigate(['/profile-reveal', 'landscape']);
  }  

  retake(event: Event) {
    event.preventDefault();
    this.store.dispatch(new ClearInterview());
    this.router.navigate(['/survey']);
  }  
}
