import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalDataSummery } from '../models/globalData';
import { DataWiseData } from '../models/data-wise-data';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { Global } from '../models/global';
import { ByCountries } from '../models/pays';
import { WorldCovid } from '../models/worldCovid';
import { DailySates } from '../models/dailySates';


@Injectable({
  providedIn: 'root'
})
export class DataServicesService implements OnInit {

  // tslint:disable-next-line: member-ordering
  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-26-2020.csv';
  private dataWiseDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  private globaleWorldDataUrl = 'https://api.covid19api.com/summary';
  //   private API_KEY = '9590877a0fmshe1db5f40c04bf53p177687jsn591a7a740678';
  //  private dataFromRapid = 'https://corona-virus-world-and-india-data.p.rapidapi.com/api';
  private worldDataCovid = 'https://api.coronatracker.com/v3/stats/worldometer/global';
  //  private dataByCountry = 'http://api.coronatracker.com/v2/analytics/country';
  private dataByCountry = 'https://api.coronatracker.com/v3/stats/worldometer/country';
  private dailyNewStates = 'https://api.coronatracker.com/v3/analytics/dailyNewStats';

  constructor(private http: HttpClient) {

  }

  public toDate: moment.Moment;

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.toDate = moment();
    this.getAllDataCov();
    this.getAllDataByCountry();
    this.getDaily();
    this.getDateWiseData();

  }

  dateStringToMoment(dateString: string): moment.Moment {
    return moment(dateString);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // const the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllDataCov(): Observable<WorldCovid[]> {

    return this.http.get<WorldCovid[]>(this.worldDataCovid).pipe(map((res: WorldCovid[]) => {
      const transformedData = Object.keys(res).map(key => res[key]);
      console.log(transformedData);
      return transformedData;
    }));
  }

  getDaily(): Observable<DailySates[]> {

    return this.http.get<DailySates[]>(this.dailyNewStates).pipe(map((res: DailySates[]) => {
      const transformedData = Object.keys(res).map(key => res[key]);
      console.log(transformedData);
      return transformedData;
    }));
  }


  getAllDataByCountry(): Observable<ByCountries[]> {

    return this.http.get<ByCountries[]>(this.dataByCountry).pipe(map((res: ByCountries[]) => {
      const transformedData = Object.keys(res).map(key => res[key]);
      console.log(transformedData);
      return transformedData;
    }));
  }

  getDateWiseData() {
    return this.http.get(this.dataWiseDataUrl, { responseType: 'text' })
      .pipe(map(result => {
        const rows = result.split('\n');
        // console.log(rows);
        const mainData = {};
        const header = rows[0];
        const dates = header.split(/,(?=\S)/)
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/)
          const con = cols[1];
          cols.splice(0, 4);
          // console.log(con , cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            const dw: DataWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index]))

            };
            mainData[con].push(dw);
          });

        });


        // console.log(mainData);
        return mainData;
      }));
  }


}
