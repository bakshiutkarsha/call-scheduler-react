import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { ScheduleReducer } from "./ScheduleReducer";
import { ModalReducer } from "./ModalReducer";

// Configure Redux store & reducers
export const rootReducer = combineReducers({
  schedule: ScheduleReducer,
  modal: ModalReducer
});

export * from "./ScheduleReducer";
export * from "./ModalReducer";

export type IStore = StateType<typeof rootReducer>;
