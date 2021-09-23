import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import storage from "redux-persist/lib/storage";

import rootReducer from "./root-reducer";

//Dev tools
const composeEnhancers = composeWithDevTools({});

//Middleware
const middlewares = [];
if (process.env.NODE_ENV !== "production") {
  //Optional logger
  //middlewares.push(logger);
}

//Config state persistance
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store); //Make store persistent
