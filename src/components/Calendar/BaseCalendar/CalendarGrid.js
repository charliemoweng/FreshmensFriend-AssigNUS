import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { addDays, getDay } from "date-fns";
import { DateFnsUtils } from "@date-io/date-fns";
import CalendarTimeCol from "./CalendarTimeCol";
import DayGrid from "./DayGrid";
import TaskGrid from "./TaskGrid";
import styles from "./CalendarGrid.module.css";
import { sizing, height } from "@material-ui/system";
import { ka } from "date-fns/locale";

function CalendarGrid(props) {
  const {
    calendarStart,
    setCalendarStart,
    tasks,
    setTasks,
    modules,
    setModules,
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
    dateStyle,
    timeStyle,
    modeStyle,
    taskNameStyle,
    intervalStyle
  } = props;

  useEffect(() => {}, [calendarStart]);
  // fields: start date, end date
  // contains DayGrid
  // check for all tasks, if task start time within its start date & end date, create TaskGrid for this task

  // this is for the CalendarStart CalendarEnd display dates
  // const [startDate, setStartDate] = useState(calendarStart);
  // const [endDate, setEndDate] = useState(
  //   new Date(new Date().setDate(new Date().getDate() + 6))
  // );
  // console.log(startDate);
  // console.log(endDay);

  // date and day setter for DayGrids (date: 1/1/2021, day: "Monday")
  // the 'header' of the dayGrid to be displayed (DG 0 Sun)
  // this is passed into dayGrid
  const [dayGridDate, setDayGridDate] = useState("default DayGrid Date");
  const [dayGridDay, setDayGridDay] = useState("default DayGrid Day");

  // handling date displays in the header
  const dateArray = [calendarStart];
  for (var i = 1; i < 7; i++) {
    dateArray.push(addDays(calendarStart, i));
  }

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

  var numberedStartDay = getDay(calendarStart);
  const numberedDayArray = [];
  for (var j = numberedStartDay; j < numberedStartDay + 7; j++) {
    numberedDayArray.push(j % 7);
  }

  const dayArray = [];
  numberedDayArray.forEach((element) => {
    dayArray.push(dayArrayShort[element]);
  });

  // // filter out all tasks that are in the current week and make them a new array
  // function generateTasksDisplayed(tasks, calendarStart, endDay) {
  //   //var tasksDisplayed = [];
  //   return tasks.filter(
  //     (task) => task.startTime > calendarStart && task.endTime < endDay
  //   );
  // }

  useEffect(() => {}, [tasks]);

  // handles adding of days into the display array
  var displayArray = [];
  // time col added
  displayArray.push(
    <Grid className={styles.dayGridChildTime}>
      <CalendarTimeCol timeStyle={timeStyle} intervalStyle={intervalStyle} />
    </Grid>
  );

  // for loop to add 7 days
  for (var k = 0; k < 7; k++) {
    const kStringified = k.toString();
    displayArray.push(
      <Grid className={styles.dayGridChild}>
        <DayGrid
          dayGridId={kStringified}
          tasks={tasks}
          modules={modules}
          gridDate={dateArray[k]}
          gridDay={dayArray[k]}
          dateStyle={dateStyle}
          taskNameStyle={taskNameStyle}
          intervalStyle={intervalStyle}
        />
      </Grid>
    );
  }

  return (
    <Grid
      className={styles.dayGridParent}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
    >
      {displayArray}
    </Grid>
  );
}

export default CalendarGrid;
