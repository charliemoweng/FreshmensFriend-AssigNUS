import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Calendar from "../components/Calendar/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager/TaskManager";
import { firebase } from "@firebase/app";

function PageAssigNUS() {
  const [modules, setModulesState] = useState([]);

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/modules").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setModulesState(doc.data().modules);
        console.log("old user data retrieved");
        // Need to call this before Taskmanager Fires
      } else {
        setModulesState([]);
        console.log("new user");
      }
    });
  }, []);

  // States of a Module: ID, Name, Color, Rank

  // ID
  const [moduleId, setModuleId] = useState(0);
  // Name
  const [moduleName, setModuleName] = useState("");

  // Color
  const [moduleColor, setModuleColor] = useState("#ff6900");

  // Rank
  const [moduleRank, setModuleRank] = useState(1);

  const [tasks, setTasksState] = useState([]);

  function setModules(newModules) {
    setModulesState(newModules);
    //window.localStorage.setItem("modules", JSON.stringify(newModules));
  }
  // useEffect(() => {
  //   const savedModules = JSON.parse(window.localStorage.getItem("modules"));
  //   setModulesState(savedModules ?? []);
  // }, []);

  function setTasks(newTasks) {
    setTasksState(newTasks);
  }

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
            tasks={tasks}
            setTasks={setTasks}
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
          />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
