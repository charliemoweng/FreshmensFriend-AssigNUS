import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import grey from "@material-ui/core/colors/grey";

function TaskGrid(props) {
  // fields: start time, end time, color (passed in from CalendarGrid)

  const {
    taskName,
    startTime,
    endTime,
    color,
    nameDisplayed,
    isComplete
  } = props;

  const completedColor = grey[600];

  var taskColor = color;
  if (isComplete) {
    taskColor = completedColor;
  }

  return (
    <Box height="3000" bgcolor={taskColor} border={1} borderColor={taskColor}>
      {nameDisplayed ? taskName : <div>&nbsp;</div>}
    </Box>
  );
}

export default TaskGrid;
