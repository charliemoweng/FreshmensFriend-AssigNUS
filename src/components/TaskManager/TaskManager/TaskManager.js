import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./TaskManager.module.css";
import { Paper } from "@material-ui/core";

import MyModules from "../MyModules/MyModules/MyModules";
import TaskList from "../TaskList/TaskList/TaskList";
import TaskManagerAddMod from "../TaskManagerAddMod/TaskManagerAddMod";
import TaskManagerAddTask from "../TaskManagerAddTask/TaskManagerAddTask";
import TaskManagerRankTasks from "../TaskManagerRankTasks/TaskManagerRankTasks";

function TaskManager(props) {
  //console.log("task manager called");
  const {
    calendarStart,
    setCalendarStart,
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
    setTaskRank,
    taskReminder,
    setTaskReminder,
    taskGrids,
    setTaskGrids,
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
    setIsDisplayed,
    rankIsOpen,
    setRankIsOpen
  } = props;

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
            <div className={styles.TMButtonChild}>
              <TaskManagerAddMod
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
            <div className={styles.TMButtonChild}>
              <TaskManagerAddTask
                calendarStart={calendarStart}
                setCalendarStart={setCalendarStart}
                modules={modules}
                setModuless={setModules}
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
            </div>
            <div className={styles.TMButtonChild}>
              <TaskManagerRankTasks
                modules={modules}
                setModuless={setModules}
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
                rankIsOpen={rankIsOpen}
                setRankIsOpen={setRankIsOpen}
              />
            </div>
          </div>

          <div className={styles.MyModules}>
            <h3>My Modules</h3>
            <MyModules
              modules={modules}
              setModules={setModules}
              moduleName={moduleName}
              setModuleName={setModuleName}
              moduleColor={moduleColor}
              setModuleColor={setModuleColor}
              moduleRank={moduleRank}
              setModuleRank={setModuleRank}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>

          <div className={styles.TaskList}>
            <h3>Task List</h3>
            <TaskList
              modules={modules}
              setModuless={setModules}
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
              setTaskReminder={taskReminder}
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
