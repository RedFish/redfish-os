import { useContext } from "react";
import TaskContext from "../../contexts/TaskContext";

const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles({
  pdfRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  }
});

function PDF(props) {
  const classes = useStyles();
  const taskContext = useContext(TaskContext);
  const { componentProps } = taskContext;

  return (
    <iframe
      title="iframe"
      className={classes.pdfRoot}
      src={componentProps.url}
    />
  );
}

export default PDF;
