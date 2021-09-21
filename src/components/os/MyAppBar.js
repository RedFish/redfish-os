import {
  AppBar,
  Grid,
  IconButton,
  makeStyles,
  Tabs,
  Toolbar
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { connect } from "react-redux";
import { closeTask, selectTask } from "../../redux/task/task.reducer";
import {
  selectCurrentTaskId,
  selectTaskContents,
  selectTaskXOrders
} from "../../redux/task/task.selectors";
import { COMPONENT_INFO } from "../apps/main";
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
    width: "calc(100% - 140px)",
    "& .MuiTabs-scroller": {
      height: APP_BAR_HEIGHT
    }
  }
}));

function MyAppBar({
  //Redux state
  taskXOrders,
  taskContents,
  currentTaskId,
  //Redux action
  selectTask,
  closeTask
}) {
  const classes = useStyles();

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
            <Tabs
              value={taskXOrders.indexOf(currentTaskId)}
              variant="scrollable"
              scrollButtons="on"
            >
              {taskXOrders.map((taskId, index) => {
                const taskContent = taskContents[taskId];
                const appInfo = COMPONENT_INFO[taskContent.component];

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
              spacing={1}
            >
              <Grid item>
                <IconButton color="inherit">
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
  closeTask: (payload) => dispatch(closeTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppBar);
