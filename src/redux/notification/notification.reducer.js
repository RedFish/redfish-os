import { NotificationActionTypes } from "./notification.actions";

const INITIAL_STATE = {
  notifications: []
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification
          }
        ]
      };

    case NotificationActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
      };

    case NotificationActionTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};

export default notificationReducer;
