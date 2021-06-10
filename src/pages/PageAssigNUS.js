import React, { useState } from "react";
import Header from "../components/Header/Header";

import Calendar from "../components/Calendar/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager/TaskManager";

function PageAssigNUS() {
  const [modules, setModulesState] = useState([]);
  const [tasks, setTasksState] = useState([]);

  function setModules(newModules) {
    setModulesState(newModules);
  }
  function setTasks(newTasks) {
    setTasksState(newTasks);
  }

  return (
    <>
      <Header />
      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <Calendar tasks={tasks} />

          <TaskManager tasks={tasks} setTasks={setTasks} />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
