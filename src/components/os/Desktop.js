import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { openTask } from "../../redux/task/task.reducer";
import { selectDesktopFiles } from "../../redux/task/task.selectors";
import { getComponentInfo } from "../apps/main";
import DesktopIcon from "./DesktopIcon";

const useStyles = makeStyles({
  desktop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 20
  }
});

function Desktop({ desktopFiles, openTask }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.desktop}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {(desktopFiles || []).map((file, index) => {
        const appInfo = getComponentInfo(file);

        return (
          <Grid item key={index}>
            <DesktopIcon
              key={index}
              onClick={() => {
                openTask({
                  component: file.component,
                  componentProps: file.componentProps
                });
              }}
              icon={appInfo.icon({})}
              appname={appInfo.appname}
              filename={file.componentProps.subtitle}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  desktopFiles: selectDesktopFiles(state)
});

const mapDispatchToProps = (dispatch) => ({
  openTask: (payload) => dispatch(openTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
