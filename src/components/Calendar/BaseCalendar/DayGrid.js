import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DayHeader from "./DayHeader";
import TaskGrid from "./TaskGrid";
import HourGrid from "./HourGrid";
import styles from "./DayGrid.module.css";
import { DateFnsUtils } from "@date-io/date-fns";
import { format } from "date-fns";
import { sizing, height } from "@material-ui/system";
import { GridList } from "material-ui";

function DayGrid(props) {
  // field: day, date
  // contains HourGrid
  const {
    dayGridId,
    gridDate,
    gridDay,
    tasks,
    setTasks,
    modules,
    setModules,
    dateStyle,
    taskNameStyle,
    intervalStyle
  } = props;

  // logic for checking tasks happening at this date to be done here
  // local copy of tasks array
  const currTasks = [...tasks];
  const todayTasks = currTasks.filter(
    (element) =>
      format(new Date(element.taskStart), "P") ===
      format(new Date(gridDate), "P")
  );

  // console.log(
  //   "todayTasks for DG" + dayGridId + " is: " + JSON.stringify(todayTasks)
  // );

  // dafult time array contains all integers from 0 to 23, represeting the hours in the day
  const displayArray1h = [];
  for (var i = 0; i < 24; i++) {
    // first check if todayTasks has a task that starts at hour i
    const iStringified = JSON.stringify(i);
    // reference to the task being found
    const task = todayTasks.find(
      (element) => format(new Date(element.taskStart), "H") === iStringified
    );
    if (task && modules.some((element) => element.modName === task.taskMod)) {
      // console.log("task found for current DayGrid");
      // get taskName from taskToAdd
      const taskNameToAdd = task.taskName;
      // get taskColor (actually modColor of taskMod) from taskToAdd
      const taskColorToAdd = modules.find(
        (module) => module.modName === task.taskMod
      ).modColor;
      // get taskComplete from taskToAdd
      const taskCompleteToAdd = task.taskComplete;

      var taskDuration1h =
        format(new Date(task.taskEnd), "H") -
        format(new Date(task.taskStart), "H") +
        1;
      // console.log("taskDuration is: " + taskDuration);
      // check minutes of taskEnd, if 0, dont add 1, else, add 1
      if (format(new Date(task.taskEnd), "m") === "0") {
        taskDuration1h--;
        // console.log("taskEnd has min0, subtracted 1 from duration");
      }
      // console.log("taskDuration is: " + taskDuration);

      // when adding task grid, add first taskGrid with name and rest with no name
      // i.e. first taskGrid will have nameDisplayed true and others will have that state as false

      // // there is a task starting at hour i, create taskGrid here and update i to be taskEnd
      // displayArray.push(
      //   <TaskGrid
      //     //class={"grid-xs-10"}
      //     taskName={taskNameToAdd}
      //     color={taskColorToAdd}
      //     nameDisplayed={true}
      //     isComplete={taskCompleteToAdd}
      //   />
      // );

      // // first taskGrid contained the name, rest will not display taskName
      // for (var j = 1; j < taskDuration; j++) {
      //   displayArray.push(
      //     <TaskGrid
      //       //class={"grid-xs-10"}
      //       taskName={taskNameToAdd}
      //       color={taskColorToAdd}
      //       nameDisplayed={false}
      //       isComplete={taskCompleteToAdd}
      //     />
      //   );
      // }

      // check taskNameStyle
      // if 0: first taskGrid gets nameDisplayed set to true
      // if 1: center (skewed top) taskGrid gets nameDisplayed set to true
      // if 2: last taskGrid gets nameDisplayed set to true
      var nameDisplayedPos1h = 0;
      if (taskNameStyle === "0") {
        nameDisplayedPos1h = 0;
      } else if (taskNameStyle === "1") {
        nameDisplayedPos1h = Math.floor((taskDuration1h - 1) / 2);
      } else {
        nameDisplayedPos1h = taskDuration1h - 1;
      }
      for (var t = 0; t < taskDuration1h; t++) {
        displayArray1h.push(
          <TaskGrid
            taskName={taskNameToAdd}
            color={taskColorToAdd}
            nameDisplayed={t === nameDisplayedPos1h}
            isComplete={taskCompleteToAdd}
          />
        );
      }

      // finally, update i using taskEnd
      i += taskDuration1h - 1;
    } else {
      // there isn't a task starting at hour i, add a default HourGrid with hour being i.
      // console.log("no tasks found for current dayGrid at hour" + i);
      displayArray1h.push(
        <Box>
          <HourGrid hourGridId={i} dayGridDate={gridDate} />
        </Box>
      );
    }
    // console.log("displayArray length is: " + displayArray.length);
  }

  // dafult time array contains all integers from 0 to 47,
  // represeting the hours in the day split into half-hour intervals
  const displayArray30m = [];
  for (var j = 0; j < 48; j++) {
    const jStringified = JSON.stringify(j);
    // reference to task being found at this half-hour
    const task = todayTasks.find(
      (element) =>
        format(new Date(element.taskStart), "H") ===
        JSON.stringify(Math.floor(j / 2))
    );

    // j is even, minutes between 0 and 29
    if (j % 2 === 0) {
      // first check if todayTasks has a task that starts at half-hour j
      if (
        task &&
        // minute less than 30
        parseInt(format(new Date(task.taskStart), "m"), 10) < 30 &&
        // task has module in modules array
        modules.some((element) => element.modName === task.taskMod)
      ) {
        // console.log("task found for current DayGrid");
        // get taskName from taskToAdd
        const taskNameToAdd = task.taskName;
        // get taskColor (actually modColor of taskMod) from taskToAdd
        const taskColorToAdd = modules.find(
          (module) => module.modName === task.taskMod
        ).modColor;
        // get taskComplete from taskToAdd
        const taskCompleteToAdd = task.taskComplete;

        // duration in increments of 30 minutes, hours * 2, then amend based on minutes
        var taskDuration30m =
          (format(new Date(task.taskEnd), "H") -
            format(new Date(task.taskStart), "H")) *
            2 +
          1;
        // since j%2===0, j is even, taskStart minutes is between 0 and 29, check taskEnd minutes
        // if taskEnd minutes is greater than 30, add 1
        if (parseInt(format(new Date(task.taskEnd), "m"), 10) < 30) {
          taskDuration30m++;
        }

        // console.log("taskDuration is: " + taskDuration);
        // check minutes of taskEnd, if 0, subtract 1, else, do nothing
        if (format(new Date(task.taskEnd), "m") === "0") {
          taskDuration30m--;
          // console.log("taskEnd has min0, subtracted 1 from duration");
        }
        // console.log("taskDuration is: " + taskDuration);

        // check taskNameStyle
        // if 0: first taskGrid gets nameDisplayed set to true
        // if 1: center (skewed top) taskGrid gets nameDisplayed set to true
        // if 2: last taskGrid gets nameDisplayed set to true
        var nameDisplayedPos30m = 0;
        if (taskNameStyle === "0") {
          nameDisplayedPos30m = 0;
        } else if (taskNameStyle === "1") {
          nameDisplayedPos30m = Math.floor((taskDuration30m - 1) / 2);
        } else {
          nameDisplayedPos30m = taskDuration30m - 1;
        }
        for (var u = 0; u < taskDuration30m; u++) {
          displayArray30m.push(
            <TaskGrid
              taskName={taskNameToAdd}
              color={taskColorToAdd}
              nameDisplayed={u === nameDisplayedPos30m}
              isComplete={taskCompleteToAdd}
            />
          );
        }

        // finally, update i using taskEnd
        j += taskDuration30m - 1;
      } else {
        // there isn't a task starting at hour i, add a default HourGrid with hour being i.
        // console.log("no tasks found for current dayGrid at hour" + i);
        displayArray30m.push(
          <Box>
            <HourGrid hourGridId={j} dayGridDate={gridDate} />
          </Box>
        );
      }
      // console.log("displayArray length is: " + displayArray.length);
    } else {
      // j is odd, minutes between 30 and 59
      // first check if todayTasks has a task that starts at half-hour j
      if (
        task &&
        // minute >= 30
        parseInt(format(new Date(task.taskStart), "m"), 10) >= 30 &&
        // task has module in modules array
        modules.some((element) => element.modName === task.taskMod)
      ) {
        // console.log("task found for current DayGrid");
        // get taskName from taskToAdd
        const taskNameToAdd = task.taskName;
        // get taskColor (actually modColor of taskMod) from taskToAdd
        const taskColorToAdd = modules.find(
          (module) => module.modName === task.taskMod
        ).modColor;
        // get taskComplete from taskToAdd
        const taskCompleteToAdd = task.taskComplete;

        // duration in increments of 30 minutes, hours * 2, then amend based on minutes
        taskDuration30m =
          (format(new Date(task.taskEnd), "H") -
            format(new Date(task.taskStart), "H")) *
            2 +
          1; //>??? 1 not added here since j is odd, 2nd half of the hour
        // since j%2!==0, j is odd, taskStart minutes is between 30 and 59, check taskEnd minutes
        // if taskEnd minutes is smaller than 30, subtract 1
        if (parseInt(format(new Date(task.taskEnd), "m"), 10) < 30) {
          taskDuration30m--;
        }

        // console.log("taskDuration is: " + taskDuration);
        // check minutes of taskEnd, if 30, subtract 1, else, do nothing
        if (format(new Date(task.taskEnd), "m") === "30") {
          taskDuration30m--;
          // console.log("taskEnd has min0, subtracted 1 from duration");
        }
        // console.log("taskDuration is: " + taskDuration);

        // check taskNameStyle
        // if 0: first taskGrid gets nameDisplayed set to true
        // if 1: center (skewed top) taskGrid gets nameDisplayed set to true
        // if 2: last taskGrid gets nameDisplayed set to true
        nameDisplayedPos30m = 0;
        if (taskNameStyle === "0") {
          nameDisplayedPos30m = 0;
        } else if (taskNameStyle === "1") {
          nameDisplayedPos30m = Math.floor((taskDuration30m - 1) / 2);
        } else {
          nameDisplayedPos30m = taskDuration30m - 1;
        }
        for (u = 0; u < taskDuration30m; u++) {
          displayArray30m.push(
            <TaskGrid
              taskName={taskNameToAdd}
              color={taskColorToAdd}
              nameDisplayed={u === nameDisplayedPos30m}
              isComplete={taskCompleteToAdd}
            />
          );
        }

        // finally, update i using taskEnd
        j += taskDuration30m - 1;
      } else {
        // there isn't a task starting at hour i, add a default HourGrid with hour being i.
        // console.log("no tasks found for current dayGrid at hour" + i);
        displayArray30m.push(
          <Box>
            <HourGrid hourGridId={j} dayGridDate={gridDate} />
          </Box>
        );
      }
    }
  }

  return (
    <div>
      {intervalStyle === "0" ? (
        <Box>
          <DayHeader
            dayGridId={dayGridId}
            dayGridDate={gridDate}
            dayGridDay={gridDay}
            dateStyle={dateStyle}
          />
          {/* </Grid> */}
          {displayArray1h}
        </Box>
      ) : (
        <Box>
          <DayHeader
            dayGridId={dayGridId}
            dayGridDate={gridDate}
            dayGridDay={gridDay}
            dateStyle={dateStyle}
          />
          {/* </Grid> */}
          {displayArray30m}
        </Box>
      )}
    </div>
  );
}

export default DayGrid;
