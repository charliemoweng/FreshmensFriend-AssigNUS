import React, { useState, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import SettingsIcon from "@material-ui/icons/Settings";
import DateFnsUtils from "@date-io/date-fns";
import { format, addDays, subDays, getDay } from "date-fns";
import {
  purple,
  lightBlue,
  blue,
  indigo,
  red,
  green
} from "@material-ui/core/colors";
import CustomSettingsGroup from "./CustomSettingsGroup";
import ExampleSettingsGroup from "./ExampleSettingsGroup";
import Tooltip from "@material-ui/core/Tooltip";

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
    setTaskNameStyle,
    intervalStyle,
    setIntervalStyle
  } = props;
  const [anchorEl, setAnchorEl] = useState();
  const [checked, setChecked] = useState(false);

  useEffect(() => {}, [dateStyle]);

  // hooks used for handling setting changes
  const [test, setTest] = useState("0");

  // modify calendarStart based on value of modeStyle => modeStyle handled in toolbar instead of CalendarGrid
  // 0: no change
  // 1: set to this week's Sunday
  // 2: set to this week's Monday
  const calendarStartDayInWeek = getDay(calendarStart);

  if (modeStyle === "0" && calendarStartDayInWeek !== getDay(new Date())) {
    setCalendarStart(new Date());
  } else if (modeStyle === "1" && calendarStartDayInWeek !== 0) {
    setCalendarStart(subDays(calendarStart, calendarStartDayInWeek));
  } else if (modeStyle === "2" && calendarStartDayInWeek !== 1) {
    if (calendarStartDayInWeek === "0") {
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

  // handling opening settings
  const handleClickCalendarSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendarSettings = () => {
    setAnchorEl(null);
  };

  // handling checking of options
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

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

  const handleToggleToday = () => {
    setCalendarStart(new Date());
  };

  // function ExampleSettingsGroup() {
  //   const [valueEx, setValueEx] = useState("female");
  //   const handleChangeEx = (event) => {
  //     setValueEx(event.target.value);
  //     console.log("event.target.value for valueEx is: " + event.target.value);

  //     console.log("valueEx is: " + valueEx);
  //   };
  //   // useEffect(() => {
  //   //   console.log("hook value is: " + valueEx);
  //   // }, [valueEx]);
  //   return (
  //     <FormControl component="fieldset">
  //       <FormLabel component="legend">Gender</FormLabel>
  //       <RadioGroup
  //         row
  //         aria-label="gender"
  //         name="gender1"
  //         value={valueEx}
  //         onChange={handleChangeEx}
  //       >
  //         <FormControlLabel value="female" control={<Radio />} label="Female" />
  //         <FormControlLabel value="male" control={<Radio />} label="Male" />
  //         <FormControlLabel value="other" control={<Radio />} label="Other" />
  //         <FormControlLabel
  //           value="disabled"
  //           disabled
  //           control={<Radio />}
  //           label="(Disabled option)"
  //         />
  //       </RadioGroup>
  //     </FormControl>
  //   );
  // }

  // function CustomSettingsGroup(props) {
  //   // Name, Number of settings (an integer), names of options (an array of strings), setter of hook
  //   const {
  //     settingName,
  //     settingNumber,
  //     settingOptions,
  //     settingValue,
  //     setSettingValue
  //   } = props;

  //   // useState hooks here? for storing local and changing value of setting
  //   const [local, setLocal] = useState(settingValue);

  //   // does smth only when local changes
  //   useEffect(() => {
  //     console.log("local is: " + local);
  //   }, [local]);

  //   // const handleSetTestCallback = () => {};

  //   // suspected that handleChange is unable to access individual FormControl components withint the radioArray
  //   const handleChange = (event) => {
  //     setLocal(event.target.value);
  //   };

  //   var radioArray = [];

  //   for (var i = 0; i < settingNumber; i++) {
  //     var iStringified = i.toString();
  //     radioArray.push(
  //       <FormControlLabel
  //         value={iStringified}
  //         control={<Radio />}
  //         label={settingOptions[i]}
  //       />
  //     );
  //   }

  //   return (
  //     <FormControl component="fieldset">
  //       <FormLabel component="legend">{settingName}</FormLabel>
  //       <RadioGroup
  //         row
  //         aria-label={settingName}
  //         name={settingName}
  //         value={local}
  //         onChange={handleChange}
  //       >
  //         {radioArray}
  //       </RadioGroup>
  //     </FormControl>
  //   );
  // }

  // helper function to turn an integer to a day of the week, to be used for Calendar Start
  function toDayOfWeek(int) {
    if (int === 0) {
      return "Sunday";
    }
    if (int === 1) {
      return "Monday";
    }
    if (int === 2) {
      return "Tuesday";
    }
    if (int === 3) {
      return "Wednesday";
    }
    if (int === 4) {
      return "Thursday";
    }
    if (int === 5) {
      return "Friday";
    }
    if (int === 6) {
      return "Saturday";
    }
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={toolbarTheme}>
        <AppBar position="static" color={toolbarTheme.primary}>
          <Toolbar>
            <Tooltip title="Previous week">
              <IconButton
                edge="start"
                className={classes.leftButton}
                onClick={handleClickPrevWeek}
                color="inherit"
                aria-label="left"
              >
                <NavigateBeforeIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Typography variant="h6">{calendarDisplayRange}</Typography>

            <Tooltip title="Next week">
              <IconButton
                edge="start"
                className={classes.rightButton}
                onClick={handleClickNextWeek}
                color="inherit"
                aria-label="right"
              >
                <NavigateNextIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Typography variant="h6" className={classes.title}>
              {calendarMonthYearDisplay}
            </Typography>
            {/* <Button onClick={handleClickDate} color="inherit">
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
              </Button> */}

            <Button onClick={handleToggleToday} color="inherit">
              Go to Today
            </Button>

            <Tooltip title="Calendar Settings">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClickCalendarSettings}
                color="inherit"
              >
                <SettingsIcon />
              </Button>
            </Tooltip>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              color="inherit"
              open={Boolean(anchorEl)}
              onClose={handleCloseCalendarSettings}
            >
              {/* <MenuItem>
                <ExampleSettingsGroup test={test} setTest={setTest} />
              </MenuItem> */}
              <MenuItem>
                <CustomSettingsGroup
                  settingName={"Date"}
                  settingNumber={2}
                  settingOptions={["Date and Day", "Date only"]}
                  settingValue={dateStyle}
                  setSettingValue={setDateStyle}
                />
              </MenuItem>
              <MenuItem>
                <CustomSettingsGroup
                  settingName={"Time"}
                  settingNumber={2}
                  settingOptions={["12-Hrs", "24-Hrs"]}
                  settingValue={timeStyle}
                  setSettingValue={setTimeStyle}
                />
              </MenuItem>
              <MenuItem>
                <CustomSettingsGroup
                  settingName={"Calendar Start"}
                  settingNumber={3}
                  settingOptions={[
                    `Today's day (${toDayOfWeek(getDay(new Date()))})`,
                    "Sunday",
                    "Monday"
                  ]}
                  settingValue={modeStyle}
                  setSettingValue={setModeStyle}
                />
              </MenuItem>
              <MenuItem>
                <CustomSettingsGroup
                  settingName={"Task Name Display"}
                  settingNumber={3}
                  settingOptions={["Top", "Center", "Bottom"]}
                  settingValue={taskNameStyle}
                  setSettingValue={setTaskNameStyle}
                />
              </MenuItem>
              <MenuItem>
                <CustomSettingsGroup
                  settingName={"Smallest Interval"}
                  settingNumber={2}
                  settingOptions={["1 Hour", "30 Minutes"]}
                  settingValue={intervalStyle}
                  setSettingValue={setIntervalStyle}
                />
              </MenuItem>
              {/* <MenuItem onClick={handleClickDate}>
                Date display:&nbsp;
                {dateStyle === "0" ? (
                  <div>Date and Day</div>
                ) : (
                  <div>Date Only</div>
                )}
              </MenuItem>
              <MenuItem onClick={handleClickTime}>
                Time display:&nbsp;
                {timeStyle === 0 ? <div>12hrs</div> : <div>24hrs</div>}
              </MenuItem>
              <MenuItem onClick={handleClickMode}>
                Calendar start:&nbsp;
                {modeStyle === 0 ? (
                  <div> Today</div>
                ) : modeStyle === 1 ? (
                  <div> Sun</div>
                ) : (
                  <div> Mon</div>
                )}
              </MenuItem>
              <MenuItem onClick={handleClickTaskName}>
                Task name display:&nbsp;
                {taskNameStyle === 0 ? (
                  <div> Top of grid</div>
                ) : taskNameStyle === 1 ? (
                  <div> Center of grid</div>
                ) : (
                  <div> Bottom of grid</div>
                )}
              </MenuItem>
              <MenuItem onClick={handleCloseCalendarSettings}>
                Min Interval: lorem ipsum lorem ispum
              </MenuItem> */}
            </Menu>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default CalendarToolbar;
