import { useContext } from "react";
import TaskContext from "../../contexts/TaskContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  webviewRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    border: 0
  }
});

function WebView(props) {
  const classes = useStyles();
  const taskContext = useContext(TaskContext);
  const { componentProps } = taskContext;

  return (
    <iframe
      title="iframe"
      className={classes.webviewRoot}
      src={componentProps.url}
    />
  );
}

export default WebView;
