import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import DateFnsUtils from "@date-io/date-fns";
import { format, addDays, subDays, getDay } from "date-fns";

import { purple, lightBlue, blue, indigo, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

const toolbarTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600],
      contrastText: "#fff"
    },
    secondary: {
      main: red[500]
    }
  }
});

function CalendarToolbar(props) {
  const classes = useStyles();
  const {
    calendarStart,
    setCalendarStart,
    dateStyle,
    setDateStyle,
    timeStyle,
    setTimeStyle,
    modeStyle,
    setModeStyle,
    taskNameStyle,
    setTaskNameStyle
  } = props;

  // modify calendarStart based on value of modeStyle => modeStyle handled in toolbar instead of CalendarGrid
  // 0: no change
  // 1: set to this week's Sunday
  // 2: set to this week's Monday
  const calendarStartDayInWeek = getDay(calendarStart);

  if (modeStyle === 0 && calendarStartDayInWeek !== getDay(new Date())) {
    setCalendarStart(new Date());
  } else if (modeStyle === 1 && calendarStartDayInWeek !== 0) {
    setCalendarStart(subDays(calendarStart, calendarStartDayInWeek));
  } else if (modeStyle === 2 && calendarStartDayInWeek !== 1) {
    if (calendarStartDayInWeek === 0) {
      setCalendarStart(addDays(calendarStart, 1));
    } else {
      setCalendarStart(subDays(calendarStart, calendarStartDayInWeek - 1));
    }
  }

  // console.log("calendarStart is: " + calendarStart);
  const calendarEnd = addDays(calendarStart, 6);
  // useEffect(() => {}, [calendarStart]);

  // console.log("calendarStart: " + calendarStart);

  const displayStartDate = format(calendarStart, "d").concat(
    " " + format(calendarStart, "MMM")
  );
  const displayEndDate = format(calendarEnd, "d").concat(
    " " + format(calendarEnd, "MMM")
  );
  const calendarDisplayRange = displayStartDate.concat(" - " + displayEndDate);
  const calendarMonthYearDisplay = format(calendarStart, "MMMM").concat(
    " " + format(calendarStart, "yyyy")
  );

  // handlers for clicking the change week buttons
  const handleClickPrevWeek = () => {
    setCalendarStart(subDays(calendarStart, 7), () => {
      handleClickPrevWeekCallBack();
    });
  };
  const handleClickPrevWeekCallBack = () => {};

  const handleClickNextWeek = () => {
    setCalendarStart(addDays(calendarStart, 7), () => {
      handleClickNextWeekCallBack();
    });
  };
  const handleClickNextWeekCallBack = () => {};

  // handler for clicking the date button
  // console.log("dateStyle is: " + dateStyle);
  const handleClickDate = () => {
    // handles the clicking of date button to display / hide the dates
    // console.log("Date button has been clicked");
    if (dateStyle === 0) {
      setDateStyle(1, () => {
        handleClickDateCallback();
      });
    } else {
      setDateStyle(0, () => {
        handleClickDateCallback();
      });
    }
  };
  const handleClickDateCallback = () => {};

  // handler for clicking the time button
  // console.log("timeStyle is: " + timeStyle);
  const handleClickTime = () => {
    // handles the clicking of time button to change display between 12hr and 24hr time
    // console.log("Time button has been clicked");
    if (timeStyle === 0) {
      setTimeStyle(1, () => {
        handleClickTimeCallback();
      });
    } else {
      setTimeStyle(0, () => {
        handleClickTimeCallback();
      });
    }
  };
  const handleClickTimeCallback = () => {};

  // handler for clicking the mode button
  // console.log("modeStyle is: " + modeStyle);
  const handleClickMode = () => {
    // console.log("Mode button has been clicked");
    if (modeStyle === 0) {
      setModeStyle(1, () => {
        handleClickModeCallback();
      });
    } else if (modeStyle === 1) {
      setModeStyle(2, () => {
        handleClickModeCallback();
      });
    } else {
      setModeStyle(0, () => {
        handleClickModeCallback();
      });
    }
  };
  const handleClickModeCallback = () => {};

  // handler for clicking the taskName button
  // console.log("taskNameStyle is: " + taskNameStyle);
  const handleClickTaskName = () => {
    // console.log("TaskName button has been clicked");
    if (taskNameStyle === 0) {
      setTaskNameStyle(1, () => {
        handleClickTaskNameCallback();
      });
    } else if (taskNameStyle === 1) {
      setTaskNameStyle(2, () => {
        handleClickTaskNameCallback();
      });
    } else {
      setTaskNameStyle(0, () => {
        handleClickTaskNameCallback();
      });
    }
  };
  const handleClickTaskNameCallback = () => {};

  return (
    <div className={classes.root}>
      <ThemeProvider theme={toolbarTheme}>
        <AppBar position="static" color={toolbarTheme.primary}>
          <Toolbar>
            {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
            <IconButton
              edge="start"
              className={classes.leftButton}
              onClick={handleClickPrevWeek}
              color="inherit"
              aria-label="left"
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6">{calendarDisplayRange}</Typography>
            <IconButton
              edge="start"
              className={classes.rightButton}
              onClick={handleClickNextWeek}
              color="inherit"
              aria-label="right"
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {calendarMonthYearDisplay}
            </Typography>
            <div className={classes.buttons}>
              {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <b>To-do</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.TaskTables}>
            <Typography>
              <TaskListToDo tasks={tasks} setTasks={setTasks} />
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion> */}

              <Button onClick={handleClickDate} color="inherit">
                {dateStyle === 0 ? <div>Date+Day</div> : <div>Date</div>}
              </Button>
              <Button onClick={handleClickTime} color="inherit">
                {timeStyle === 0 ? <div>12hrs</div> : <div>24hrs</div>}
              </Button>
              <Button onClick={handleClickMode} color="inherit">
                {modeStyle === 0 ? (
                  <div> Today</div>
                ) : modeStyle === 1 ? (
                  <div> Sun</div>
                ) : (
                  <div> Mon</div>
                )}
              </Button>
              <Button onClick={handleClickTaskName} color="inherit">
                {taskNameStyle === 0 ? (
                  <div> Top</div>
                ) : taskNameStyle === 1 ? (
                  <div> Center</div>
                ) : (
                  <div> Bottom</div>
                )}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default CalendarToolbar;
