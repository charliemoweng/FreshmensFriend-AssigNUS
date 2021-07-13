import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function TaskReranker(props) {
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

  // local copies
  const arrayForRerankingTasks = [...tasks];
  const lowestRank = arrayForRerankingTasks.length;

  /**
   * This helper function swaps the ranks of the 2 mods.
   *
   * @param {Current Task being reranked} currTask
   * @param {Other Task being swapped} swappedTask
   */
  function swapRankTask(currTask, swappedTask) {
    const currRank = currTask.taskRank;
    const swappedRank = swappedTask.taskRank;
    currTask.taskRank = swappedRank;
    swappedTask.taskRank = currRank;
    // call sort here to resort entire array by taskRank
    // list.sort((a, b) => (a.color > b.color) ? 1 : -1)
    arrayForRerankingTasks.sort((a, b) => (a.taskRank > b.taskRank ? 1 : -1));
  }

  function handleUprankTask(taskId) {
    // if undefined, throw error
    if (
      arrayForRerankingTasks.find((element) => element.taskId === undefined)
    ) {
      alert("Error: taskId not found");
    }
    const currTask = arrayForRerankingTasks.find(
      (element) => element.taskId === taskId
    );
    // if already highest rank, alert
    if (currTask.taskRank === 1) {
      console.log("This is the highest rank!");
    } else {
      const currRank = currTask.taskRank;
      arrayForRerankingTasks.forEach((element) => {
        if (element.taskRank === currRank - 1) {
          swapRankTask(currTask, element);
          setTasks(arrayForRerankingTasks);
        }
      });
    }
  }

  function handleDownrankTask(taskId) {
    // if undefined, throw error
    if (
      arrayForRerankingTasks.find((element) => element.taskId === undefined)
    ) {
      alert("Error: taskId not found");
    }
    const currTask = arrayForRerankingTasks.find(
      (element) => element.taskId === taskId
    );
    // if already lowest rank, alert
    if (currTask.taskRank === lowestRank) {
      console.log("This is the lowest rank!");
    } else {
      const currRank = currTask.taskRank;
      arrayForRerankingTasks.forEach((element) => {
        if (element.taskRank === currRank + 1) {
          swapRankTask(currTask, element);
          setTasks(arrayForRerankingTasks);
        }
      });
    }
  }

  return (
    <div>
      <div>
        <IconButton aria-label="uprankTask">
          <KeyboardArrowUpIcon
            fontSize="small"
            onClick={() => {
              handleUprankTask(taskId);
            }}
          />
        </IconButton>
      </div>
      <div>
        <IconButton aria-label="downrankTask">
          <KeyboardArrowDownIcon
            fontSize="small"
            onClick={() => {
              handleDownrankTask(taskId);
            }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default TaskReranker;
