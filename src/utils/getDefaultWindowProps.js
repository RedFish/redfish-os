const DEFAULT_SIZES = {
  PDF: {
    fullscreen: false,
    //A4 page size ratio
    width: 450,
    height: 600
  },
  WebView: {
    fullscreen: false,
    width: 500,
    height: 600
  },
  GitHubProjects: {
    fullscreen: false,
    width: 500,
    height: 600
  }
};

//Compute new window position and size
//This function check window sizes to insert task within the window
export default function getDefaultWindowProps(component, componentCount) {
  //Size
  const size = DEFAULT_SIZES[component] || {
    width: 400,
    height: 300,
    fullscreen: false
  };
  if (size.width > window.innerWidth) {
    size.width = window.innerWidth;
    size.fullscreen = true;
  }
  if (size.height > window.innerHeight) {
    size.height = window.innerHeight;
    size.fullscreen = true;
  }
  //Position
  const shift = 25;
  const maxPositionComponentCount = {
    x: (window.innerWidth - size.width) / shift,
    y: (window.innerHeight - size.height) / shift
  };
  const position = {
    x:
      window.innerWidth * 0.1 +
      (componentCount % maxPositionComponentCount.x) * shift,
    y:
      window.innerHeight * 0.1 +
      (componentCount % maxPositionComponentCount.y) * shift
  };
  const result = {
    ...size,
    ...position
  };
  return result;
}
