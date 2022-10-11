import {
  ITEM_LIST_SET,
  ITEM_ADD,
  ITEM_UPDATE,
  ITEM_DELETE,
} from "./item.actionTypes";
import { Item } from "./item.types";

export const setItemList = (payload: Item[]) => ({
  type: ITEM_LIST_SET,
  payload,
});

export const addItem = (payload: Item) => ({
  type: ITEM_ADD,
  payload,
});

export const updateItem = (item: Item) => ({
  type: ITEM_UPDATE,
  payload: item,
});

export const deleteItem = (itemId: string) => ({
  type: ITEM_DELETE,
  payload: itemId,
});

export type SetItemList = {
  type: typeof ITEM_LIST_SET;
  payload: Item[];
};

export type AddItem = {
  type: typeof ITEM_ADD;
  payload: Item;
};

export type UpdateItem = {
  type: typeof ITEM_UPDATE;
  payload: Item;
};

export type DeleteItem = {
  type: typeof ITEM_DELETE;
  payload: string;
};
