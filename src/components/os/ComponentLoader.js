import React, { lazy, Suspense, useContext } from "react";
import TaskContext from "../../contexts/TaskContext";

const PDF = lazy(() => import("../apps/PDF"));

const components = {
  PDF
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
