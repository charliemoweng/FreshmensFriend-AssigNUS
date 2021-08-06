import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { format, isToday } from "date-fns";
import {
  purple,
  lightBlue,
  blue,
  indigo,
  red,
  green
} from "@material-ui/core/colors";
import { red200 } from "material-ui/styles/colors";

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
    setGridEnd,
    dateStyle
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    paperToday: {
      textAlign: "center",
      backgroundColor: red[200]
    }
  }));

  // const [gridStart, setGridStart] = useState("");
  // const [gridEnd, setGridEnd] = useState("");

  const d = format(dayGridDate, "d");
  const MMM = format(dayGridDate, "MMM");
  const displayDate = d.concat(" " + MMM);
  const classes = useStyles();

  return (
    <div>
      {isToday(dayGridDate) ? (
        <Paper className={classes.paperToday}>
          {dateStyle === "0" ? (
            <div>
              {displayDate} {dayGridDay}
            </div>
          ) : (
            <div>{displayDate}</div>
          )}
          {/* {displayDate} {dayGridDay} */}
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          {dateStyle === "0" ? (
            <div>
              {displayDate} {dayGridDay}
            </div>
          ) : (
            <div>{displayDate}</div>
          )}
          {/* {displayDate} {dayGridDay} */}
        </Paper>
      )}
    </div>
  );
}

export default DayHeader;
