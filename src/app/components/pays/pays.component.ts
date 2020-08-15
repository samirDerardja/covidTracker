import { Component, Input, NgZone, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import { DataWiseData } from 'src/app/models/data-wise-data';
import * as Chart from 'chart.js';
import 'chartjs-plugin-zoom';
import { ByCountries } from 'src/app/models/pays';
import { merge, merge as mergeStatic } from 'rxjs';
import { map } from 'rxjs/operators';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// tslint:disable-next-line: import-spacing
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css'],
})
export class PaysComponent implements OnInit {
  cases: number;
  date: Date;
  p = 1;
  loading: boolean;
  count: {};

  private chart: am4charts.XYChart;

  constructor(private service: DataServicesService, private zone: NgZone) {}

  // tslint:disable-next-line: no-input-rename
  @Input('totalConfirmed') totalConfirmed;
  // tslint:disable-next-line: no-input-rename
  @Input('totalActive') totalActive;
  // tslint:disable-next-line: no-input-rename
  @Input('totalDeaths') totalDeaths;
  // tslint:disable-next-line: no-input-rename
  @Input('totalRecovered') totalRecovered;

  globalData: ByCountries[] = [];
  pays: any[] = [];
  selectCountrieData: DataWiseData[] = [];
  dateWiseData: { [x: string]: DataWiseData[] };
  newCases = [];
  newDate = [];
  countries: string[] = [];

  // chart: Chart;
  canvas: any;
  ctx: any;
  dataTable: any[] = [];

  pageChanged(event) {
    this.p = event;
  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    merge(
      this.service.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.service.getAllDataByCountry().pipe(
        map((result) => {
          this.globalData = result;
          this.globalData.forEach((cs) => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('India');
        this.loading = false;
      },
    });
    this.ngAfterViewInit();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;
      // tslint:disable-next-line: one-variable-per-declaration

      this.service.getAllDataByCountry().subscribe((result) => {
        this.pays = result;
        this.pays.forEach((cs) => {
          this.dataTable.push({
            country: cs.country,
            value: cs.activeCases,
          });
        });

        chart.data = this.dataTable.slice(0, 50);

        // tslint:disable-next-line: prefer-const
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'country';
        categoryAxis.title.text = 'Par pays';
        categoryAxis.renderer.grid.template.location = 0;
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        let series = chart.series.push(new am4charts.LineSeries());
        series.stroke = am4core.color('#ff0000'); // red
        series.strokeWidth = 1; // 3px
        series.dataFields.categoryX = 'country';
        series.dataFields.valueY = 'value';
        series.tooltipText = '{valueY.value}';
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
        this.chart = chart;
      });
    });
  }

  updateChart() {
    this.zone.runOutsideAngular(() => {
      const graph = am4core.create('chartdi', am4charts.XYChart);
      this.selectCountrieData.forEach((cs) => {
        this.newDate.push({
          date: cs.date,
          cases: cs.cases,
        });
      });

      graph.data = this.newDate;

      let dateAxis = graph.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;

      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      let valueAxis = graph.yAxes.push(new am4charts.ValueAxis());
      let series = graph.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'cases';
      series.tooltipText = '{valueY}';
      series.tooltip.pointerOrientation = 'vertical';
      series.tooltip.background.fillOpacity = 0.5;
      graph.cursor = new am4charts.XYCursor();
      graph.cursor.xAxis = dateAxis;
      let scrollbarX = new am4core.Scrollbar();
      graph.scrollbarX = scrollbarX;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  updateValues(country: string) {
    console.log(country);
    // tslint:disable-next-line: no-shadowed-variable
    this.globalData.forEach((el) => {
      // tslint:disable-next-line: triple-equals
      if (el.country == country) {
        this.totalConfirmed = el.totalConfirmed;
        this.totalRecovered = el.totalRecovered;
        this.totalActive = el.activeCases;
        this.totalDeaths = el.totalDeaths;
      }
    });

    this.selectCountrieData = this.dateWiseData[country];
    this.updateChart();
  }
}
