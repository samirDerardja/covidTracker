export interface Global {
  NewConfirmed?: number;
  NewDeaths?: number;
  NewRecovered?: number;
  TotalDeaths?: number;
  TotalConfirmed?: number;
  TotalRecovered?: number;
  // Countries: Countries;
  efficiency(efficiency: any);
  // tslint:disable-next-line: member-ordering
  ict_unit: string;
  // tslint:disable-next-line: member-ordering
}

// export interface Countries {

//   Country?: string;
//   CountryCode?: string;
//   Date?: Date;
//   NewConfirmed?: number;
//   NewDeaths?: number;
//   NewRecovered?: number;
//   Premium?: {};
//   Slug?: string;
//   TotalConfirmed?: number;
//   TotalDeaths?: number;
//   TotalRecovered?: number;
// }

