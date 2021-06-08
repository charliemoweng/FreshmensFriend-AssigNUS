import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./TaskManager.module.css";
import { Paper } from "@material-ui/core";

import MyModules from "../MyModules/MyModules";
import TaskList from "../TaskList/TaskList/TaskList";
import TaskManagerAddMod from "../TaskManagerAddMod/TaskManagerAddMod";
import TaskManagerAddTask from "../TaskManagerAddTask/TaskManagerAddTask";
import TaskManagerRankTasks from "../TaskManagerRankTasks/TaskManagerRankTasks";

function TaskManager(props) {
  const { tasks, setTasks } = props;

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
    <div className={styles.BoxTM}>
      <Paper elevation={3}>
        <div className={styles.TaskManager}>
          <h2>Task Manager</h2>
          {/*
          <h3>Add Tasks</h3>
          <form onSubmit={handleAddTask}>
            <TextField
              className={styles.descTextField}
              label="Name of Assignment"
              value={newTaskText}
              onChange={(event) => setNewTaskText(event.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </form>

          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Rank Tasks
          </Button>

*/}

          <div className={styles.TMButtonParent}>
            <div className={styles.TMButtonLeft}>
              <TaskManagerAddMod tasks={tasks} setTasks={setTasks} />
            </div>
            <div className={styles.TMButtonMiddle}>
              <TaskManagerAddTask tasks={tasks} setTasks={setTasks} />
            </div>
            <div className={styles.TMButtonRight}>
              <TaskManagerRankTasks tasks={tasks} setTasks={setTasks} />
            </div>
          </div>

          <div className={styles.MyModules}>
            <h3>My Modules</h3>
            <MyModules />
          </div>

          <div className={styles.TaskList}>
            <h3>Task List</h3>
            <TaskList tasks={tasks} setTasks={setTasks} />

            {/*<table
            className={styles.paddingBetweenCols}
            style={{ margin: "0 auto", width: "100%" }}
          >
            
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
                    */}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default TaskManager;
