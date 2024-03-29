import React, { lazy, Suspense, useContext } from "react";
import TaskContext from "../../contexts/TaskContext";

const PDF = lazy(() => import("../apps/PDF"));
const WebView = lazy(() => import("../apps/WebView"));
const GitHubProjects = lazy(() => import("../apps/GitHubProjects"));
const Supermiro = lazy(() => import("../apps/Supermiro"));
const About = lazy(() => import("../apps/About"));

const components = {
  PDF,
  WebView,
  GitHubProjects,
  Supermiro,
  About
};

function ComponentLoader(props) {
  const taskContext = useContext(TaskContext);
  const { component } = taskContext;
  var Component = components[component];
  return (
    <Suspense fallback={"Chargement..."}>
      <Component />
    </Suspense>
  );
}

export default ComponentLoader;
