import { Component, OnInit, Input, Pipe, PipeTransform, NgZone } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { GlobalDataSummery } from 'src/app/models/globalData';
import * as Chart from 'chart.js';
import { Global } from 'src/app/models/global';
import { ByCountries } from 'src/app/models/pays';
import { WorldCovid } from 'src/app/models/worldCovid';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

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

  // tslint:disable-next-line: no-input-rename
  @Input('totalCasesPerMillionPop') totalCasesPerMillionPop;

  // tslint:disable-next-line: no-shadowed-variable

  p = 1;

  glob: WorldCovid[] = [];
  pays: ByCountries[] = [];
  // chart: Chart;
  canvas: any;
  ctx: any;
  tbleByTotal: any[] = [];
  cP: any[] = [];
  cT: any[] = [];
  byEl: any[] = [];
  country: string;



  // tslint:disable-next-line: variable-name

  countEventsData: ChartDataSets[] = [
    { data: [], label: 'Number of Events', fill: false }
  ];


  private chart: am4charts.XYChart;
  value: number;
  datatable: any[];

  constructor(private dataService: DataServicesService, private zone: NgZone) { }

  pageChanged(event) {
    this.p = event;
  }


  ngOnInit(): void {
    this.getData();
    // this.getByCountry();
    this.initChart('c');
    this.getByC();
  }


  getData() {
    this.dataService.getAllDataCov()
      // tslint:disable-next-line: deprecation
      .subscribe(
        result => {
          // tslint:disable-next-line: no-conditional-assignment
          this.glob = result;
          // tslint:disable-next-line: no-unused-expression
          this.tbleByTotal.push([

            this.totalConfirmed = this.glob[0],
            this.totalDeaths = this.glob[1],
            this.totalRecovered = this.glob[2],

          ]);
          console.log(this.totalCasesPerMillionPop);
        });
  }

  getByC() {
    this.dataService.getAllDataByCountry()
      // tslint:disable-next-line: deprecation
      .subscribe(
        result => {
          // tslint:disable-next-line: no-conditional-assignment
          this.pays = result;
          // tslint:disable-next-line: no-unused-expression
          this.pays.forEach(cs => {
            this.cT.push([
              cs.country,
              cs.totalConfirmed,
              cs.totalRecovered,
              cs.totalDeaths,
              cs.activeCases
            ]);
            this.initChart('c');
          });

        });
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])

    this.pays.forEach(cs => {
      let value: number;
      // tslint:disable-next-line: triple-equals
      if (caseType == 'c') {
        if (cs.totalConfirmed > 2000) {
          value = cs.totalConfirmed;
        }
      }

      // tslint:disable-next-line: triple-equals
      if (caseType == 'a') {
        if (cs.activeCases > 2000) {
          value = cs.activeCases;
        }
      }
      // tslint:disable-next-line: triple-equals
      if (caseType == 'd') {
        if (cs.totalDeaths > 1000) {
          value = cs.totalDeaths;
        }
      }

      // tslint:disable-next-line: triple-equals
      if (caseType == 'r') {
        if (cs.totalRecovered > 2000) {
          value = cs.totalRecovered;
        }
      }

      this.datatable.push([
        cs.country, value
      ])
    })
    console.log(this.datatable);

  }



  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;
      // tslint:disable-next-line: one-variable-per-declaration

      this.dataService.getAllDataByCountry()
        .subscribe(
          result => {
            this.pays = result;
            this.pays.forEach(cs => {
              this.cP.push({
                country: cs.country,
                valueAc: cs.activeCases,
                valueD: cs.totalDeaths,
                valueRe : cs.totalRecovered,
              });
              this.byEl.push(cs.country);
            });

            // tslint:disable-next-line: no-unused-expression

            // tslint:disable-next-line: one-variable-per-declaration
            // const arr: any[] = [];
            // tslint:disable-next-line: only-arrow-functions

            chart.data = this.cP.slice(0, 50);
            // chart.data = this.byEl;


            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'country';
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = 'valueD';
            series.dataFields.categoryX = 'country';
            series.tooltipText = "[{categoryX}: bold]{categoryX}[/]";
            series.columns.template.strokeWidth = 0;

            series.tooltip.pointerOrientation = "vertical";

            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;

            // on hover, make corner radiuses bigger
            let hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            // tslint:disable-next-line: only-arrow-functions
            series.columns.template.adapter.add("fill", function (fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
            });
            chart.cursor = new am4charts.XYCursor();

            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            // function selectDataset(set: string | number) {
            //   this.chart.data = this.byEl[set];
            // }
            this.initChart('c');

          });

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



  // let chart = am4core.create("chartdiv", am4charts.XYChart);
  // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  // categoryAxis.dataFields.category = "con";
  // categoryAxis.renderer.grid.template.location = 0;
  // categoryAxis.renderer.minGridDistance = 30;

  // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // // Create series
  // let series = chart.series.push(new am4charts.ColumnSeries());
  // series.dataFields.valueY = "act";
  // series.dataFields.categoryX = "con";
  // series.name = "Visits";
  // series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  // series.columns.template.fillOpacity = .8;

  // let columnTemplate = series.columns.template;
  // columnTemplate.strokeWidth = 2;
  // columnTemplate.strokeOpacity = 1;

}



