import { createSelector } from "reselect";
import { Manager } from "./managers.types";
import { GlobalStateType } from "../rootReducer";

const managers = (state: GlobalStateType) => state.managers;

export const selectManagers = createSelector(
  [managers],
  (storeManagers: Manager[]) => storeManagers
);
