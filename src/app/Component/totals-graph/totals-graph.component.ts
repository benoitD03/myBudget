import {Component, OnInit} from '@angular/core';
import {TotauxService} from "../../services/totaux.service";

@Component({
  selector: 'app-totals-graph',
  templateUrl: './totals-graph.component.html',
  styleUrls: ['./totals-graph.component.scss']
})
export class TotalsGraphComponent implements OnInit{

  constructor( private totauxService : TotauxService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.totauxService.createChart(this.totauxService.totalRevenu, this.totauxService.totalDepense, this.totauxService.epargnePossible);
     }, 100);
  }
}
