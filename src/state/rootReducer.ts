import { combineReducers } from "redux";

//reducers
import { reducer as itemsReducer } from "./items/items.reducer";
import { reducer as managersReducer } from "./managers/managers.reducer";
import { reducer as regionsReducer } from "./regions/regions.reducer";

//types
import { Item } from "./items/item.types";
import { Manager } from "./managers/managers.types";
import { Region } from "./regions/regions.types";

export type GlobalStateType = {
  items: Item[];
  managers: Manager[];
  regions: Region[];
};

export const GlobalState = {
  items: itemsReducer,
  managers: managersReducer,
  regions: regionsReducer,
};

const rootReducer = combineReducers(GlobalState);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
