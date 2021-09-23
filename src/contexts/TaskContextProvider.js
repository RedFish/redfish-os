import { useMemo } from "react";
import { connect } from "react-redux";
import ComponentLoader from "../components/os/ComponentLoader";
import Window from "../components/os/Window";
import {
  closeTask,
  updateTaskComponent,
  updateTaskWindow
} from "../redux/task/task.reducer";
import TaskContext from "./TaskContext";

function TaskContextProvider({
  taskContent,
  closeTask,
  updateTaskWindow,
  updateTaskComponent
}) {
  const handleCloseTask = useMemo(() => {
    return () => {
      closeTask({ taskId: taskContent.taskId });
    };
  }, [closeTask, taskContent.taskId]);
  const handleUpdateTaskWindow = useMemo(() => {
    return (props) => {
      updateTaskWindow({ taskId: taskContent.taskId, props });
    };
  }, [taskContent.taskId, updateTaskWindow]);
  const handleUpdateTaskComponent = useMemo(() => {
    return (props) => {
      updateTaskComponent({ taskId: taskContent.taskId, props });
    };
  }, [taskContent.taskId, updateTaskComponent]);

  const value = useMemo(
    () => ({
      ...taskContent,
      handleCloseTask,
      handleUpdateTaskWindow,
      handleUpdateTaskComponent
    }),
    [
      handleCloseTask,
      handleUpdateTaskComponent,
      handleUpdateTaskWindow,
      taskContent
    ]
  );

  return (
    <TaskContext.Provider key={taskContent.taskId} value={value}>
      <Window>
        <ComponentLoader />
      </Window>
    </TaskContext.Provider>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  closeTask: (payload) => dispatch(closeTask(payload)),
  updateTaskWindow: (payload) => dispatch(updateTaskWindow(payload)),
  updateTaskComponent: (payload) => dispatch(updateTaskComponent(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContextProvider);
