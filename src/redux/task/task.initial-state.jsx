export const INITIAL_STATE = {
  desktopFiles: [
    {
      component: "PDF",
      componentProps: {
        subtitle: "CV Richard Guerci.pdf",
        url: process.env.PUBLIC_URL + "/Curriculum_Vitae_Richard_GUERCI_FR.pdf"
      }
    }
  ],
  //All runing tasks
  //A task is identified by a unique id
  taskContents: {
    /*
    Structure example of a task: (each task  contain its own window state and component state)
    "some unique id" : {
      taskId: "some unique id",
      windowProps: {
        x, y, width, height ...
      }
      component: "Component name to call for this task"
      componentProps: {} //All props to pass to `component`
    }
    */
  },
  //Contains all tasks id => z-index of a task is defined by its uuid position in this array
  taskZIndexes: [],
  //Contains all tasks id  => define app bar order
  taskXOrders: []
};
