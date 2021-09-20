import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { store } from "../store";
import { Button } from "@material-ui/core";

export const NotificationActionTypes = {
  ENQUEUE_SNACKBAR: "ENQUEUE_SNACKBAR",
  CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
  REMOVE_SNACKBAR: "REMOVE_SNACKBAR"
};

const enqueueSnackbar = ({ message, options, handleCancel, ...rest }) => {
  const key = (options && options.key) || new Date().getTime() + Math.random();

  return {
    type: NotificationActionTypes.ENQUEUE_SNACKBAR,
    notification: {
      message,
      options: {
        autoHideDuration: 3000,
        ...options,
        action: (key) => (
          <React.Fragment>
            {handleCancel && (
              <Button
                aria-label="cancel"
                color="inherit"
                onClick={() => {
                  handleCancel(store.dispatch);
                  store.dispatch(closeSnackbar(key));
                }}
              >
                Annuler
              </Button>
            )}
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={() => {
                store.dispatch(closeSnackbar(key));
              }}
            >
              <Close />
            </IconButton>
          </React.Fragment>
        )
      },
      ...rest,
      key
    }
  };
};

export const enqueueNotification = ({
  message,
  variant,
  options,
  handleCancel
}) => {
  return enqueueSnackbar({
    message,
    options: {
      variant: variant || "default",
      ...options
    },
    handleCancel
  });
};

export const closeSnackbar = (key) => ({
  type: NotificationActionTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = (key) => ({
  type: NotificationActionTypes.REMOVE_SNACKBAR,
  key
});
