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
    setTaskRank
  } = props;

  useEffect(() => {}, [tasks]);
  console.log("tasks array is: " + JSON.stringify(tasks));

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

    // Good practice to keep original modules array immutable so create local copy
    const newArray = arrayToUpdateRanks.filter(
      (element) => element.taskId !== task.taskId
    );
    // updates the modules array using the updated local copy
    setTasks(newArray);
  }

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];

    setTasks(newTasks);
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

  return (
    <table
      className={styles.paddingBetweenCols}
      style={{ margin: "0 auto", width: "100%" }}
    >
      {/* <thead>
        <tr>
          <th>No.</th>
          <th>Rank</th>
          <th>Mod</th>
          <th>Task</th>
          <th>Completed</th>
        </tr>
      </thead> */}
      <tbody className={styles.tableContent}>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>
              <Checkbox
                color="primary"
                checked={task.isComplete}
                onChange={(event) => handleTaskComplete(event, task.taskId)}
                inputProps={{
                  "aria-label": `checkbox that determines if task ${index} is done`
                }}
              />
            </td>
            {/* <td>{index + 1}</td> */}
            <td className={styles.rankCol}>
              <div className={styles.rankColObj}>{task.taskRank}</div>
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
                tasks={tasks}
                setTasks={setTasks}
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
                  onChange={(event) => handleTaskDueChange(event, task.taskId)}
                />
              </MuiPickersUtilsProvider>
            </td>
            <td>
              <IconButton aria-label="delete">
                <DeleteIcon
                  fontSize="small"
                  onClick={() => {
                    handleDelete(task);
                  }}
                />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskListToDo;
