import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import * as Chart from 'chart.js';
import { CssSelector } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart: any;

  constructor(private dataService: DataServicesService) {   }


  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalata : GlobalDataSummery[] = [] ;


  initChart() {
    const dataTable = [];
    dataTable.push(['Pays' , ' Cas confirmés']);
    this.globalata.map(x => {
     dataTable.push([
      x.country,
      x.confirmed
     ]);

   });

    console.log(dataTable);

    const ctx = 'myChart';
    this.chart = new Chart(ctx, {
      type: 'pie',
      data : {
        datasets: [{
          label: '# of Votes',
          data : dataTable
         }]
      }
    });

  }


  ngOnInit(): void {

    this.dataService.getGlobalData()
    .subscribe({
      next : (result) => {
        this.globalata = result;
        result.forEach(cs => {

        if(!Number.isNaN(cs.confirmed)) {
         this.totalActive += cs.active;
         this.totalConfirmed += cs.confirmed;
         this.totalDeaths += cs.deaths;
         this.totalRecovered += cs.recovered;
        }
       });

        console.log(this.globalata);
      }
});
    this.initChart();
  }

}



