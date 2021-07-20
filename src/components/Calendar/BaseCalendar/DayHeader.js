import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

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
    }
  }));

  // const [gridStart, setGridStart] = useState("");
  // const [gridEnd, setGridEnd] = useState("");

  const d = format(dayGridDate, "d");
  const MMM = format(dayGridDate, "MMM");
  const displayDate = d.concat(" " + MMM);

  return (
    <div>
      <Grid>
        <Paper className={useStyles.paper}>
          {dateStyle === 0 ? (
            <div>
              {displayDate} {dayGridDay}
            </div>
          ) : (
            <div>{displayDate}</div>
          )}
          {/* {displayDate} {dayGridDay} */}
        </Paper>
      </Grid>
    </div>
  );
}

export default DayHeader;
