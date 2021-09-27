import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Tabs,
  Toolbar
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useMemo } from "react";
import { connect } from "react-redux";
import { ABOUT_APP } from "../../redux/task/task.initial-state";
import { closeTask, openTask, selectTask } from "../../redux/task/task.reducer";
import {
  selectCurrentTaskId,
  selectTaskContents,
  selectTaskXOrders
} from "../../redux/task/task.selectors";
import { getComponentInfo } from "../apps/main";
import MyAppBarItem from "./MyAppBarItem";
import MyAppBarMenu from "./MyAppBarMenu";
import MyAppBarTime from "./MyAppBarTime";

export const APP_BAR_HEIGHT = 62;

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  tabs: {
    width: "calc(100% - 160px)",
    "& .MuiTabs-scroller": {
      height: APP_BAR_HEIGHT
    }
  },
  about: {
    marginRight: 10,
    padding: 10
  }
}));

function MyAppBar({
  //Redux state
  taskXOrders,
  taskContents,
  currentTaskId,
  //Redux action
  selectTask,
  openTask,
  closeTask
}) {
  const classes = useStyles();

  const tabIndex = useMemo(() => {
    const index = taskXOrders.indexOf(currentTaskId);
    return index === -1 ? 0 : index;
  }, [currentTaskId, taskXOrders]);

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar variant="dense">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <MyAppBarMenu />
          </Grid>
          <Grid item className={classes.tabs}>
            <Tabs value={tabIndex} variant="scrollable" scrollButtons="on">
              {taskXOrders.map((taskId, index) => {
                const taskContent = taskContents[taskId];
                const appInfo = getComponentInfo(taskContent);

                return (
                  <MyAppBarItem
                    key={index}
                    onClick={() => {
                      selectTask({
                        taskId: taskContent.taskId
                      });
                    }}
                    onClose={() => {
                      closeTask({
                        taskId: taskContent.taskId
                      });
                    }}
                    icon={appInfo.icon({ size: "2x" })}
                    appname={appInfo.appname}
                    subtitle={taskContent.componentProps.subtitle}
                    isActive={currentTaskId === taskContent.taskId}
                  />
                );
              })}
            </Tabs>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  className={classes.about}
                  onClick={() => {
                    openTask(ABOUT_APP);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Grid>
              <Grid item>
                <MyAppBarTime />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  taskXOrders: selectTaskXOrders(state),
  taskContents: selectTaskContents(state),
  currentTaskId: selectCurrentTaskId(state)
});

const mapDispatchToProps = (dispatch) => ({
  selectTask: (payload) => dispatch(selectTask(payload)),
  openTask: (payload) => dispatch(openTask(payload)),
  closeTask: (payload) => dispatch(closeTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar);
