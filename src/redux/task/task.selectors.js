import { createSelector } from "reselect";

const getTask = (state) => state.task;

export const selectDesktopFiles = createSelector(
  [getTask],
  (task) => task.desktopFiles
);

export const selectTaskContentsValues = createSelector([getTask], (task) =>
  Object.values(task.taskContents)
);

export const selectTaskZIndexes = createSelector(
  [getTask],
  (task) => task.taskZIndexes
);
