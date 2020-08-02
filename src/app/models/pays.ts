export interface ByCountries {

  // countryCode: string;
  //   countryName: string;
  //   lat: number;
  //   lng: number;
  //   confirmed: number;
  //   deaths: number;
  //   recovered: number;
  //   dateAsOf: Date;
  //   ict_unit: string;
  //   efficiency(efficiency: any);

  countryCode: string;
  country: string;
  lat: number;
  lng: number;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
  dailyConfirmed: number;
  dailyDeaths: number;
  activeCases: number;
  totalCritical: number;
  totalConfirmedPerMillionPopulation: 57;
  totalDeathsPerMillionPopulation: 2;
  FR: number;
  PR: number;
  lastUpdated: Date;

}
