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
    dateStyle
  } = props;

  // logic for checking tasks happening at this date to be done here
  // local copy of tasks array
  const currTasks = [...tasks];
  const todayTasks = currTasks.filter(
    (element) =>
      format(new Date(element.taskStart), "P") ===
      format(new Date(gridDate), "P")
  );

  console.log(
    "todayTasks for DG" + dayGridId + " is: " + JSON.stringify(todayTasks)
  );

  // dafult time array contains all integers from 0 to 23, represeting the hours in the day
  const displayArray = [];
  for (var i = 0; i < 24; i++) {
    // first check if todayTasks has a task that starts at hour i
    const iStringified = JSON.stringify(i);
    if (
      todayTasks.find(
        (element) => format(new Date(element.taskStart), "H") === iStringified
      )
    ) {
      console.log("task found for current DayGrid");
      // get taskName and color of element from taskToAdd
      const taskNameToAdd = todayTasks.find(
        (element) => format(new Date(element.taskStart), "H") === iStringified
      ).taskName;
      const taskColorToAdd = modules.find(
        (module) =>
          module.modName ===
          todayTasks.find(
            (element) =>
              format(new Date(element.taskStart), "H") === iStringified
          ).taskMod
      ).modColor;

      // update i using taskEnd
      const endOfTaskAdded = todayTasks.find(
        (element) => format(new Date(element.taskStart), "H") === iStringified
      ).taskEnd;
      i = format(new Date(endOfTaskAdded), "H");

      const taskDuration =
        format(
          new Date(
            todayTasks.find(
              (element) =>
                format(new Date(element.taskStart), "H") === iStringified
            ).taskEnd
          ),
          "H"
        ) -
        format(
          new Date(
            todayTasks.find(
              (element) =>
                format(new Date(element.taskStart), "H") === iStringified
            ).taskStart
          ),
          "H"
        );

      console.log("taskDuration is: " + taskDuration);

      // there is a task starting at hour i, create taskGrid here and update i to be taskEnd
      displayArray.push(
        <Box>
          <TaskGrid
            //class={"grid-xs-10"}
            taskName={taskNameToAdd}
            color={taskColorToAdd}
          />
        </Box>
      );
    } else {
      // there isn't a task starting at hour i, add a default HourGrid with hour being i.
      // console.log("no tasks found for current dayGrid at hour" + i);
      displayArray.push(
        <Box>
          <HourGrid hourGridId={i} dayGridDate={gridDate} />
        </Box>
      );
    }
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <DayHeader
          dayGridId={dayGridId}
          dayGridDate={gridDate}
          dayGridDay={gridDay}
          dateStyle={dateStyle}
        />
      </Grid>
      {displayArray}
    </div>
  );
}

export default DayGrid;

/* <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="0" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="1" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="2" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="3" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="4" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="5" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="6" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="7" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="8" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="9" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="10" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="11" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="12" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="13" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="14" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="15" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="16" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="17" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="18" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="19" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="20" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="21" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="22" dayGridDate={gridDate} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <HourGrid hourGridId="23" dayGridDate={gridDate} />
      </Grid> */
