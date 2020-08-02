import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import * as Chart from 'chart.js';
import { Global } from 'src/app/models/global';
import { ByCountries } from 'src/app/models/pays';
import { WorldCovid } from 'src/app/models/worldCovid';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})


export class DashboardCardComponent implements OnInit {



  // tslint:disable-next-line: no-input-rename
  @Input('totalConfirmed') totalConfirmed = 0;
  // tslint:disable-next-line: no-input-rename
  @Input('totalActive') totalActive = 0;
  // tslint:disable-next-line: no-input-rename
  @Input('totalDeaths') totalDeaths = 0;
  // tslint:disable-next-line: no-input-rename
  @Input('totalRecovered') totalRecovered = 0;

  // tslint:disable-next-line: no-shadowed-variable

  p = 1;

  glob: WorldCovid[] = [];
  pays: ByCountries[] = [];

  chart: Chart;
  canvas: any;
  ctx: any;
  country: any;
  cases: any;
  isLoadingResults = true;
  tbleByTotal: any[] = [];
  cT: any[] = [];
  cP: any[] = [];
  total: any[] = [];
  dataCountry = [];
  dataConfirm = [];
  countryTable: any[] = [];

  // tslint:disable-next-line: variable-name


  constructor(private dataService: DataServicesService) { }

  pageChanged(event) {
    this.p = event;
  }

  ngOnInit(): void {
    this.getData();
    this.getByCountry('c');
  }


  getData() {
    this.dataService.getAllDataCov()
      // tslint:disable-next-line: deprecation
      .subscribe(
        result => {
          if (typeof (result) === 'string') {
            result = JSON.parse(result);
          }

          // tslint:disable-next-line: only-arrow-functions
          const countryTable = Object.values(result);
          this.cT.push(countryTable);
          this.glob = this.cT;
          console.log(this.cT);

        });
}

getByCountry(caseType: string) {
  this.dataService.getAllDataByCountry()
    .subscribe(
      result => {
       this.pays = result;
       const forPays = Object.entries(result);
       console.log(forPays);

       this.pays.forEach(cs => {
          this.cP.push([
            cs.country,
            cs.activeCases,
            cs.dailyConfirmed,
            cs.totalConfirmed,
            cs.totalCritical,
            cs.totalDeaths,
            cs.totalRecovered
          ]);
        });
       console.log(this.cP);


        // tslint:disable-next-line: only-arrow-functions
      });
    }

            // tslint:disable-next-line: no-shadowed-variable

            // this.dataCountry.push(total[i].Slug);
            // console.log(this.dataCountry);

            // let value: number;
            // if (caseType === 'c') {
            //   // tslint:disable-next-line: no-unused-expression
            //   if (total[i].TotalConfirmed > 2000) {
            //     value = total[i].TotalConfirmed;
            //   }
            // }
            // if (caseType === 'm') {
            //   if (total[i].TotalDeaths > 1000) {
            //     value = total[i].TotalDeaths;
            //   }
            // }
            // if (caseType === 'd') {
            //   if (total[i].TotalRecovered > 2000) {
            //     value = total[i].TotalRecovered;
            //   }
            // }
            // dataCountry.push(this.cP);
            // console.log(dataCountry);
            // this.dataConfirm.push(value);
            // console.log(this.dataConfirm);


            // tslint:disable-next-line: variable-name
            // const ict_unit = [];
            // const efficiency = [];
            // const coloR = [];

            // const dynamicColors = () => {
            //   const r = Math.floor(Math.random() * 255);
            //   const g = Math.floor(Math.random() * 255);
            //   const b = Math.floor(Math.random() * 255);
            //   const a = Math.floor(Math.random() * 20);
            //   return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
            // };
            // tslint:disable-next-line: forin
            // for (let i in result) {
            //   ict_unit.push('ICT Unit ' + result[i].ict_unit);
            //   efficiency.push(result[i].efficiency);
            //   coloR.push(dynamicColors());
            // }
            // this.canvas = document.getElementById('countryChart');
            // this.ctx = this.canvas.getContext('2d');
            // const countryChart = new Chart(this.ctx, {
            //   type: 'bar',
            //   data: {
            //     labels: this.dataCountry,
            //     datasets: [{
            //       label: 'stats par pays / nombre de cas confirmés',
            //       data: this.dataConfirm,
            //       backgroundColor: coloR,
            //       borderWidth: 1
            //     }]
            //   },
            // });


// getByAllDataCountry(caseType: string) {
//   this.dataService.getAllDataByCountry()
//     .subscribe({
//       next: (result) => {
//         this.pays = result;

//         // tslint:disable-next-line: variable-name
//         const ict_unit = [];
//         const efficiency = [];
//         const coloR = [];

//         const dynamicColors = () => {
//           const r = Math.floor(Math.random() * 255);
//           const g = Math.floor(Math.random() * 255);
//           const b = Math.floor(Math.random() * 255);
//           const a = Math.floor(Math.random() * 20);
//           return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
//         };

//         // tslint:disable-next-line: forin
//         for (let i in result) {
//           ict_unit.push('ICT Unit ' + result[i].ict_unit);
//           efficiency.push(result[i].efficiency);
//           coloR.push(dynamicColors());
//         }

//         this.canvas = document.getElementById('countryChart');
//         this.ctx = this.canvas.getContext('2d');
//         const countryChart = new Chart(this.ctx, {
//           type: 'bar',
//           data: {
//             labels: dataCountry,
//             datasets: [{
//               label: 'stats par pays / nombre de cas confirmés',
//               data: dataConfirm,
//               backgroundColor: coloR,
//               borderWidth: 1
//             }]
//           },
//         });
//       }
//     });
// }





// //   getAllData(): void {
// //     this.dataService.getGlobalData()
// //       .subscribe({
// //         next: (result) => {
// //           this.globalata = result;
// //           result.forEach(cs => {

//             if (!Number.isNaN(cs.confirmed)) {
//               this.totalActive += cs.active;
//               this.totalConfirmed += cs.confirmed;
//               this.totalDeaths += cs.deaths;
//               this.totalRecovered += cs.recovered;
//             }
// //             // tslint:disable-next-line: no-unused-expression
// //             cs.country;
// //           });
//           // // tslint:disable-next-line: no-shadowed-variable
//           // // tslint:disable-next-line: no-shadowed-variable
//           // const death = result.map(result => result.deaths);
//           // // tslint:disable-next-line: no-shadowed-variable
//           // const recovered = result.map(result => result.recovered);
//           // // tslint:disable-next-line: no-shadowed-variable
//           // const active = result.map(result => result.active);
//           // // tslint:disable-next-line: no-shadowed-variable
//           // const confirmed = result.map(result => result.confirmed);
//           // console.log(this.globalata);


  }
