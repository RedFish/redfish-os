import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Wallpaper from "../../assets/wallpaper.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh"
  },
  desktop: {
    backgroundImage: `url(${Wallpaper})`,
    backgroundPosition: "center center",
    overflow: "hidden",
    flex: 1
  },
  toolbarSpacing: {
    height: 48
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
