import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./TaskListCompleted.module.css";

{
  /* checking the Completed box in TaskListToDo lead to this place */
}

function TaskListCompleted(props) {
  console.log("task list completed called");
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
      <thead>
        <tr>
          <th>No.</th>
          <th>Task</th>
          <th>Completed</th>
          <th>Add to Calendar</th>
        </tr>
      </thead>
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
            <td>
              <input type="submit" value="Drag me!" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskListCompleted;
