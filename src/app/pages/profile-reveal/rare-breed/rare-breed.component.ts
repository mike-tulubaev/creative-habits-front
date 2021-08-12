import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClearInterview } from 'src/app/core/ngxs/interview/interview.actions';

@Component({
  selector: 'app-rare-breed',
  templateUrl: './rare-breed.component.html',
  styleUrls: ['./rare-breed.component.scss']
})
export class RareBreedComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
  }

  retake() {
    this.store.dispatch(new ClearInterview());
    this.router.navigate(['/survey']);
  }

  goToMap() {
    this.router.navigate(['../landscape'], { relativeTo: this.route });
  }
}
