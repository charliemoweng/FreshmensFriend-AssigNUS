import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./TaskListToDo.module.css";

{
  /* Tasks will only appear in this TaskList after being added from the AddTask, 
and Tasks will only be added to the TaskListCompleted after their checkbox has been checked*/
}

function TaskListToDo() {
  const [tasks, setTasks] = useState([]);
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

export default TaskListToDo;
