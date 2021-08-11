import React, { useState, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import Header from "../components/Header/Header";
import Calendar from "../components/Calendar/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager/TaskManager";
import { firebase } from "@firebase/app";
import addNotification from "react-push-notification";
import DateFnsUtils from "@date-io/date-fns";
import { subHours, parseISO, format } from "date-fns";

function PageAssigNUS() {
  //console.log("page assignus called");

  // Starting date in Calendar
  const [calendarStart, setCalendarStart] = useStateWithCallbackLazy(
    new Date()
  );

  // TaskGrid Array
  const [taskGrids, setTaskGrids] = useStateWithCallbackLazy([]);

  //States for a TaskGrid: taskGridName, startTime, endTime, color, isDisplayed
  const [taskGridId, setTaskGridId] = useState(0);
  const [taskGridName, setTaskGridName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [color, setColor] = useState("#ff6900");
  const [isDisplayed, setIsDisplayed] = useState(false);

  // Modules Array
  const [modules, setModulesState] = useState([]);

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
  const [taskMod, setTaskMod] = useStateWithCallbackLazy("");
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
  // Reminder (relative to taskDue)
  const [taskReminder, setTaskReminder] = useState(0);
  // Reminder (absolute time)
  const [taskReminderExact, setTaskReminderExact] = useState(null);

  function setTasks(newTasks) {
    setTasksState(newTasks);
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  useEffect(() => {
    const savedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasksState(savedTasks ?? []);
  }, []);

  // clock displaying current time
  const [currTime, setCurrTime] = useState(new Date().toLocaleString());

  // prop checking if rankTasks window is open
  const [rankIsOpen, setRankIsOpen] = useState(false);

  useEffect(() => {
    if (!rankIsOpen) {
      let secTimer = setInterval(() => {
        setCurrTime(new Date().toString());
      }, 1000);

      return () => clearInterval(secTimer);
    }
  }, [rankIsOpen]);

  // logic for setting reminder relative to deadline (relative reminder)
  // const currTasks = [...tasks];
  // currTasks.forEach((element) => {
  //   const taskReminderTime = subHours(
  //     new Date(element.taskDue),
  //     element.taskReminder
  //   );
  //   // test test
  //   // console.log(subHours(new Date(element.taskDue), element.taskReminder));
  //   // console.log("currTime is: " + currTime);
  //   // console.log("taskReminderTime is: " + taskReminderTime);

  //   const currTimeDate = new Date(currTime);
  //   const currTimeSeconds = format(currTimeDate, "t");
  //   const reminderTimeSeconds = format(new Date(taskReminderTime), "t");

  //   // test
  //   // console.log("currTimeSeconds is: " + currTimeSeconds);
  //   // console.log("reminderTimeSeconds is: " + reminderTimeSeconds);

  //   if (currTimeSeconds === reminderTimeSeconds) {
  //     // send reminder here
  //     const sendNotif = () => {
  //       addNotification({
  //         title: "Reminder",
  //         subtitle: "Friendly reminder from AssigNUS",
  //         message:
  //           "Your task " +
  //           element.taskName +
  //           " from module " +
  //           element.taskMod +
  //           " is due in " +
  //           element.taskReminder +
  //           ` hour${element.taskReminder === 1 ? `` : `s`}`,
  //         theme: "darkblue",
  //         duration: 3500,
  //         native: true // when using native, your OS will handle theming.
  //       });
  //     };
  //     sendNotif();
  //     // console.log("Push notification sent");
  //   }
  //   // console.log("checking" + currTime);
  // });

  // logic for setting reminder at a specific time (absolute reminder)
  // using this version as of AssigNUS v1.1.0
  const currTasks = [...tasks];
  currTasks.forEach((element) => {
    const taskReminderTime = element.taskReminderExact;
    // console.log(subHours(new Date(element.taskDue), element.taskReminder));
    // console.log("currTime is: " + currTime);
    // console.log("taskReminderTime is: " + taskReminderTime);

    const currTimeDate = new Date(currTime);
    const currTimeSeconds = format(currTimeDate, "t");
    const reminderTimeSeconds = format(new Date(taskReminderTime), "t");

    // console.log("currTimeSeconds is: " + currTimeSeconds);
    // console.log("reminderTimeSeconds is: " + reminderTimeSeconds);

    if (currTimeSeconds === reminderTimeSeconds) {
      // send reminder here
      const sendNotif = () => {
        addNotification({
          title: "Reminder",
          subtitle: "Friendly reminder from AssigNUS",
          message:
            "Your task " +
            element.taskName +
            " from module " +
            element.taskMod +
            " is due soon.",
          theme: "darkblue",
          duration: 3500,
          native: true // when using native, your OS will handle theming.
        });
      };
      sendNotif();
      console.log("Push notification sent");
    }
    // console.log("checking" + currTime);
  });

  return (
    <>
      <Header modules={modules} setModulesState={setModulesState} />
      <div>{currTime}</div>
      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <Calendar
            calendarStart={calendarStart}
            setCalendarStart={setCalendarStart}
            tasks={tasks}
            setTasks={setTasks}
            modules={modules}
            setModules={setModules}
            taskGrids={taskGrids}
            setTaskGrids={setTaskGrids}
            taskGridId={taskGridId}
            setTaskGridId={setTaskGridId}
            taskGridName={taskGridName}
            setTaskGridName={setTaskGridName}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            color={color}
            setColor={setColor}
            isDisplayed={isDisplayed}
            setIsDisplayed={setIsDisplayed}
          />

          <TaskManager
            calendarStart={calendarStart}
            setCalendarStart={setCalendarStart}
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
            taskReminder={taskReminder}
            setTaskReminder={setTaskReminder}
            taskReminderExact={taskReminderExact}
            setTaskReminderExact={setTaskReminderExact}
            taskGrids={taskGrids}
            setTaskGrids={setTaskGrids}
            taskGridId={taskGridId}
            setTaskGridId={setTaskGridId}
            taskGridName={taskGridName}
            setTaskGridName={setTaskGridName}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            color={color}
            setColor={setColor}
            isDisplayed={isDisplayed}
            setIsDisplayed={setIsDisplayed}
            rankIsOpen={rankIsOpen}
            setRankIsOpen={setRankIsOpen}
          />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
