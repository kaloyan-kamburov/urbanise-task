export type ItemDetails = {
  name: string;
  plan: string;
  units: {
    id: number;
    lotAlpha: string;
    floor: number;
    type: string;
  }[];
  city: string;
  region: number;
  manager: number | string;
  previousManager: number | string;
  managementCompany: string;
  planRegistered: Date;
  address: string;
  account: string;
  abn: string;
};
