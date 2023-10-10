import { Component, Input } from '@angular/core';
import {Categorie} from "../../class/categorie";

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss']
})
export class CategorieCardComponent {
  panelOpenState = false;
  @Input() categorie: any;
}
