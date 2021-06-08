import React, { useState } from "react";
import Header from "../components/Header/Header";
import BaseCalendar from "../components/BaseCalendar/BaseCalendar";
import Calendar from "../components/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager/TaskManager";

function PageAssigNUS() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Header />
      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <BaseCalendar tasks={tasks} />

          <TaskManager tasks={tasks} setTasks={setTasks} />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
