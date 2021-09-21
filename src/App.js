import Screen from "./components/os/Screen";
import Window from "./components/os/Window";
import { createTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";
import MyAppBar from "./components/os/MyAppBar";
import { connect } from "react-redux";
import Desktop from "./components/os/Desktop";
import { selectTaskContentsValues } from "./redux/task/task.selectors";
import TaskContext from "./contexts/TaskContext";
import {
  closeTask,
  updateTaskComponent,
  updateTaskWindow
} from "./redux/task/task.reducer";
import ComponentLoader from "./components/os/ComponentLoader";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9"
    },
    secondary: {
      main: "#ff4081"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        padding: 0
      }
    },
    MuiTab: {
      labelIcon: {
        paddingBottom: 10,
        minHeight: "unset",
        "& .MuiTab-wrapper > *:first-child": {
          marginRight: 8,
          marginBottom: "unset"
        }
      },
      wrapper: {
        flexDirection: "row"
      }
    },
    PrivateTabIndicator: {
      root: { height: 5 }
    }
  }
});

//fetch: https://api.github.com/users/RedFish/repos

function App({
  taskContents,
  closeTask,
  updateTaskWindow,
  updateTaskComponent
}) {
  const handleCloseTask = (taskId) => {
    return () => {
      closeTask({ taskId });
    };
  };
  const handleUpdateTaskWindow = (taskId) => {
    return (props) => {
      updateTaskWindow({ taskId, props });
    };
  };
  const handleUpdateTaskComponent = (taskId) => {
    return (props) => {
      updateTaskComponent({ taskId, props });
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <Desktop />
        {taskContents.map((taskContent) => {
          const value = {
            ...taskContent,
            closeTask: handleCloseTask(taskContent.taskId),
            updateTaskWindow: handleUpdateTaskWindow(taskContent.taskId),
            updateTaskComponent: handleUpdateTaskComponent(taskContent.taskId)
          };
          return (
            <TaskContext.Provider key={taskContent.taskId} value={value}>
              <Window>
                <ComponentLoader />
              </Window>
            </TaskContext.Provider>
          );
        })}
      </Screen>
      <MyAppBar />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  taskContents: selectTaskContentsValues(state)
});

const mapDispatchToProps = (dispatch) => ({
  closeTask: (payload) => dispatch(closeTask(payload)),
  updateTaskWindow: (payload) => dispatch(updateTaskWindow(payload)),
  updateTaskComponent: (payload) => dispatch(updateTaskComponent(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
