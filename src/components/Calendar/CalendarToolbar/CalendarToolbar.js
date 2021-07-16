import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
          <IconButton
            edge="start"
            className={classes.leftButton}
            color="inherit"
            aria-label="left"
          >
            <NavigateBeforeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6">16/7 - 22/7</Typography>
          <IconButton
            edge="start"
            className={classes.rightButton}
            color="inherit"
            aria-label="right"
          >
            <NavigateNextIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            July 2021 (Month - Year)
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
