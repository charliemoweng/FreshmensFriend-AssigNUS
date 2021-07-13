import React, { useState } from "react";
import BaseCalendar from "../BaseCalendar/BaseCalendar";
import styles from "./Calendar.module.css";
import { Paper } from "@material-ui/core";
import CalendarToolbar from "../CalendarToolbar/CalendarToolbar";

function Calendar(props) {
  //console.log("calendar called");
  const { tasks } = props;
  const [dateStyle, setDateStyle] = useState(0);
  const [timeStyle, setTimeStyle] = useState(0);
  const [modeStyle, setModeStyle] = useState(0);

  return (
    <div className={styles.BoxCalendar}>
      <Paper elevation={3}>
        <div className={styles.Calendar}>
          <h2>Calendar</h2>
          <CalendarToolbar
            dateStyle={dateStyle}
            setDateStyle={setDateStyle}
            timeStyle={timeStyle}
            setTimeStyle={setTimeStyle}
            modeStyle={modeStyle}
            setModeStyle={setModeStyle}
          />
          <BaseCalendar />
        </div>
      </Paper>
    </div>
  );
}

export default Calendar;
