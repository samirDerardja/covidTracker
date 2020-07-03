import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummery } from '../models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {


  private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-02-2020.csv';
  constructor(private http: HttpClient) { }

  getGlobalData(){

    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        const dataGlobal : GlobalDataSummery[] = [];
        const raw = {};
        // avec split , on coupe et demande un saut a la ligne à chaque ligne
        const rows = result.split('\n');
        rows.splice(0, 1);
    //  console.log(rows);
        rows.forEach(row => {
       // on fait la meme pour chaque colonne de chaque ligne mais en uitilsant un regex pour eviter les erreurs de split avec espace
       const cols = row.split(/,(?=\S)/);
       const cs = {
          country: cols[3],
          confirmed: +cols[7],
          deaths: +cols[8],
          recovered : +cols[9],
          active: +cols[10],
       };

       const temp : GlobalDataSummery = raw[cs.country];

       if(temp){
         temp.active = cs.active + temp.active,
         temp.confirmed = cs.confirmed + temp.confirmed,
         temp.deaths = cs.deaths + temp.deaths,
         temp.recovered = cs.recovered + temp.recovered,
         raw[cs.country] = temp;
       } else {
         raw[cs.country] = cs;
       }
     });

        return Object.values(raw) as GlobalDataSummery[];
      })
    );

  }
}
