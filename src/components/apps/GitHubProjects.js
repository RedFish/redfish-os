import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TaskContext from "../../contexts/TaskContext";
import { connect } from "react-redux";

const useStyles = makeStyles({
  webviewRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  }
});
function GitHubProjects() {
  const classes = useStyles();
  const taskContext = useContext(TaskContext);
  const { componentProps, handleUpdateTaskComponent } = taskContext;

  useEffect(() => {
    fetch(new Request(componentProps.apiUrl))
      .then((response) => response.json())
      .then((repos) => {
        handleUpdateTaskComponent({ repos });
      })
      .catch((error) => {});
  }, [componentProps.apiUrl, handleUpdateTaskComponent]);
  return <React.Fragment></React.Fragment>;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GitHubProjects);
