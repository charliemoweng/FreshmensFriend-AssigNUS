import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import styles from "./TaskListCompleted.module.css";
import Tooltip from "@material-ui/core/Tooltip";

function TaskListCompleted(props) {
  //console.log("task list completed called");
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

  const [newTaskText, setNewTaskText] = useState("");

  // logic for showing and hiding tasks in completed and todo lists
  const [showTask, setShowTask] = useState(true);

  useEffect(() => {}, [tasks]);

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

  // function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
  //   const newTasks = [
  //     ...tasks.slice(0, toToggleTaskIndex),
  //     {
  //       description: toToggleTask.description,
  //       isComplete: !toToggleTask.isComplete
  //     },
  //     ...tasks.slice(toToggleTaskIndex + 1)
  //   ];

  //   setTasks(newTasks);
  // }

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

  return (
    <table
      className={styles.cmTable}
      style={{ margin: "0 auto", width: "100%" }}
    >
      <thead>
        <tr>
          <th></th>
          <th>Mod</th>
          <th>Task</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className={styles.tableContent}>
        {tasks.map((task, index) =>
          task.taskComplete ? (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td>
                <Checkbox
                  color="primary"
                  checked={task.taskComplete}
                  onChange={(event) => handleTaskComplete(event, task.taskId)}
                  inputProps={{
                    "aria-label": `checkbox that determines if task ${index} is done`
                  }}
                />
              </td>
              {/* <td>{task.taskRank}</td> */}
              <td>{task.taskMod}</td>
              <td>{task.taskName}</td>

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
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
}

export default TaskListCompleted;
