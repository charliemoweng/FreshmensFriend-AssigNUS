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
    taskReminderExact,
    setTaskReminderExact,
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

  return (
    <div className={styles.BoxTM}>
      <Paper elevation={3}>
        <div className={styles.TaskManager}>
          <h2>Task Manager</h2>

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
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default TaskManager;
