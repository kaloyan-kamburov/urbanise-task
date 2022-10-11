import { MANAGERS_LIST_SET } from "./managers.actionTypes";
import { Manager } from "./managers.types";

export const setManagersList = (payload: Manager[]) => ({
  type: MANAGERS_LIST_SET,
  payload,
});

export type SetManagersList = {
  type: typeof MANAGERS_LIST_SET;
  payload: Manager[];
};
