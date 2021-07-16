import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

function DayHeader(props) {
  const {
    dayGridId,
    dayGridDate,
    dayGridDay,
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
    <div>
      <Grid>
        <Paper className={useStyles.paper}>
          DayGrid No. {dayGridId} {dayGridDay}
        </Paper>
      </Grid>
    </div>
  );
}

export default DayHeader;
