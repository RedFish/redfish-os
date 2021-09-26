import { Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { openTask, updateDesktop } from "../../redux/task/task.reducer";
import { selectDesktopFiles } from "../../redux/task/task.selectors";
import reorder from "../../utils/reorder";
import { getComponentInfo } from "../apps/main";
import DesktopIcon from "./DesktopIcon";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  desktop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 20
  },

  //Drag
  dragging: {
    //background: "red"
  },
  itemDragging: {
    background: "rgb(30, 30, 30, 0.5)",
    borderRadius: 5
  }
});

function Desktop({
  //Redux states
  desktopFiles,
  //Redux actions
  openTask,
  updateDesktop
}) {
  const classes = useStyles();

  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      updateDesktop({
        desktopFiles: reorder(
          desktopFiles,
          result.source.index,
          result.destination.index
        )
      });
    },
    [desktopFiles, updateDesktop]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-desktop">
        {(provided, snapshot) => (
          <Grid
            className={clsx(
              classes.desktop,
              snapshot.isDraggingOver && classes.dragging
            )}
            {...provided.droppableProps}
            ref={provided.innerRef}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {(desktopFiles || []).map((file, index) => {
              const appInfo = getComponentInfo(file);

              return (
                <Draggable
                  key={`${index}`}
                  draggableId={`${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Grid
                      item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={clsx(
                        snapshot.isDragging && classes.itemDragging
                      )}
                    >
                      <DesktopIcon
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => ({
  desktopFiles: selectDesktopFiles(state)
});

const mapDispatchToProps = (dispatch) => ({
  openTask: (payload) => dispatch(openTask(payload)),
  updateDesktop: (payload) => dispatch(updateDesktop(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
