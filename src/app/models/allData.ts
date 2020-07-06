// tslint:disable-next-line: no-empty-interface

export class AllData {

 public dataGlobal : Global[];
 public Countries : Countries[];
 public Date: Date;

}

export class Global
{
  public NewConfirmed : number;
  public NewDeaths : number;
  public NewRecovered : number;
  public TotalDeaths : number;
  public TotalConfirmed : number;
  public TotalRecovered : number;

}

export class Countries
{
  public Country : string;
  public CountryCode : string;
  public NewConfirmed : number;
  public TotalConfirmed : number;
  public NewDeaths : number;
  public TotalDeaths: number;
  public NewRecovered: number;
  public TotalRecovered: number;

}
