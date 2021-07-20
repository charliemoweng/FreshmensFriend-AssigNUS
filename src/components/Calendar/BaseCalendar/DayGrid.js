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
    setModules,
    dateStyle
  } = props;

  return (
    <Grid
      className={styles.dayGrid}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
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
      <Grid
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
      </Grid>
    </Grid>
  );
}

export default DayGrid;
