import React from "react";
import BaseCalendar from "../BaseCalendar/BaseCalendar";
import styles from "./Calendar.module.css";
import { Paper } from "@material-ui/core";
import CalendarToolbar from "../CalendarToolbar/CalendarToolbar";

function Calendar(props) {
  const { tasks } = props;

  return (
    <div className={styles.BoxCalendar}>
      <Paper elevation={3}>
        <div className={styles.Calendar}>
          <h2>Calendar</h2>
          <CalendarToolbar />
          <BaseCalendar />
        </div>
      </Paper>
    </div>
  );
}

export default Calendar;
