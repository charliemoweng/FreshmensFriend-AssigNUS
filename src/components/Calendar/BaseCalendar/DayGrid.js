import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DayHeader from "./DayHeader";
import HourGrid from "./HourGrid";
import styles from "./DayGrid.module.css";

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
    setModules
  } = props;
  return (
    <Grid className={styles.dayGrid}>
      <DayHeader
        dayGridId={dayGridId}
        dayGridDate={gridDate}
        dayGridDay={gridDay}
      />
      <HourGrid hourGridId="0" dayGridDate={gridDate} />
      <HourGrid hourGridId="1" dayGridDate={gridDate} />
      <HourGrid hourGridId="2" dayGridDate={gridDate} />
      <HourGrid hourGridId="3" dayGridDate={gridDate} />
      <HourGrid hourGridId="4" dayGridDate={gridDate} />
      <HourGrid hourGridId="5" dayGridDate={gridDate} />
      <HourGrid hourGridId="6" dayGridDate={gridDate} />
      <HourGrid hourGridId="7" dayGridDate={gridDate} />
      <HourGrid hourGridId="8" dayGridDate={gridDate} />
      <HourGrid hourGridId="9" dayGridDate={gridDate} />
      <HourGrid hourGridId="10" dayGridDate={gridDate} />
      <HourGrid hourGridId="11" dayGridDate={gridDate} />
      <HourGrid hourGridId="12" dayGridDate={gridDate} />
      <HourGrid hourGridId="13" dayGridDate={gridDate} />
      <HourGrid hourGridId="14" dayGridDate={gridDate} />
      <HourGrid hourGridId="15" dayGridDate={gridDate} />
      <HourGrid hourGridId="16" dayGridDate={gridDate} />
      <HourGrid hourGridId="17" dayGridDate={gridDate} />
      <HourGrid hourGridId="18" dayGridDate={gridDate} />
      <HourGrid hourGridId="19" dayGridDate={gridDate} />
      <HourGrid hourGridId="20" dayGridDate={gridDate} />
      <HourGrid hourGridId="21" dayGridDate={gridDate} />
      <HourGrid hourGridId="22" dayGridDate={gridDate} />
      <HourGrid hourGridId="23" dayGridDate={gridDate} />
    </Grid>
  );
}

export default DayGrid;
