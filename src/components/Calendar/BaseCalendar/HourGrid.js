import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import styles from "./HourGrid.module.css";

function HourGrid(props) {
  const {
    hourGridId,
    dayGridDate,
    tasks,
    setTasks,
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

  // const [gridStart, setGridStart] = useState("");
  // const [gridEnd, setGridEnd] = useState("");

  return (
    <Grid>
      <Paper className={useStyles.paper}>HG {hourGridId}</Paper>
    </Grid>
  );
}

export default HourGrid;
