import React from "react";
import { Grid, Typography, makeStyles, Button } from "@material-ui/core";

function ellipsisMiddle(str, maxLength) {
  if (str.length > maxLength) {
    const lenghtToDisplay = maxLength / 2 - 2;
    return (
      str.substr(0, lenghtToDisplay) +
      "..." +
      str.substr(str.length - lenghtToDisplay, str.length)
    );
  }
  return str;
}

const useStyles = makeStyles({
  name: {
    maxWidth: 250,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: -3
  }
});

function DesktopIcon({ onClick, icon, appname, filename }) {
  const classes = useStyles();

  return (
    <Button size="small" onClick={onClick}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item>{icon}</Grid>
        <Grid item>
          <Typography variant="body2">{appname}</Typography>
        </Grid>
        {filename && (
          <Grid item className={classes.name}>
            <Typography variant="caption">
              {ellipsisMiddle(filename, 30)}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Button>
  );
}

export default DesktopIcon;
