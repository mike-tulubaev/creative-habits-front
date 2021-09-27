import { Component, OnInit, Input } from '@angular/core';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';
import { Selector } from '@ngxs/store';

@Component({
  selector: 'app-species-circles',
  templateUrl: './species-circles.component.html',
  styleUrls: ['./species-circles.component.scss']
})
export class SpeciesCirclesComponent implements OnInit {
  @Input() cluster: CreativeSpeciesEnum | null | undefined;
  @Input() dark: boolean | null | undefined;
  @Input() affinity: string | null | undefined;
  @Input() animated: boolean | null | undefined;

  creativeSpeciesEnum = CreativeSpeciesEnum;

  public clusterList: string[] = [];
  public circleTranslate: string = '60px';
  public valueTranslate: string = '0px';
  public isValueLeft = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  toggleCircleAnimation() {
    (this.animated) ? this.hideCircleAnimation() : this.showCircleAnimation();
  }

  showCircleAnimation() {
    this.animated = true;
    this.circleTranslate = '-' + this.affinity + '%';
  }

  hideCircleAnimation() {
    this.animated = false;
    this.circleTranslate = '60px';
  }

  ngOnChanges() {
    if (this.cluster) {
      this.clusterList = ('' + this.cluster).split(' ')
    }
    if (this.affinity) {
      this.isValueLeft = (this.affinity && parseInt(this.affinity) >= 50) ? false : true;
      const affinitiInt = parseInt(this.affinity);
      if (affinitiInt >= 50) {
        this.valueTranslate = '-' + (affinitiInt - 50) * 0.55 + 'px';
      }
      else {
        this.valueTranslate = '0px';
      }
    }
    if (this.animated) {
      this.showCircleAnimation();
    }
    else {
      this.hideCircleAnimation();
    }
  }
}
