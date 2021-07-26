import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Schedule from "@material-ui/icons/Schedule";
import FontDownload from "@material-ui/icons/FontDownload";
import Stars from "@material-ui/icons/Stars";
import AddIcon from "@material-ui/icons/Add";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import Typography from "@material-ui/core/Typography";
import {
  red,
  blue,
  green,
  yellow,
  purple,
  orange
} from "@material-ui/core/colors";
import styles from "../TaskManager/TaskManager.module.css";

function TaskManagerRankTasks(props) {
  //console.log("RankTasks called");

  const {
    modules,
    setModules,
    tasks,
    setTasks,
    rankIsOpen,
    setRankIsOpen
  } = props;
  // useEffect(() => {}, []);
  // useEffect(() => {}, [modules]);
  const categories = ["Due Date", "Name", "Importance"];
  const useStyles = makeStyles({
    due: {
      backgroundColor: red[100],
      color: red[600]
    },
    module: {
      backgroundColor: orange[100],
      color: orange[600]
    },
    name: {
      backgroundColor: blue[100],
      color: blue[600]
    },
    importance: {
      backgroundColor: green[600],
      color: yellow[600]
    }
  });

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    function handleClickDue(event) {
      event.preventDefault();

      // local copy of tasks array
      const tasksByDue = [...tasks];
      const newArray = tasksByDue.sort((a, b) =>
        a.taskDue > b.taskDue ? 1 : -1
      );
      for (var i = 0; i < newArray.length; i++) {
        newArray[i].taskRank = i + 1;
      }
      setTasks(newArray);
      onClose("Due");
    }

    function handleClickMod(event) {
      event.preventDefault();

      // local copy
      const tasksByMod = [...tasks];
      const modArray = [...modules];
      const newTasksArray = [];

      // sorting tasks by their module
      modArray.forEach((elementMod) => {
        // for each mod starting from first, look for tasks with that mod and add to newTasksArray
        const currModName = elementMod.modName;
        tasksByMod.forEach((elementTask) => {
          if (elementTask.taskMod === currModName) {
            newTasksArray.push(elementTask);
          }
        });
      });

      // rerank tasks in newTasksArray
      for (var i = 0; i < newTasksArray.length; i++) {
        newTasksArray[i].taskRank = i + 1;
      }
      setTasks(newTasksArray);
      onClose("Module");
    }

    function handleClickName(event) {
      event.preventDefault();

      // local copy
      const tasksByName = [...tasks];
      const newArray = tasksByName.sort((a, b) =>
        a.taskName > b.taskName ? 1 : -1
      );

      // rerank tasks
      for (var i = 0; i < newArray.length; i++) {
        newArray[i].taskRank = i + 1;
      }
      setTasks(newArray);
      onClose("Name");
    }

    function handleClickImportance(event) {
      event.preventDefault();

      // local copy of tasks array
      const tasksByImpt = [...tasks];
      const modArray = [...modules];
      const newArray = tasksByImpt.sort((a, b) =>
        a.taskDue > b.taskDue
          ? 1
          : a.taskDue < b.taskDue
          ? -1
          : modArray.find((element) => element.modName === a.taskMod).modRank >
            modArray.find((element) => element.modName === b.taskMod).modRank
          ? 1
          : -1
      );
      for (var i = 0; i < newArray.length; i++) {
        newArray[i].taskRank = i + 1;
      }
      setTasks(newArray);
      onClose("Importance");
    }

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Sort Tasks by</DialogTitle>
        <List>
          {/*}
          {categories.map((category) => (
            <ListItem
              button
              onClick={() => handleListItemClick(category)}
              key={category}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category} />
            </ListItem>
          ))}
          */}

          <ListItem autoFocus button onClick={handleClickDue}>
            <ListItemAvatar>
              <Avatar className={classes.due}>
                <Schedule />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Deadline"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Rank by Deadline of the Task.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem autoFocus button onClick={handleClickMod}>
            <ListItemAvatar>
              <Avatar className={classes.module}>
                <ViewModuleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Module"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Rank by Task Module, following order in Current Modules.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem autoFocus button onClick={handleClickName}>
            <ListItemAvatar>
              <Avatar className={classes.name}>
                <FontDownload />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Name"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Rank by Task Name, following ASCII value.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>

          <ListItem autoFocus button onClick={handleClickImportance}>
            <ListItemAvatar>
              <Avatar className={classes.importance}>
                <Stars />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Importance"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Rank by Task Deadline and Module.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(categories[1]);

  const handleClickOpen = () => {
    setRankIsOpen(true);
    setOpen(true);
  };

  const handleClose = (value) => {
    setRankIsOpen(false);
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickReverse = (event) => {
    event.preventDefault();

    // local copy
    const tasksArrayReverse = [...tasks];
    const newArray = tasksArrayReverse.sort((a, b) =>
      a.taskRank < b.taskRank ? 1 : -1
    );

    // rerank tasks
    for (var i = 0; i < newArray.length; i++) {
      newArray[i].taskRank = i + 1;
    }
    setTasks(newArray);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Rank
      </Button>
      <Button
        className={styles.reverseButton}
        variant="contained"
        color="default"
        onClick={handleClickReverse}
      >
        <SwapVertIcon />
      </Button>

      <Typography variant="subtitle1">By: {selectedValue}</Typography>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default TaskManagerRankTasks;
