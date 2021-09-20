import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import notificationReducer from "./notification/notification.reducer";
import taskReducer from "./task/task.reducer";

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["module"],
  stateReconciler: autoMergeLevel2 //https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
};

const rootReducer = combineReducers({
  notification: notificationReducer,
  task: taskReducer
});

export default persistReducer(persistConfig, rootReducer);
