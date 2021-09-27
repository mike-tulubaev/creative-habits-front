import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  fadeClass = '';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.fadeClass = 'in';
    }, 500);

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3500);
  }

}
