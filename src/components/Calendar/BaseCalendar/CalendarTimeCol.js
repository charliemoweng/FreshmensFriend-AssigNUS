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
    setModules
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));

  return (
    <Grid
      className={styles.dayGridTime}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>12AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>1AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>2AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>3AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>4AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>5AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>6AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>7AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>8AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>9AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>10AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>11AM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>12PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>1PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>2PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>3PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>4PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>5PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>6PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>7PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>8PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>9PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>10PM</Paper>
      </Grid>
      <Grid alignItems="stretch">
        <Paper className={useStyles.paper}>11PM</Paper>
      </Grid>
    </Grid>
  );
}

export default CalendarTimeCol;
