import Screen from "./components/os/Screen";
import { createTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";
import MyAppBar from "./components/os/MyAppBar";
import { connect } from "react-redux";
import Desktop from "./components/os/Desktop";
import { selectTaskContentsValues } from "./redux/task/task.selectors";
import TaskContextProvider from "./contexts/TaskContextProvider";

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
    MuiListItemText: { multiline: { marginTop: 0, marginBottom: 0 } },
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

function App({ taskContents }) {
  return (
    <ThemeProvider theme={theme}>
      <Screen>
        <Desktop />
        {taskContents.map((taskContent) => {
          return (
            <TaskContextProvider
              key={taskContent.taskId}
              taskContent={taskContent}
            />
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
