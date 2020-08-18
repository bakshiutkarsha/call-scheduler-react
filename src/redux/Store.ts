import { createStore } from "redux";

import { IStore, rootReducer } from "@reducers";

export const reduxPersistKey = "persist";

export default (initialState: IStore) => {
  const store = createStore(
    rootReducer,
    initialState
  );

  return store;
};

