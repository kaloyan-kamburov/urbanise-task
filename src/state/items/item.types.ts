export type Unit = {
  id: number;
  lotAlpha: string;
  floor: number;
  type: string;
};

export type Item = {
  id: string;
  name: string;
  plan: string;
  units: number | Unit[];
  city: string;
  region: number | string;
  manager: number | string;
  managerName?: string;
  managedSince?: string;
};
