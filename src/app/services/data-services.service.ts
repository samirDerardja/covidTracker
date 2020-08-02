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
 private worldDataCovid = 'http://api.coronatracker.com/v3/stats/worldometer/global';
//  private dataByCountry = 'http://api.coronatracker.com/v2/analytics/country';
private dataByCountry = 'http://api.coronatracker.com/v3/stats/worldometer/country';

  constructor(private http: HttpClient) {

   }

  public toDate: moment.Moment;

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.toDate = moment();
    this.getAllDataCov();
    this.getAllDataByCountry();

  }

  dateStringToMoment(dateString: string): moment.Moment {
    return moment(dateString);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
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

  getAllDataByCountry(): Observable<ByCountries[]> {

    return this.http.get<ByCountries[]>(this.dataByCountry).pipe(map((res: ByCountries[]) => {
      const transformedData = Object.keys(res).map(key => res[key]);
      console.log(transformedData);
      return transformedData;
    }));
  }


}
