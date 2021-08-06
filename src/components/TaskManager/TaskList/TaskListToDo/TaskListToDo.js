import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { firebase } from "@firebase/app";
import TaskRenamer from "./TaskRenamer";
import TaskReranker from "./TaskReranker";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import styles from "./TaskListToDo.module.css";
import Tooltip from "@material-ui/core/Tooltip";
// import addNotification from "react-push-notification";
// import AddAlertIcon from "@material-ui/icons/AddAlert";

{
  /* Tasks will only appear in this TaskList after being added from the AddTask, 
and Tasks will only be added to the TaskListCompleted after their checkbox has been checked*/
}

function TaskListToDo(props) {
  //console.log("task list todo called");
  const {
    modules,
    setModules,
    moduleId,
    setModuleId,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank,
    tasks,
    setTasks,
    taskGrids,
    setTaskGrids,
    taskId,
    setTaskId,
    taskMod,
    setTaskMod,
    taskName,
    setTaskName,
    taskDue,
    setTaskDue,
    taskStart,
    setTaskStart,
    taskEnd,
    setTaskEnd,
    taskWeight,
    setTaskWeight,
    taskComplete,
    setTaskComplete,
    taskRank,
    setTaskRank,
    taskReminder,
    setTaskReminder,
    taskReminderExact,
    setTaskReminderExact,
    taskGridId,
    setTaskGridId,
    taskGridName,
    setTaskGridName,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    color,
    setColor,
    isDisplayed,
    setIsDisplayed
  } = props;

  useEffect(() => {}, [tasks]);
  // console.log("tasks array is: " + JSON.stringify(tasks));

  const tasksHardcode = [
    {
      taskId: 0,
      taskRank: 1,
      taskMod: "m1",
      taskName: "t1",
      taskDue: "2021-01-01T00:00"
    },
    {
      taskId: 1,
      taskRank: 2,
      taskMod: "m1",
      taskName: "t2",
      taskDue: "2021-01-01T00:00"
    },
    {
      taskId: 2,
      taskRank: 3,
      taskMod: "m2",
      taskName: "t1",
      taskDue: "2021-01-01T00:00"
    }
  ];
  // useEffect(() => {}, [tasksHardcode]);

  const [newTaskDue, setNewTaskDue] = useState(new Date());

  function handleDelete(task) {
    // Delete ALL for quick debugging
    // setTasks([]);

    // local copy for updating ranks
    const arrayToUpdateRanks = [...tasks];
    const gridsArrayToUpdateRanks = [...taskGrids];
    // Saving rank of item being deleted in order to compare with and rerank other tasks in the array
    const deletedRank = task.taskRank;

    function updateRankOnDeletion(taskChecked) {
      if (taskChecked.taskRank > deletedRank) {
        // console.log("Need to update rank");
        taskChecked.taskRank--;
      }
    }

    arrayToUpdateRanks.forEach((element) => {
      updateRankOnDeletion(element);
    });

    gridsArrayToUpdateRanks.forEach((element) => {
      updateRankOnDeletion(element);
    });

    // Good practice to keep original modules array immutable so create local copy
    const newArray = arrayToUpdateRanks.filter(
      (element) => element.taskId !== task.taskId
    );
    // updates the modules array using the updated local copy
    setTasks(newArray);

    const newGridsArray = gridsArrayToUpdateRanks.filter(
      (element) => element.taskGridId !== task.taskId
    );
    setTaskGrids(newGridsArray);
  }

  function handleTaskComplete(event, taskId) {
    // event.preventDefault();

    const arrayForTaskComplete = [...tasks];
    if (arrayForTaskComplete.find((element) => element.taskId === undefined)) {
      alert("Error: taskId not found");
    }

    const currTask = arrayForTaskComplete.find(
      (element) => element.taskId === taskId
    );
    // console.log("currTask is: " + JSON.stringify(currTask));
    currTask.taskComplete = event.target.checked;

    // update ranks for all other tasks, completed tasks always flushed to the bottom
    const newArray = [];
    // first add all incomplete items to new array
    arrayForTaskComplete.forEach((element) => {
      if (!element.taskComplete) {
        newArray.push(element);
      }
    });
    // then add all completed items
    arrayForTaskComplete.forEach((element) => {
      if (element.taskComplete) {
        newArray.push(element);
      }
    });
    // next, rerank according to position in array
    for (var i = 0; i < newArray.length; i++) {
      newArray[i].taskRank = i + 1;
    }
    // finally, update ranks of new array
    newArray.sort((a, b) => (a.taskRank > b.taskRank ? 1 : -1));
    setTasks(arrayForTaskComplete);
  }

  function handleTaskDueChange(event, taskId) {
    // event.preventDefault();

    const arrayForDueChange = [...tasks];
    if (arrayForDueChange.find((element) => element.taskId === undefined)) {
      alert("Error: taskId not found");
    }

    const currTask = arrayForDueChange.find(
      (element) => element.taskId === taskId
    );
    //console.log("currTask is: " + JSON.stringify(currTask));
    //console.log("event is:" + JSON.stringify(event));
    currTask.taskDue = event;
    setTasks(arrayForDueChange);
  }

  // const buttonClick = () => {
  //   addNotification({
  //     title: "Warning",
  //     subtitle: "This is a subtitle",
  //     message: "This is a very long message",
  //     theme: "darkblue",
  //     native: true // when using native, your OS will handle theming.
  //   });
  // };

  return (
    <table
      className={styles.cmTable}
      style={{ margin: "0 auto", width: "100%" }}
    >
      <thead>
        <tr>
          <th></th>
          <th>Rank</th>
          <th>Mod</th>
          <th>Task</th>
          <th></th>
          <th>Due</th>
        </tr>
      </thead>
      <tbody className={styles.tableContent}>
        {tasks.map((task, index) =>
          !task.taskComplete ? (
            <tr key={index}>
              <td className={styles.taskCheckbox}>
                <Checkbox
                  color="primary"
                  checked={task.taskComplete}
                  onChange={(event) => handleTaskComplete(event, task.taskId)}
                  inputProps={{
                    "aria-label": `checkbox that determines if task ${index} is done`
                  }}
                />
              </td>
              {/* <td>{index + 1}</td> */}
              <td className={styles.rankCol}>
                <td className={styles.rankColObj}>{task.taskRank}</td>
                <TaskReranker
                  className={styles.rankColObj}
                  taskId={task.taskId}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              </td>
              <td>{task.taskMod}</td>
              <td>{task.taskName}</td>

              <td>
                <TaskRenamer
                  taskId={task.taskId}
                  taskName={task.taskName}
                  taskMod={task.taskMod}
                  taskDue={task.taskDue}
                  taskReminder={task.taskReminder}
                  taskReminderExact={task.taskReminderExact}
                  taskStart={task.taskStart}
                  taskEnd={task.taskEnd}
                  tasks={tasks}
                  setTasks={setTasks}
                  modules={modules}
                  setModules={setModules}
                />
              </td>
              <td>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    key={task.taskId}
                    value={task.taskDue}
                    label="Due at"
                    onError={console.log}
                    format="MM/dd hh:mm a"
                    margin="dense"
                    onChange={(event) =>
                      handleTaskDueChange(event, task.taskId)
                    }
                  />
                </MuiPickersUtilsProvider>
              </td>
              <td>
                <Tooltip title="Delete task">
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => {
                        handleDelete(task);
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </td>
              {/* <td>
                <IconButton aria-label="add alert">
                  <AddAlertIcon fontSize="small" onClick={buttonClick} />
                </IconButton>
              </td> */}
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
}

export default TaskListToDo;
