import { Component, OnInit, Input } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {


  // tslint:disable-next-line: no-input-rename
  @Input('totalConfirmed') totalConfirmed;
  // tslint:disable-next-line: no-input-rename
  @Input('totalActive') totalActive;
  // tslint:disable-next-line: no-input-rename
  @Input('totalDeaths') totalDeaths;
  // tslint:disable-next-line: no-input-rename
  @Input('totalRecovered') totalRecovered;

  // tslint:disable-next-line: no-shadowed-variable

  p = 1;

  globalata: GlobalDataSummery[] = [];

  constructor(private dataService: DataServicesService)
  { }

   pageChanged(event){
    this.p = event;
  }

  ngOnInit(): void {

    this.getAll();
  }

getAll() {

  this.dataService.getGlobalData()
  .subscribe({
    next: (result) => {
      this.globalata = result;
      // tslint:disable-next-line: no-unused-expression
      result.forEach(cs => {

          if (!Number.isNaN(cs.confirmed)) {
          this.totalActive += cs.active;
          this.totalConfirmed += cs.confirmed;
          this.totalDeaths += cs.deaths;
          this.totalRecovered += cs.recovered;
        }
      });

      console.log(this.globalata);
    }
  });

}

}
