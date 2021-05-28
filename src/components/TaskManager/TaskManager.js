import React, { useState } from "react";
import { Button, TextField, Checkbox } from "@material-ui/core";

import styles from "./TaskManager.module.css";
import { Paper } from "@material-ui/core";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  function handleAddTask(event) {
    event.preventDefault();
    addTask(newTaskText);
  }

  function addTask(description) {
    const newTasks = [
      ...tasks,
      {
        description: description,
        isComplete: false
      }
    ];
    setTasks(newTasks);
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
    <>
      <Paper elevation={3}>
        <div className={styles.TaskManager}>
          <h2>Task Manager</h2>
          <h3>Add Tasks</h3>
          <form onSubmit={handleAddTask}>
            <TextField
              className={styles.descTextField}
              label="Name of Assignment"
              value={newTaskText}
              onChange={(event) => setNewTaskText(event.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>

          <h3>Task List</h3>
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
        </div>
      </Paper>
    </>
  );
}

export default TaskManager;
