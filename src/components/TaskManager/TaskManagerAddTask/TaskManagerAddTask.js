import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../TaskManager/TaskManager.module.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import { firebase } from "@firebase/app";

function TaskManagerAddTask(props) {
  console.log("AddTask called");
  const {
    modules,
    setModules,
    tasks,
    setTasks,
    taskId,
    setTaskId,
    taskMod,
    setTaskMod,
    taskName,
    setTaskName,
    taskDue,
    setTaskDue,
    taskStart,
    setTaskStart,
    taskEnd,
    setTaskEnd,
    taskWeight,
    setTaskWeight,
    taskComplete,
    setTaskComplete
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
  }));
  const classes = useStyles();

  const modArray = Array.from(modules);

  const handleTaskModChange = (event) => {
    setTaskMod(event.target.moduleName);
    console.log(event.target.moduleName);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newTaskText, setNewTaskText] = useState("");

  const [selectedDate, handleDateChange] = useState(new Date());

  function handleAddTask(event) {
    event.preventDefault();
    addTask(newTaskText);
  }

  function addTask(description) {
    const newTasks = [
      ...tasks,
      {
        taskId: 0,
        taskMod: 0,
        taskName: 0,
        taskDue: 0,
        taskStart: 0,
        taskEnd: 0,
        taskWeight: 0
      }
    ];
    setTasks(newTasks);
  }

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/tasks").doc(uid).set({ tasks: tasks });
  }, [tasks]);

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];

    setTasks(newTasks);
  }

  return (
    <div>
      <div className={styles.TMButtonParent}>
        <div className={styles.TMButtonMiddle}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            <AddIcon /> Task
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Task Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a Task! This can also be done by dragging out an area on your
            Calendar (upcoming feature)
          </DialogContentText>
          <div className={classes.root}>
            <TextField
              id="standard-select-module"
              select
              label="Select Module"
              value={taskMod}
              onChange={handleTaskModChange}
              helperText="Please select the module for this task"
              variant="outlined"
            >
              {modArray.map((option) => (
                <MenuItem key={option.modId} value={option.modId}>
                  {option.modName}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField
            autoFocus
            margin="dense"
            id="moduleName"
            label="Module"
            type="moduleName"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Name of Task"
            type="taskName"
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              label="Due Date and Time"
              onError={console.log}
              minDate={new Date("2018-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
              margin="dense"
              fullWidth
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              label="Start at"
              onError={console.log}
              minDate={new Date("2021-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
              margin="dense"
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              value={selectedDate}
              onChange={handleDateChange}
              label="End at"
              onError={console.log}
              minDate={new Date("2021-01-01T00:00")}
              format="yyyy/MM/dd hh:mm a"
              margin="dense"
            />
          </MuiPickersUtilsProvider>

          <TextField
            autoFocus
            margin="dense"
            id="weitage"
            label="Weightage (optional)"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskManagerAddTask;
