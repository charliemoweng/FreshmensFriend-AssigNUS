import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./HourGrid.module.css";
import { borders } from "@material-ui/system";
import { grey, white } from "@material-ui/core/colors";

function HourGrid(props) {
  const {
    hourGridId,
    dayGridDate,
    tasks,
    setTasks,
    taskGrids,
    setTaskGrids,
    modules,
    setModules,
    gridStart,
    setGridStart,
    gridEnd,
    setGridEnd
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

  // check tasks array for any tasks that is at current hour slot
  // local copy

  return (
    <Box border={1} borderColor="grey.300">
      &nbsp;
    </Box>
  );
}

export default HourGrid;
