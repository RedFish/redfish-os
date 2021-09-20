import { v4 as uuidv4 } from "uuid";
import getDefaultWindowProps from "../../utils/getDefaultWindowProps";
import { INITIAL_STATE } from "./task.initial-state";
//Action Types
export const ModuleActionTypes = {
  OPEN_TASK: "OPEN_TASK",
  CLOSE_TASK: "CLOSE_TASK",
  SELECT_TASK: "SELECT_TAB",
  UPDATE_TASK_WINDOW: "UPDATE_TASK_WINDOW",
  UPDATE_TASK_COMPONENT: "UPDATE_TASK_COMPONENT"
};

//Actions
export const openTask = ({ component, componentProps }) => ({
  type: ModuleActionTypes.OPEN_TASK,
  payload: { component, componentProps }
});
export const closeTask = ({ taskId }) => ({
  type: ModuleActionTypes.CLOSE_TASK,
  payload: { taskId }
});
export const selectTask = ({ taskId }) => ({
  type: ModuleActionTypes.SELECT_TASK,
  payload: { taskId }
});
export const updateTaskWindow = ({ taskId, props }) => ({
  type: ModuleActionTypes.UPDATE_TASK_WINDOW,
  payload: { taskId, props }
});
export const updateTaskComponent = ({ taskId, props }) => ({
  type: ModuleActionTypes.UPDATE_TASK_COMPONENT,
  payload: { taskId, props }
});

//Reducer
const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Open task
     *
     */
    case ModuleActionTypes.OPEN_TASK: {
      const { component, componentProps } = action.payload;

      const taskId = uuidv4();
      const newTask = {
        taskId,
        windowProps: getDefaultWindowProps(
          component,
          Object.keys(state.taskContents).length
        ),
        component,
        componentProps
      };

      return {
        ...state,
        taskContents: { ...state.taskContents, [taskId]: newTask },
        taskZIndexes: [...state.taskZIndexes, taskId],
        taskXOrders: [...state.taskXOrders, taskId]
      };
    }

    /**
     * Close task
     *
     */
    case ModuleActionTypes.CLOSE_TASK: {
      const { taskId } = action.payload;

      const newTaskContents = { ...state.taskContents };
      delete newTaskContents[taskId];
      const newTaskZIndexes = state.taskZIndexes.filter((id) => id !== taskId);
      const newTaskXOrders = state.taskXOrders.filter((id) => id !== taskId);

      return {
        ...state,
        taskContents: newTaskContents,
        taskZIndexes: newTaskZIndexes,
        taskXOrders: newTaskXOrders
      };
    }

    /**
     * Select task
     *
     */
    case ModuleActionTypes.SELECT_TASK: {
      const { taskId } = action.payload;

      const newTaskZIndexes = state.taskZIndexes.filter((id) => id !== taskId);

      return {
        ...state,
        taskZIndexes: [...newTaskZIndexes, taskId]
      };
    }

    /**
     * Update task props
     *
     */
    case ModuleActionTypes.UPDATE_TASK_WINDOW: {
      const { taskId, props } = action.payload;

      const newProps =
        typeof props === "function"
          ? props(state.taskContents[taskId].windowProps)
          : { ...state.taskContents[taskId].windowProps, ...props };

      return {
        ...state,
        taskContents: {
          ...state.taskContents,
          [taskId]: { ...state.taskContents[taskId], windowProps: newProps }
        }
      };
    }

    /**
     * Update task component
     *
     */
    case ModuleActionTypes.UPDATE_TASK_COMPONENT: {
      const { taskId, props } = action.payload;

      const newProps =
        typeof props === "function"
          ? props(state.taskContents[taskId].componentProps)
          : { ...state.taskContents[taskId].componentProps, ...props };

      return {
        ...state,
        taskContents: {
          ...state.taskContents,
          [taskId]: { ...state.taskContents[taskId], componentProps: newProps }
        }
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
