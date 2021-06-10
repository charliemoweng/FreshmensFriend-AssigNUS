import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

function CalendarToolbar(props) {
  const classes = useStyles();
  const {
    dateStyle,
    setDateStyle,
    timeStyle,
    setTimeStyle,
    modeStyle,
    setModeStyle
  } = props;

  const handleClickDate = () => {
    // handles the clicking of date button to display / hide the dates
    console.log("Date button has been clicked");
    if (dateStyle === 0) {
      setDateStyle(1);
      console.log("new dateStyle is: " + dateStyle);
    } else {
      setDateStyle(0);
      console.log("new dateStyle is: " + dateStyle);
    }
  };

  const handleClickTime = () => {
    // handles the clicking of time button to change display between 12hr and 24hr time
    console.log("Time button has been clicked");
    if (timeStyle === 0) {
      setTimeStyle(1);
      console.log("new timeStyle: " + timeStyle);
    } else {
      setTimeStyle(0);
      console.log("new timeStyle: " + timeStyle);
    }
  };

  const handleClickMode = () => {
    // handles the clicking of mode button to swap horizontal and vertical modes
    console.log("Mode button has been clicked");
    if (modeStyle === 0) {
      setModeStyle(1);
      console.log("new modeStyle is: " + modeStyle);
    } else {
      setModeStyle(0);
      console.log("new modeStyle is: " + modeStyle);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BaseCalendar (name tbc)
          </Typography>
          <div className={classes.buttons}>
            <Button onClick={handleClickDate} color="inherit">
              Date
            </Button>
            <Button onClick={handleClickTime} color="inherit">
              Time
            </Button>
            <Button onClick={handleClickMode} color="inherit">
              Mode
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CalendarToolbar;
