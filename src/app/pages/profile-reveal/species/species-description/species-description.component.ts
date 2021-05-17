import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CreativeSpeciesEnum } from 'src/app/core/models/creative-species.enum';

@Component({
  selector: 'app-species-description',
  templateUrl: './species-description.component.html',
  styleUrls: ['./species-description.component.scss'],
})
export class SpeciesDescriptionComponent implements OnInit {
  @Input() cluster: CreativeSpeciesEnum | null | undefined;

  creativeSpeciesEnum = CreativeSpeciesEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
