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
  const {
    dayGridId,
    gridDate,
    gridDay,
    tasks,
    setTasks,
    modules,
    setModules,
    timeStyle,
    intervalStyle
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

  const timeArray12HRS1h = [
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
  const timeArray24HRS1h = [
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
  const timeArray12HRS30m = [
    "12 AM",
    "12.30 AM",
    "1 AM",
    "1.30 AM",
    "2 AM",
    "2.30 AM",
    "3 AM",
    "3.30 AM",
    "4 AM",
    "4.30 AM",
    "5 AM",
    "5.30 AM",
    "6 AM",
    "6.30 AM",
    "7 AM",
    "7.30 AM",
    "8 AM",
    "8.30 AM",
    "9 AM",
    "9.30 AM",
    "10 AM",
    "10.30 AM",
    "11 AM",
    "11.30 AM",
    "12 PM",
    "12.30 PM",
    "1 PM",
    "1.30 PM",
    "2 PM",
    "2.30 PM",
    "3 PM",
    "3.30 PM",
    "4 PM",
    "4.30 PM",
    "5 PM",
    "5.30 PM",
    "6 PM",
    "6.30 PM",
    "7 PM",
    "7.30 PM",
    "8 PM",
    "8.30 PM",
    "9 PM",
    "9.30 PM",
    "10 PM",
    "10.30 PM",
    "11 PM",
    "11.30 PM"
  ];
  const timeArray24HRS30m = [
    "0000",
    "0030",
    "0100",
    "0130",
    "0200",
    "0230",
    "0300",
    "0330",
    "0400",
    "0430",
    "0500",
    "0530",
    "0600",
    "0630",
    "0700",
    "0730",
    "0800",
    "0830",
    "0900",
    "0930",
    "1000",
    "1030",
    "1100",
    "1130",
    "1200",
    "1230",
    "1300",
    "1330",
    "1400",
    "1430",
    "1500",
    "1530",
    "1600",
    "1630",
    "1700",
    "1730",
    "1800",
    "1830",
    "1900",
    "1930",
    "2000",
    "2030",
    "2100",
    "2130",
    "2200",
    "2230",
    "2300",
    "2330"
  ];
  const timeColArray1h = [];
  for (var i = 0; i < 24; i++) {
    timeColArray1h.push(
      <Box border={1} borderColor="grey.100">
        {timeStyle === "0" ? timeArray12HRS1h[i] : timeArray24HRS1h[i]}
      </Box>
    );
  }

  const timeColArray30m = [];
  for (var j = 0; j < 48; j++) {
    timeColArray30m.push(
      <Box border={1} borderColor="grey.100">
        {timeStyle === "0" ? timeArray12HRS30m[j] : timeArray24HRS30m[j]}
      </Box>
    );
  }

  return (
    <div>
      {intervalStyle === "0" ? (
        <div>
          <Box border={1} borderColor="grey.100">
            {timeStyle === "0" ? <div>12HRS</div> : <div>24HRS</div>}
          </Box>
          {timeColArray1h}
        </div>
      ) : (
        <div>
          <Box border={1} borderColor="grey.100">
            {timeStyle === "0" ? <div>12HRS</div> : <div>24HRS</div>}
          </Box>
          {timeColArray30m}
        </div>
      )}
    </div>
  );
}

export default CalendarTimeCol;
