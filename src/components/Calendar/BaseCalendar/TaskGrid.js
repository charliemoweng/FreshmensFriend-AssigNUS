import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";

function TaskGrid(props) {
  // fields: start time, end time, color (passed in from CalendarGrid)

  const { taskName, startTime, endTime, color, isDisplayed } = props;
  return (
    <Box height="300" bgcolor={color}>
      {taskName}
    </Box>
  );
}

export default TaskGrid;
