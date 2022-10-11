import {
  ITEM_LIST_SET,
  ITEM_ADD,
  ITEM_UPDATE,
  ITEM_DELETE,
} from "./item.actionTypes";
import { SetItemList, AddItem, UpdateItem, DeleteItem } from "./item.actions";
import { Item } from "./item.types";

type ItemActions = SetItemList | UpdateItem | DeleteItem | AddItem;

const INITIAL_STATE: Item[] = [];
export const reducer = (state = INITIAL_STATE, action: ItemActions) => {
  switch (action.type) {
    case ITEM_LIST_SET:
      return action.payload;

    case ITEM_ADD: {
      return [...state, action.payload];
    }

    case ITEM_UPDATE: {
      const newItems = [...state];
      const indexForUpdate = newItems.findIndex(
        (item: Item) => item.id === action.payload.id
      );
      newItems[indexForUpdate] = action.payload;
      return newItems;
    }

    case ITEM_DELETE: {
      const newItems = [...state];
      const indexForDelete = newItems.findIndex(
        (item: Item) => item.id === action.payload
      );
      newItems.splice(indexForDelete, 1);
      return newItems;
    }

    default:
      return state;
  }
};
