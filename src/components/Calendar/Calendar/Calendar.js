import React, { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import BaseCalendar from "../BaseCalendar/BaseCalendar";
import styles from "./Calendar.module.css";
import { Paper } from "@material-ui/core";
import CalendarToolbar from "../CalendarToolbar/CalendarToolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function Calendar(props) {
  //console.log("calendar called");
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
    setIsDisplayed
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // datestyle 0: display both date and day (i.e. 20 Jul Tue)
  // datestyle 1: display only date (i.e. 20 Jul)
  const [dateStyle, setDateStyle] = useStateWithCallbackLazy("0");

  // timestyle 0: display time in 12hrs format (i.e. 5AM)
  // timstyle 1: display time in 24hrs format (i.e. 0500)
  const [timeStyle, setTimeStyle] = useStateWithCallbackLazy("0");

  // modeStyle 0: display calendarStart as current day
  // modeStyle 1: display calendarStart as Sunday of current week
  // modeStyle 2: display calendarStart as Monday of current week
  const [modeStyle, setModeStyle] = useStateWithCallbackLazy("0");

  // taskNameStyle 0: display taskName at the top of the taskGrid
  // taskNameStyle 1: display taskName at the center of the taskGrid (top skew if tied)
  // taskNameStyle 2: display taskName at the bottom of the taskGrid
  const [taskNameStyle, setTaskNameStyle] = useStateWithCallbackLazy("0");

  // intervalStyle 0: 1 hours intervals
  // intervalStyle 1: half hour intervals
  const [intervalStyle, setIntervalStyle] = useStateWithCallbackLazy("0");

  return (
    <div className={styles.BoxCalendar}>
      <Paper elevation={3}>
        <div className={styles.Calendar}>
          <h2>Calendar</h2>

          <CalendarToolbar
            calendarStart={calendarStart}
            setCalendarStart={setCalendarStart}
            dateStyle={dateStyle}
            setDateStyle={setDateStyle}
            timeStyle={timeStyle}
            setTimeStyle={setTimeStyle}
            modeStyle={modeStyle}
            setModeStyle={setModeStyle}
            taskNameStyle={taskNameStyle}
            setTaskNameStyle={setTaskNameStyle}
            intervalStyle={intervalStyle}
            setIntervalStyle={setIntervalStyle}
          />
          <BaseCalendar
            calendarStart={calendarStart}
            setCalendarStart={setCalendarStart}
            tasks={tasks}
            setTasks={setTasks}
            modules={modules}
            setModules={setModules}
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
            dateStyle={dateStyle}
            timeStyle={timeStyle}
            modeStyle={modeStyle}
            taskNameStyle={taskNameStyle}
            intervalStyle={intervalStyle}
          />
        </div>
      </Paper>
    </div>
  );
}

export default Calendar;
