import { REGIONS_LIST_SET } from "./regions.actionTypes";
import { Region } from "./regions.types";

export const setRegionsList = (payload: Region[]) => ({
  type: REGIONS_LIST_SET,
  payload,
});

export type SetRegionsList = {
  type: typeof REGIONS_LIST_SET;
  payload: Region[];
};
