import { REGIONS_LIST_SET } from "./regions.actionTypes";
import { SetRegionsList } from "./regions.actions";
import { Region } from "./regions.types";

type RegionsActions = SetRegionsList;

const INITIAL_STATE: Region[] = [];
export const reducer = (state = INITIAL_STATE, action: RegionsActions) => {
  switch (action.type) {
    case REGIONS_LIST_SET:
      return action.payload;

    default:
      return state;
  }
};
