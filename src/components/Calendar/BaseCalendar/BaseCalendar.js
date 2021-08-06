import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CalendarGrid from "./CalendarGrid";
import styles from "./BaseCalendar.module.css";

function BaseCalendar(props) {
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

  return (
    <div className={styles.baseCalendar}>
      <CalendarGrid
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
        alignItems="stretch"
      />
    </div>
  );
}

export default BaseCalendar;
