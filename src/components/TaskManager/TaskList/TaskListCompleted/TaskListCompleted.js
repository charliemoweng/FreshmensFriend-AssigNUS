import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import styles from "./TaskListCompleted.module.css";

{
  /* checking the Completed box in TaskListToDo lead to this place */
}

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
  const [newTaskText, setNewTaskText] = useState("");

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

  return (
    <table
      className={styles.paddingBetweenCols}
      style={{ margin: "0 auto", width: "100%" }}
    >
      {/* <thead>
        <tr>
          <th>No.</th>
          <th>Task</th>
          <th>Completed</th>
          <th>Add to Calendar</th>
        </tr>
      </thead> */}
      <tbody className={styles.tableContent}>
        {tasks.map((task, index) => (
          <tr key={task.description}>
            <td>{index + 1}</td>
            <td>{task.description}</td>
            <td>
              <Checkbox
                color="primary"
                checked={task.isComplete}
                onChange={() => handleTaskCompletionToggled(task, index)}
                inputProps={{
                  "aria-label": `checkbox that determines if task ${index} is done`
                }}
              />
            </td>
            <td className={styles.rankCol}>
              <div className={styles.rankColObj}>{task.taskRank}</div>
            </td>
            <td>{task.taskMod}</td>
            <td>{task.taskName}</td>

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

export default TaskListCompleted;
