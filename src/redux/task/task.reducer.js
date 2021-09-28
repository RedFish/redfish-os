import { REHYDRATE } from "redux-persist";
import { v4 as uuidv4 } from "uuid";
import getDefaultWindowProps from "../../utils/getDefaultWindowProps";
import { INITIAL_STATE } from "./task.initial-state";
import ReactGA from "react-ga4";

//Action Types
export const TaskActionTypes = {
  OPEN_TASK: "OPEN_TASK",
  CLOSE_TASK: "CLOSE_TASK",
  SELECT_TASK: "SELECT_TASK",
  UPDATE_TASK_WINDOW: "UPDATE_TASK_WINDOW",
  UPDATE_TASK_COMPONENT: "UPDATE_TASK_COMPONENT",
  UPDATE_DESKTOP: "UPDATE_DESKTOP"
};

//Actions
export const openTask = ({ component, componentProps }) => ({
  type: TaskActionTypes.OPEN_TASK,
  payload: { component, componentProps }
});
export const closeTask = ({ taskId }) => ({
  type: TaskActionTypes.CLOSE_TASK,
  payload: { taskId }
});
export const selectTask = ({ taskId }) => ({
  type: TaskActionTypes.SELECT_TASK,
  payload: { taskId }
});
export const updateTaskWindow = ({ taskId, props }) => ({
  type: TaskActionTypes.UPDATE_TASK_WINDOW,
  payload: { taskId, props }
});
export const updateTaskComponent = ({ taskId, props }) => ({
  type: TaskActionTypes.UPDATE_TASK_COMPONENT,
  payload: { taskId, props }
});
export const updateDesktop = ({ desktopFiles }) => ({
  type: TaskActionTypes.UPDATE_DESKTOP,
  payload: { desktopFiles }
});

//Reducer
const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Open task
     *
     */
    case TaskActionTypes.OPEN_TASK: {
      const { component, componentProps } = action.payload;

      ReactGA.event({
        category: action.type,
        action: component
      });

      if (component === "Link") {
        window.open(componentProps.url);
        return state;
      }

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
    case TaskActionTypes.CLOSE_TASK: {
      const { taskId } = action.payload;

      const newTaskContents = { ...state.taskContents };

      ReactGA.event({
        category: action.type,
        action: newTaskContents[taskId].component
      });

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
    case TaskActionTypes.SELECT_TASK: {
      const { taskId } = action.payload;

      const newTaskZIndexes = state.taskZIndexes.filter((id) => id !== taskId);

      let taskContents = state.taskContents;
      if (state.taskContents[taskId]) {
        taskContents = {
          ...state.taskContents,
          [taskId]: {
            ...state.taskContents[taskId],
            windowProps: {
              ...state.taskContents[taskId].windowProps,
              reduced: false
            }
          }
        };
      }

      return {
        ...state,
        taskZIndexes: [...newTaskZIndexes, taskId],
        //Remove reduced
        taskContents
      };
    }

    /**
     * Update task props
     *
     */
    case TaskActionTypes.UPDATE_TASK_WINDOW: {
      const { taskId, props } = action.payload;

      const newProps =
        typeof props === "function"
          ? props(state.taskContents[taskId].windowProps)
          : { ...state.taskContents[taskId].windowProps, ...props };

      let newTaskZIndexes = state.taskZIndexes;
      if (newProps.reduced) {
        newTaskZIndexes = state.taskZIndexes.filter((id) => id !== taskId);
      }

      return {
        ...state,
        taskZIndexes: newTaskZIndexes,
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
    case TaskActionTypes.UPDATE_TASK_COMPONENT: {
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

    /** DESKTOP */
    case TaskActionTypes.UPDATE_DESKTOP: {
      const { desktopFiles } = action.payload;

      return {
        ...state,
        desktopFiles
      };
    }

    /** REDUX PERSIST REHYDRATE */
    case REHYDRATE: {
      if (!action.payload) return { ...state, ...INITIAL_STATE };
      return {
        ...state,
        ...action.payload.task,
        //Get initial state to keep desktop and menu updated
        desktopFiles: INITIAL_STATE.desktopFiles,
        menuItems: INITIAL_STATE.menuItems
      };
    }

    default:
      return state;
  }
};

export default taskReducer;
