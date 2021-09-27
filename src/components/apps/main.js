import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SupermiroLogo from "../../assets/supermiro/icon.png";

const COMPONENT_INFO = {
  PDF: {
    appname: "PDF",
    icon: (props) => (
      <FontAwesomeIcon icon="file-pdf" size="4x" color="#AE1703" {...props} />
    )
  },
  WebView: {
    appname: "Navigateur",
    icon: (props) => (
      <FontAwesomeIcon
        icon={["fab", "safari"]}
        size="4x"
        color="#0FB5EE"
        {...props}
      />
    )
  },
  Link: {
    appname: "Lien",
    icon: (props) => <FontAwesomeIcon icon="link" size="4x" {...props} />
  },
  GitHubProjects: {
    appname: "Projets GitHub",
    icon: (props) => (
      <FontAwesomeIcon icon="satellite" size="4x" color="#f5ac2f" {...props} />
    )
  },
  Supermiro: {
    appname: "Supermiro",
    icon: (props) => {
      let size;
      switch (props.size) {
        case "2x":
          size = 28;
          break;
        default:
          size = 52;
      }

      return <img src={SupermiroLogo} width={size} alt="Surpermiro Logo" />;
    }
  }
};

export function getComponentInfo({ component, componentProps }) {
  const appInfo = COMPONENT_INFO[component];
  return {
    appname: componentProps.appname || appInfo.appname,
    icon: (props) => appInfo.icon({ ...componentProps.iconProps, ...props })
  };
}
