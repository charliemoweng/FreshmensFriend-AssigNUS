import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import CalendarTimeCol from "./CalendarTimeCol";
import DayGrid from "./DayGrid";
import TaskGrid from "./TaskGrid";
import styles from "./CalendarGrid.module.css";

function CalendarGrid(props) {
  const { tasks, setTasks, modules, setModules } = props;
  // fields: start date, end date
  // contains DayGrid
  // check for all tasks, if task start time within its start date & end date, create TaskGrid for this task
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date(new Date().setDate(new Date().getDate() + 6)));
  console.log(startDay);
  console.log(endDay);

  // date and day setter for DayGrids (date: 1/1/2021, day: "Monday")
  const [dayGridDate, setDayGridDate] = useState("default DayGrid Date");
  const [dayGridDay, setDayGridDay] = useState("default DayGrid Day");

  // handling choice of default start day of the week (i.e. sunday, monday, etc)
  const dayArrayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayArrayLong = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  // default dayArray used is dayArrayShort, toggling changes will change it
  const dayArray = dayArrayShort;

  // filter out all tasks that are in the current week and make them a new array
  function generateTasksDisplayed(tasks, startDay, endDay) {
    //var tasksDisplayed = [];
    return tasks.filter(
      (task) => task.startTime > startDay && task.endTime < endDay
    );
  }

  return (
    <div className={styles.calendarGrid}>
      CalendarGrid
      <Grid
        className={styles.dayGridParent}
        container
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
      >
        <CalendarTimeCol className={styles.dayGridChild} />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="0"
          gridDate={startDay}
          gridDay={dayArray[0]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="1"
          gridDate={startDay}
          gridDay={dayArray[1]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="2"
          gridDate={startDay}
          gridDay={dayArray[2]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="3"
          gridDate={startDay}
          gridDay={dayArray[3]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="4"
          gridDate={startDay}
          gridDay={dayArray[4]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="5"
          gridDate={startDay}
          gridDay={dayArray[5]}
        />
        <DayGrid
          className={styles.dayGridChild}
          dayGridId="6"
          gridDate={startDay}
          gridDay={dayArray[6]}
        />
      </Grid>
    </div>
  );
}

export default CalendarGrid;
