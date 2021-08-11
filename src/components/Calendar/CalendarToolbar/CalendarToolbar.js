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

  const handleToggleToday = () => {
    setCalendarStart(new Date());
  };

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
            </Menu>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default CalendarToolbar;
