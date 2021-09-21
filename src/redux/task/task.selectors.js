import { createSelector } from "reselect";

const getTask = (state) => state.task;

export const selectDesktopFiles = createSelector(
  [getTask],
  (task) => task.desktopFiles
);

export const selectMenuItems = createSelector(
  [getTask],
  (task) => task.menuItems
);

export const selectTaskContents = createSelector(
  [getTask],
  (task) => task.taskContents
);

export const selectTaskContentsValues = createSelector([getTask], (task) =>
  Object.values(task.taskContents)
);

export const selectTaskZIndexes = createSelector(
  [getTask],
  (task) => task.taskZIndexes
);

export const selectTaskXOrders = createSelector(
  [getTask],
  (task) => task.taskXOrders
);

export const selectCurrentTaskId = createSelector(
  [getTask],
  (task) => task.taskZIndexes[task.taskZIndexes.length - 1]
);
