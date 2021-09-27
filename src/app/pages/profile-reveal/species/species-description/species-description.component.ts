import { Component, Input, OnInit } from '@angular/core';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';

@Component({
  selector: 'app-species-description',
  templateUrl: './species-description.component.html',
  styleUrls: ['./species-description.component.scss'],
})
export class SpeciesDescriptionComponent implements OnInit {
  @Input() cluster: CreativeSpeciesEnum | null | undefined;
  @Input() dark: boolean | null | undefined;
  @Input() landscapeMode: boolean | null | undefined;
  //@ts-ignore
  @Input() public nextStep:()=>void;

  creativeSpeciesEnum = CreativeSpeciesEnum;

  constructor() { }

  ngOnInit(): void {
  }

  gotoCircles(e:any) {
    e.preventDefault();
    this.nextStep();
  }
}
