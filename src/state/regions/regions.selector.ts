import { createSelector } from "reselect";
import { Region } from "./regions.types";
import { GlobalStateType } from "../rootReducer";

const regions = (state: GlobalStateType) => state.regions;

export const selectRegions = createSelector(
  [regions],
  (storeRegions: Region[]) => storeRegions
);
