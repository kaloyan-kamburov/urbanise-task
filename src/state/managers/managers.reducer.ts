import { MANAGERS_LIST_SET } from "./managers.actionTypes";
import { SetManagersList } from "./managers.actions";
import { Manager } from "./managers.types";

type ManagerActions = SetManagersList;

const INITIAL_STATE: Manager[] = [];
export const reducer = (state = INITIAL_STATE, action: ManagerActions) => {
  switch (action.type) {
    case MANAGERS_LIST_SET:
      return action.payload;

    default:
      return state;
  }
};
