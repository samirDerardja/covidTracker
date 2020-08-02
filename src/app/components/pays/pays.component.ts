import { Component, Input, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import { DataWiseData } from 'src/app/models/data-wise-data';
import * as Chart from 'chart.js';
import 'chartjs-plugin-zoom';
import { Countries } from 'src/app/models/pays';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  cases: number;
  date: Date;
  p = 1;

  constructor(private service: DataServicesService) { }


  // tslint:disable-next-line: no-input-rename
  @Input('totalConfirmed') totalConfirmed;
  // tslint:disable-next-line: no-input-rename
  @Input('totalActive') totalActive;
  // tslint:disable-next-line: no-input-rename
  @Input('totalDeaths') totalDeaths;
  // tslint:disable-next-line: no-input-rename
  @Input('totalRecovered') totalRecovered;

  globalData: Countries[] = [];
  pays: string[] = [];
  country: any;
  selectCountrieData: DataWiseData[] = [];
  dateWiseData: DataWiseData[] = [];



  chart: Chart;
  canvas: any;
  ctx: any;
  dataTable: any[] = [];

  pageChanged(event) {
    this.p = event;
  }



  ngOnInit(): void {

    // tslint:disable-next-line: deprecation



    this.updateChart();


    this.service.getAllDataByCountry().subscribe(result => {
      this.globalData = result;
      console.log(result);

      this.globalData.forEach(cs => {
        this.pays.push(cs.countryName);
      });

    });

  }


  updateChart() {
    const dataTable = [];
    const cases = [];
    const date = [];
    dataTable.push(['Date', 'Cases']);
    this.selectCountrieData.forEach(cs => {
      cases.push(cs.cases);
      date.push(cs.date);
    });
    console.log(dataTable);


    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');


    const rangeMin = new Date(date[0]);  // start date
    rangeMin.setDate(rangeMin.getDate() + 15);

    const rangeMax = new Date(date[date.length - 1]);  // end date
    rangeMax.setDate(rangeMax.getDate() - 2);
    console.log(rangeMin);

    const myChart = new Chart(this.ctx, {

      type: 'line',
      data: {
        labels: date,
        datasets: [{

          label: 'Nombre de cas / jours',
          data: cases,
          backgroundColor: [
            'rgba(255,99,132,1)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          pointHoverBackgroundColor: [
            'rgba(0,0,0,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            distribution: 'linear',
            type: 'time',
            time: {
              unit: 'day',
              min: rangeMin.toDateString(),
              max: rangeMax.toDateString()
            },
            bounds:
              rangeMin.toDateString(),
          }],
        },
        // plugins: {
        //   pan: {
        //     enabled: true,
        //     mode: 'x',
        //     rangeMin: {
        //       x: rangeMin,
        //     },
        //     rangeMax: {
        //       x: rangeMax,
        //     },
        //   },
        //   zoom: {
        //     enabled: true,
        //     mode: 'x',
        //     threshold: date,
        //     rangeMin: {
        //       x: rangeMin,
        //     },
        //     rangeMax: {
        //       x: rangeMax,
        //     },
        //   },
        // }
      }

    });
  }



  updateValues(country: string) {
    console.log(country);
    // tslint:disable-next-line: no-shadowed-variable
    this.globalData.forEach(el => {
      // tslint:disable-next-line: triple-equals
      if (el.countryName == country) {

        this.totalDeaths = el.deaths;
        this.totalRecovered = el.recovered;
        this.totalConfirmed = el.confirmed;
        console.log(el.confirmed);

      }
    });
    this.selectCountrieData = this.globalData[country];
    console.log(this.selectCountrieData);
    this.updateChart();

  }



}


