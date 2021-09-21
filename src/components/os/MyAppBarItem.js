import { Grid, IconButton, makeStyles, Tab } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  tab: {
    marginRight: 3,
    marginTop: 3,
    backgroundColor: "rgb(255, 255, 255, 0.7)"
  },
  appname: {
    lineHeight: "normal",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 230
  },
  subtitle: {
    textTransform: "none",
    lineHeight: "normal",
    fontSize: "small",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 230
  },
  activeCloseButton: {
    padding: 10,
    marginLeft: 12
  },
  closeButton: {
    padding: 10,
    marginLeft: 12,
    color: "transparent",
    "&:hover": {
      color: "inherit"
    }
  }
});

function MyAppBarItem({ onClick, icon, appname, subtitle, isActive, onClose }) {
  const classes = useStyles();
  return (
    <Tab
      className={classes.tab}
      icon={icon}
      onClick={onClick}
      label={
        <React.Fragment>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item className={classes.appname}>
              {appname}
            </Grid>
            {!!subtitle && (
              <Grid item className={classes.subtitle}>
                {subtitle}
              </Grid>
            )}
          </Grid>
          <IconButton
            className={
              isActive ? classes.activeCloseButton : classes.closeButton
            }
            color="inherit"
            aria-label="fermer"
            onClick={onClose}
            disableRipple={true}
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default MyAppBarItem;
