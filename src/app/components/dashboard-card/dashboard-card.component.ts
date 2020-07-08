import { Component, OnInit, Input } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import * as Chart from 'chart.js';

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

  chart: Chart;
  canvas: any;
  ctx: any;
  country: any;
  cases: any;

  // tslint:disable-next-line: variable-name


  constructor(private dataService: DataServicesService) { }

  pageChanged(event) {
    this.p = event;
  }

  ngOnInit(): void {
    this.getAllData();
    this.getByCountry('c');
  }

  getAllData(): void {
    this.dataService.getGlobalData()
      .subscribe({
        next: (result) => {
          this.globalata = result;
          result.forEach(cs => {

            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths += cs.deaths;
              this.totalRecovered += cs.recovered;
            }
            // tslint:disable-next-line: no-unused-expression
            cs.country;
          });
          // // tslint:disable-next-line: no-shadowed-variable
          // // tslint:disable-next-line: no-shadowed-variable
          // const death = result.map(result => result.deaths);
          // // tslint:disable-next-line: no-shadowed-variable
          // const recovered = result.map(result => result.recovered);
          // // tslint:disable-next-line: no-shadowed-variable
          // const active = result.map(result => result.active);
          // // tslint:disable-next-line: no-shadowed-variable
          // const confirmed = result.map(result => result.confirmed);
          // console.log(this.globalata);



          this.canvas = document.getElementById('myChart');
          this.ctx = this.canvas.getContext('2d');

          const myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
              labels: ['Mort', 'Cas guerris', 'cas actifs', 'cas confirmés'],
              datasets: [{
                label: 'stats coronavirus dans le monde',
                data: [this.totalDeaths, this.totalRecovered, this.totalActive, this.totalConfirmed],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
          });


          this.canvas = document.getElementById('pieChart');
          this.ctx = this.canvas.getContext('2d');

          const pieChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
              labels: ['Mort', 'Cas guerris', 'cas actifs', 'cas confirmés'],
              datasets: [{
                label: 'stats coronavirus dans le monde',
                data: [this.totalDeaths, this.totalRecovered, this.totalActive, this.totalConfirmed],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',

                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',

                ],
                borderWidth: 2
              }]
            },
          });



        }

      });
  }

  getByCountry(caseType: string) {
    this.dataService.getGlobalData()
      .subscribe({
        next: (result) => {
          this.globalata = result;
          const dataCountry = [];
          const dataConfirm = [];
          result.forEach(cs => {
            let value: number;
            if (caseType === 'c') {
              if (cs.confirmed > 2000) {
               value = cs.confirmed;
              }
            }
            if (caseType === 'm') {
              if (cs.deaths > 2000) {
               value = cs.deaths;
              }
            }
            if (caseType === 'a') {
              if (cs.active > 2000) {
                value = cs.active;
              }
            }
            if (caseType === 'd') {
              if (cs.recovered > 2000) {
                value = cs.recovered;
              }
            }
            dataCountry.push(cs.country);
            dataConfirm.push(value);
          });

          // tslint:disable-next-line: variable-name
          const ict_unit = [];
          const efficiency = [];
          const coloR = [];

          const dynamicColors = () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            const a = Math.floor(Math.random() * 20);
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
          };

          // tslint:disable-next-line: forin
          for (let i in result) {
            ict_unit.push('ICT Unit ' + result[i].ict_unit);
            efficiency.push(result[i].efficiency);
            coloR.push(dynamicColors());
          }

          this.canvas = document.getElementById('countryChart');
          this.ctx = this.canvas.getContext('2d');
          const countryChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
              labels: dataCountry,
              datasets: [{
                label: 'stats par pays / nombre de cas confirmés',
                data: dataConfirm,
                backgroundColor: coloR,
                borderWidth: 1
              }]
            },
          });
        }
      });
  }

  updateChart(input: HTMLInputElement) {
    console.log(input);
    this.getByCountry(input.value);
  }
}
