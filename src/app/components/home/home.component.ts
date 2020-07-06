import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import { AllData } from 'src/app/models/allData';
import * as Chart from 'chart.js';
import { ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart: Chart;


  // initChart() {

  //   const dataTable = [];
  //   this.dataService.getGlobalData()
  //         .subscribe({
  //           next: (data) => {
  //             this.globalata = data;
  //             data.forEach(cs => {
  //               dataTable.push([
  //                 cs.confirmed,
  //                 cs.active,
  //                 cs.deaths,
  //                 cs.recovered
  //               ]);
  //             });
  //             console.log(dataTable);
  //           }
  //         });
  // }

  constructor(private dataService: DataServicesService) { }

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalata: GlobalDataSummery[] = [];
  allDataOfCovid  =  [];


  // const ctx = 'myChart';
  // this.chart = new Chart(ctx, {
  //   type: 'pie',
  //   data : {
  //     datasets: [{
  //       label: '# of Votes',
  //       data : dataTable
  //      }]
  //   }
  // });

  ngOnInit(): void {


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

          console.log(this.globalata);
        }
      });
    this.initChart();
    console.log(this.allDataOfCovid);

  }


  initChart() {

    // tslint:disable-next-line: one-variable-per-declaration
    const dataTable = [];
    const death = [];
    const recovered = [];

    if (this.globalata === null) {
      console.log('no data');
    } else {
      // tslint:disable-next-line: only-arrow-functions
      // tslint:disable-next-line: variable-name
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
              // tslint:disable-next-line: no-shadowed-variable
              dataTable.push(this.totalDeaths);
            });
          }
        });

      console.log(dataTable);
      console.log(death);
      console.log(recovered);
    }


    const ctx = 'myChart';
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [ 'cas active'],
        datasets: [
          {
            backgroundColor: ['#3e95cd'],
            data: dataTable,
            borderColor: '#3cba9f',
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
  }



}



// const ctx = 'myChart';
// const myChart = new Chart( ctx, {
//         type: 'bar',
//         data: {
//             labels: ['confirmed', 'active', 'mort', 'guerris'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: dataTable,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         }

//     });

//     console.log(myChart);
//   }





