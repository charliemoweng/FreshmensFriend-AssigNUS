import React from "react";
import styles from "./Calendar.module.css";
import { Paper } from "@material-ui/core";

function Calendar(props) {
  const { tasks } = props;

  return (
    <div className={styles.Box}>
      <Paper elevation={3}>
        <div className={styles.Calendar}>
          <h2>Calendar</h2>
          <div className={styles.MockCalendar}>
            <img src="/images/mock_calendar.jpg" alt="" />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Calendar;
