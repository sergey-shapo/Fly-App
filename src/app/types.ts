export interface IData {
  status: string;
  "status-code": number;
  version: string;
  access: string;
  data: Data;
}

export interface Data {
  [key: string]: {
    country: string;
    region: string;
  };
}

export interface IBoardingPass {
  origin: Data;
  destination: Data;
}

export enum Region {
  Africa = "Africa",
  Antarctic = "Antarctic",
  Asia = "Asia",
  CentralAmerica = "Central America",
}
