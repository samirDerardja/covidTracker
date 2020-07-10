import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {

  globalData: GlobalDataSummery[];
  pays: string[] = [];
  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  country: any;


  constructor(private data : DataServicesService) { }

  ngOnInit(): void {

    this.data.getGlobalData().subscribe(result => {
      this.globalData = result;
      console.log(result);

      this.globalData.forEach(cs =>  {
       this.pays.push(cs.country);
      });

    });

    this.updateValues(this.country.value);
  }

  updateValues(country : string) {
    console.log(country);
    this.globalData.forEach(element => {
      // tslint:disable-next-line: triple-equals
      if(element.country == country){
        this.totalActive = element.active;
        this.totalDeaths = element.deaths;
        this.totalRecovered = element.recovered;
        this.totalConfirmed = element.confirmed;

      }
    });
  }

}
