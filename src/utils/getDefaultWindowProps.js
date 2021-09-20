const DEFAULT_SIZES = {
  PDF: {
    fullscreen: false,
    //A4 page size ratio
    width: 600,
    height: 800
  }
};

//Compute new window position and size
//This function check window sizes to insert task within the window
export default function getDefaultWindowProps(component, componentCount) {
  //Size
  const size = DEFAULT_SIZES[component] || { width: 400, height: 300 };
  if (size.width > window.innerWidth) {
    size.width = window.innerWidth;
  }
  if (size.height > window.innerHeight) {
    size.height = window.innerHeight;
  }
  //Position
  const shift = 25;
  const maxPositionComponentCount = {
    x: (window.innerWidth - size.width) / shift,
    y: (window.innerHeight - size.height) / shift
  };
  const position = {
    x: 50 + (componentCount % maxPositionComponentCount.x) * shift,
    y: 50 + (componentCount % maxPositionComponentCount.y) * shift
  };
  const result = {
    ...size,
    ...position
  };
  return result;
}
