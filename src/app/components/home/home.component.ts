import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import * as Chart from 'chart.js';
import { data } from 'jquery';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private dataService: DataServicesService) { }

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;
  globalata: GlobalDataSummery[] = [];


  ngOnInit(): void {

  }


}



