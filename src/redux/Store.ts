import { createStore } from "redux";

import { rootReducer } from "@reducers";
import { persistStore } from 'redux-persist';

export const reduxPersistKey = "persist";

export default () => {
  let store;
 
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'root',
    storage
  };

  store = createStore(
    persistReducer(persistConfig, rootReducer)
  );

    store.__PERSISTOR = persistStore(store);
 
  return store;
};

