import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DayHeader from "./DayHeader";
import HourGrid from "./HourGrid";
import styles from "./DayGrid.module.css";

function CalendarTimeCol(props) {
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
    timeStyle
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));

  return (
    <Grid
      className={styles.dayGridTime}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>12HRS</div> : <div>24HRS</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>12 AM</div> : <div>0000</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>1 AM</div> : <div>0100</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>2 AM</div> : <div>0200</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>3 AM</div> : <div>0300</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>4 AM</div> : <div>0400</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>5 AM</div> : <div>0500</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>6 AM</div> : <div>0600</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>7 AM</div> : <div>0700</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>8 AM</div> : <div>0800</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>9 AM</div> : <div>0900</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>10 AM</div> : <div>1000</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>11 AM</div> : <div>1100</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>12 PM</div> : <div>1200</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>1 PM</div> : <div>1300</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>2 PM</div> : <div>1400</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>3 PM</div> : <div>1500</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>4 PM</div> : <div>1600</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>5 PM</div> : <div>1700</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>6 PM</div> : <div>1800</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>7 PM</div> : <div>1900</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>8 PM</div> : <div>2000</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>9 PM</div> : <div>2100</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>10 PM</div> : <div>2200</div>}
        </Paper>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Paper className={useStyles.paper}>
          {timeStyle === 0 ? <div>11 PM</div> : <div>2300</div>}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CalendarTimeCol;
