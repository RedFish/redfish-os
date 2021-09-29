import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Wallpaper from "../../assets/wallpaper.png";
import { APP_BAR_HEIGHT } from "./MyAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${Wallpaper})`,
    backgroundPosition: "center center"
  },
  desktop: {
    overflow: "hidden",
    flex: 1
  },
  toolbarSpacing: {
    height: APP_BAR_HEIGHT
  }
  // toolbarSpacing: () => {
  //   return {
  //     // necessary for content to be below app bar
  //     ...theme.mixins.toolbar
  //   };
  // }
}));

function Screen({ children }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <div className={classes.desktop}>{children}</div>
      <div className={classes.toolbarSpacing}></div>
    </Grid>
  );
}

export default Screen;
