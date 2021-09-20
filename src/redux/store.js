import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./root-reducer";

//Dev tools
const composeEnhancers = composeWithDevTools({});

//Middleware
const middlewares = [];
if (process.env.NODE_ENV !== "production") {
  //Optional logger
  //middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store); //Make store persistent
