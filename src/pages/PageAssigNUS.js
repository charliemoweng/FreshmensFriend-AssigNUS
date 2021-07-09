import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Calendar from "../components/Calendar/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager/TaskManager";
import { firebase } from "@firebase/app";

function PageAssigNUS() {
  console.log("page assignus called");

  // Modules Array
  const [modules, setModulesState] = useState([]);

  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   const docRef = db.collection("/modules").doc(uid);

  //   docRef.get().then((doc) => {
  //     if (doc.exists) {
  //       setModulesState(doc.data().modules);
  //       console.log("old user data retrieved");
  //       // Need to call this before Taskmanager Fires
  //     } else {
  //       setModulesState([]);
  //       console.log("new user");
  //     }
  //   });
  // }, []);

  // States of a Module: ID, Name, Color, Rank

  // ID
  const [moduleId, setModuleId] = useState(0);
  // Name
  const [moduleName, setModuleName] = useState("");
  // Color
  const [moduleColor, setModuleColor] = useState("#ff6900");
  // Rank
  const [moduleRank, setModuleRank] = useState(1);

  function setModules(newModules) {
    setModulesState(newModules);
    window.localStorage.setItem("modules", JSON.stringify(newModules));
  }
  useEffect(() => {
    const savedModules = JSON.parse(window.localStorage.getItem("modules"));
    setModulesState(savedModules ?? []);
  }, []);

  // Tasks Array
  const [tasks, setTasksState] = useState([]);

  // ID
  const [taskId, setTaskId] = useState(0);
  // Mod
  const [taskMod, setTaskMod] = useState("");
  // Name
  const [taskName, setTaskName] = useState("");
  // Due
  const [taskDue, setTaskDue] = useState(new Date());
  // Start
  const [taskStart, setTaskStart] = useState(new Date());
  // End
  const [taskEnd, setTaskEnd] = useState(new Date());
  // Weightage
  const [taskWeight, setTaskWeight] = useState(0);
  // Completion
  const [taskComplete, setTaskComplete] = useState(false);
  // Rank
  const [taskRank, setTaskRank] = useState(1);

  function setTasks(newTasks) {
    setTasksState(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  useEffect(() => {
    const savedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasksState(savedTasks ?? []);
  }, []);

  return (
    <>
      <Header modules={modules} setModulesState={setModulesState} />

      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <Calendar
            tasks={tasks}
            setTasks={setTasks}
            modules={modules}
            setModules={setModules}
          />

          <TaskManager
            modules={modules}
            setModules={setModules}
            moduleId={moduleId}
            setModuleId={setModuleId}
            moduleName={moduleName}
            setModuleName={setModuleName}
            moduleColor={moduleColor}
            setModuleColor={setModuleColor}
            moduleRank={moduleRank}
            setModuleRank={setModuleRank}
            tasks={tasks}
            setTasks={setTasks}
            taskId={taskId}
            setTaskId={setTaskId}
            taskMod={taskMod}
            setTaskMod={setTaskMod}
            taskName={taskName}
            setTaskName={setTaskName}
            taskDue={taskDue}
            setTaskDue={setTaskDue}
            taskStart={taskStart}
            setTaskStart={setTaskStart}
            taskEnd={taskEnd}
            setTaskEnd={setTaskEnd}
            taskWeight={taskWeight}
            setTaskWeight={setTaskWeight}
            taskComplete={taskComplete}
            setTaskComplete={setTaskComplete}
            taskRank={taskRank}
            setTaskRank={setTaskRank}
          />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
