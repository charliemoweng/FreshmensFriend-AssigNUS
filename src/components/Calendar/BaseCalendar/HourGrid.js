import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

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
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));

  // const [gridStart, setGridStart] = useState("");
  // const [gridEnd, setGridEnd] = useState("");

  return (
    <Grid>
      HourGrid No. {hourGridId}
      <Paper className={useStyles.paper}>.</Paper>
    </Grid>
  );
}

export default HourGrid;
