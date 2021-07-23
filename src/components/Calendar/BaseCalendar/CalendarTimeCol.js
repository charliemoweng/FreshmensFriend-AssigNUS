import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DayHeader from "./DayHeader";
import HourGrid from "./HourGrid";
import styles from "./DayGrid.module.css";
import { AccountBoxRounded } from "@material-ui/icons";
import { borders } from "@material-ui/system";
import { grey, white } from "@material-ui/core/colors";

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

  const timeArray12HRS = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM"
  ];
  const timeArray24HRS = [
    "0000",
    "0100",
    "0200",
    "0300",
    "0400",
    "0500",
    "0600",
    "0700",
    "0800",
    "0900",
    "1000",
    "1100",
    "1200",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
    "2100",
    "2200",
    "2300"
  ];
  const timeColArray = [];
  for (var i = 0; i < 24; i++) {
    timeColArray.push(
      <Box border={1} borderColor="grey.100">
        {timeStyle === 0 ? timeArray12HRS[i] : timeArray24HRS[i]}
      </Box>
    );
  }

  return (
    <div>
      <Box border={1} borderColor="grey.100">
        {timeStyle === 0 ? <div>12HRS</div> : <div>24HRS</div>}
      </Box>
      {timeColArray}
    </div>
  );
}

export default CalendarTimeCol;

/* <Grid
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
    </Grid> */
