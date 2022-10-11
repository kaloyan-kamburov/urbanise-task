import { createSelector } from "reselect";
import { Item } from "./item.types";
import { GlobalStateType } from "../rootReducer";

const items = (state: GlobalStateType) => state.items;

export const selectItems = createSelector(
  [items],
  (storeItems: Item[]) => storeItems
);
export const selectItem = (id: string) =>
  createSelector([items], (storeItems: Item[]) =>
    storeItems.find((item: Item) => item.id === id)
  );
