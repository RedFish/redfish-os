import getDefaultWindowProps from "../../utils/getDefaultWindowProps";

const FILE_CV_FR = {
  component: "PDF",
  componentProps: {
    subtitle: "CV Richard Guerci - FR.pdf",
    url: process.env.PUBLIC_URL + "/Curriculum_Vitae_Richard_GUERCI_FR.pdf"
  }
};
const FILE_CV_EN = {
  component: "PDF",
  componentProps: {
    subtitle: "CV Richard Guerci - EN.pdf",
    url: process.env.PUBLIC_URL + "/Curriculum_Vitae_Richard_GUERCI_EN.pdf"
  }
};
export const ABOUT_APP = {
  component: "About",
  componentProps: {}
};
function defineDividerComponent(title) {
  return {
    component: "Divider",
    componentProps: {
      title
    }
  };
}

export const INITIAL_STATE = {
  desktopFiles: [FILE_CV_FR, FILE_CV_EN],
  menuItems: [
    defineDividerComponent("Profil"),
    //Linkedin
    {
      component: "Link",
      componentProps: {
        appname: "Linkedin",
        iconProps: {
          icon: ["fab", "linkedin"],
          color: "#0e76a8"
        },
        url: "https://www.linkedin.com/in/rguerci/"
      }
    },
    //GitHub
    {
      component: "Link",
      componentProps: {
        appname: "GitHub",
        iconProps: {
          icon: ["fab", "github"],
          color: "#212121"
        },
        url: "https://github.com/RedFish"
      }
    },
    //Mail
    {
      component: "Link",
      componentProps: {
        appname: "Mail",
        subtitle: "Contactez-moi",
        iconProps: {
          icon: "at",
          color: "#472622"
        },
        url: "mailto:richard.guerci@telecomnancy.net"
      }
    },
    ABOUT_APP,
    defineDividerComponent("Apps"),
    {
      component: "GitHubProjects",
      componentProps: {
        apiUrl: "https://api.github.com/users/RedFish/repos"
      }
    },
    {
      component: "WebView",
      componentProps: {
        appname: "Générateur d'attestations",
        iconProps: {
          icon: "virus",
          color: "#BDD834"
        },
        url: "https://redfish.github.io/generateur-attestation/",
        githubUrl: "https://github.com/RedFish/generateur-attestation"
      }
    },
    {
      component: "Supermiro",
      componentProps: {}
    },
    defineDividerComponent("Fichiers"),
    FILE_CV_FR,
    FILE_CV_EN
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
    welcome: {
      taskId: "welcome",
      windowProps: getDefaultWindowProps(ABOUT_APP.component, 0),
      ...ABOUT_APP
    }
  },
  //Contains all tasks id => z-index of a task is defined by its uuid position in this array
  taskZIndexes: ["welcome"],
  //Contains all tasks id  => define app bar order
  taskXOrders: ["welcome"]
};
