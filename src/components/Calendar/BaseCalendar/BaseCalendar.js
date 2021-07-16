import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CalendarGrid from "./CalendarGrid";
import styles from "./BaseCalendar.module.css";

function BaseCalendar(props) {
  const { tasks, setTasks, modules, setModules } = props;

  return (
    <div className={styles.baseCalendar}>
      <CalendarGrid
        tasks={tasks}
        setTasks={setTasks}
        modules={modules}
        setModules={setModules}
        alignItems="stretch"
      />
    </div>
  );
}

export default BaseCalendar;
