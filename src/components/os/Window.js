import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { AddCircleSharp, Cancel, RemoveCircleSharp } from "@material-ui/icons";
import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";
import Draggable from "react-draggable";
import { connect } from "react-redux";
import { Resizable } from "react-resizable";
import TaskContext from "../../contexts/TaskContext";
import { selectTask } from "../../redux/task/task.reducer";
import {
  selectCurrentTaskId,
  selectTaskZIndexes
} from "../../redux/task/task.selectors";
import { COMPONENT_INFO } from "../apps/main";
import { APP_BAR_HEIGHT } from "./MyAppBar";

const useStyles = makeStyles((theme) => ({
  root: ({ width, height, zIndex }) => ({
    backgroundColor: "white",
    width,
    height,
    zIndex,
    borderRadius: theme.spacing(1),
    border: "1px solid gray",
    position: "absolute"
  }),
  windowTopBar: ({ isDragging }) => ({
    cursor: isDragging ? "grabbing" : "grab",
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }),
  title: ({ width }) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: width - 110,
    lineHeight: "40px",
    paddingLeft: theme.spacing(2)
  }),
  buttons: {
    paddingRight: theme.spacing(2)
  },
  windowContent: {
    position: "relative",
    flex: 1
  },
  inactive: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: "gray",
    borderRadius: theme.spacing(1)
  }
}));

function Window({
  children,
  //Redux states
  taskZIndexes,
  currentTaskId,
  //Redux actions
  selectTask
}) {
  const taskContext = useContext(TaskContext);
  const {
    windowProps,
    updateTaskWindow,
    closeTask,
    taskId,
    component,
    componentProps
  } = taskContext;
  const [maxConstraints, setMaxConstraints] = useState([
    window.innerWidth,
    window.innerHeight
  ]);
  const [isDragging, setIsDragging] = useState(false);

  //Bounds memoize variables
  const position = useMemo(() => {
    return windowProps.fullscreen
      ? { x: 0, y: 0 }
      : { x: windowProps.x, y: windowProps.y };
  }, [windowProps.x, windowProps.y, windowProps.fullscreen]);
  const width = useMemo(() => {
    return windowProps.fullscreen ? window.innerWidth : windowProps.width;
  }, [windowProps.width, windowProps.fullscreen]);
  const height = useMemo(() => {
    return windowProps.fullscreen
      ? window.innerHeight - APP_BAR_HEIGHT
      : windowProps.height;
  }, [windowProps.height, windowProps.fullscreen]);
  const classes = useStyles({
    isDragging,
    width,
    height,
    zIndex: taskZIndexes.indexOf(taskId)
  });

  // Window actions

  const handleClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeTask();
  };
  const handleFullscreen = (e) => {
    e.stopPropagation();
    updateTaskWindow((props) => ({ ...props, fullscreen: true }));
  };
  const handleReduce = (e) => {
    e.stopPropagation();
  };
  const toggleFullscreen = () => {
    updateTaskWindow((props) => ({
      ...props,
      fullscreen: !props.fullscreen
    }));
  };

  // Draggable callbacks
  const onStart = (e, data) => {
    setIsDragging(true);
    updateTaskWindow((props) => {
      //If full screen reset position
      if (props.fullscreen) {
        return { ...props, fullscreen: false, x: 0, y: 0 };
      }

      return props;
    });
  };

  const onStop = (e, { x, y }) => {
    setIsDragging(false);
    // Update position
    updateTaskWindow((props) => ({ ...props, x, y }));
  };

  // Resizable
  const onResize = (event, { element, size, handle }) => {
    updateTaskWindow((props) => ({ ...props, ...size }));
  };

  // Re-render on resize
  useEffect(() => {
    function handleResize() {
      // set max window size
      setMaxConstraints([window.innerWidth, window.innerHeight]);
      updateTaskWindow((props) => {
        // resize bounds within maxConstraints
        const width = Math.min(props.width, window.innerWidth);
        const height = Math.min(props.height, window.innerHeight);
        const x = Math.min(props.x, window.innerWidth - width);
        const y = Math.min(props.y, window.innerHeight - height);
        return { width, height, x, y };
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      // Remove listener on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, [updateTaskWindow]);

  const title = useMemo(() => {
    const res = [];
    const appInfo = COMPONENT_INFO[component];
    res.push(appInfo.appname);
    if (componentProps.subtitle) {
      res.push(componentProps.subtitle);
    }
    return res.join(" - ");
  }, [component, componentProps.subtitle]);

  return (
    <Draggable
      handle=".handle"
      position={position}
      onStart={onStart}
      onStop={onStop}
      bounds="parent"
    >
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        minConstraints={[300, 300]}
        maxConstraints={maxConstraints}
      >
        <Grid
          className={classes.root}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid
            item
            className={classes.windowTopBar}
            onDoubleClick={toggleFullscreen}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  className={clsx("handle", classes.title)}
                  variant="h6"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item className={classes.buttons}>
                <IconButton onClick={handleReduce}>
                  <RemoveCircleSharp />
                </IconButton>
                <IconButton onClick={handleFullscreen}>
                  <AddCircleSharp />
                </IconButton>
                <IconButton onClick={handleClose}>
                  <Cancel />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.windowContent}>
            {children}
          </Grid>
          {currentTaskId !== taskId && (
            <div
              className={classes.inactive}
              onClick={() => {
                selectTask({ taskId });
              }}
            />
          )}
        </Grid>
      </Resizable>
    </Draggable>
  );
}

const mapStateToProps = (state) => ({
  taskZIndexes: selectTaskZIndexes(state),
  currentTaskId: selectCurrentTaskId(state)
});

const mapDispatchToProps = (dispatch) => ({
  selectTask: (payload) => dispatch(selectTask(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
