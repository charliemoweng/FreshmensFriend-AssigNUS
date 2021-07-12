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
    setTaskComplete,
    taskRank,
    setTaskRank
  } = props;

  const newTaskId = taskId;
  const newTaskRank = taskRank;
  const newTaskMod = taskMod;
  const newTaskName = taskName;
  const newTaskDue = taskDue;
  const newTaskStart = taskStart;
  const newTaskEnd = taskEnd;
  const newTaskWeight = taskWeight;

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

  useEffect(() => {}, [modArray]);
  useEffect(() => {
    var arrayLength = tasks.length;
    setTaskId(arrayLength);
    setTaskRank(arrayLength + 1);
  });
  // Handlers

  const handleTaskModChange = (event) => {
    setTaskMod(event.target.value);
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskWeightChange = (event) => {
    setTaskWeight(event.target.value);
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
    console.log(
      "New Task(id,mod,name): " + newTaskId + newTaskMod + newTaskName
    );
    addTask(
      newTaskId,
      newTaskRank,
      newTaskMod,
      newTaskName,
      newTaskDue,
      newTaskStart,
      newTaskEnd,
      newTaskWeight,
      firebase
    );
    setOpen(false);
  }

  function addTask(
    taskId,
    taskRank,
    taskMod,
    taskName,
    taskDue,
    taskStart,
    taskEnd,
    taskWeight
  ) {
    const newTasks = [
      ...tasks,
      {
        taskId: taskId,
        taskRank: taskRank,
        taskMod: taskMod,
        taskName: taskName,
        taskDue: taskDue,
        taskStart: taskStart,
        taskEnd: taskEnd,
        taskWeight: taskWeight
      }
    ];
    setTasks(newTasks);
  }

  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   db.collection("/tasks").doc(uid).set({ tasks: tasks });
  // }, [tasks]);

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

        <form onSubmit={handleAddTask} autoComplete="off">
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
                variant="outlined"
              >
                {modArray.map((option) => (
                  <MenuItem key={option.modId} value={option.modName}>
                    {option.modName}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              label="Name of Task"
              type="taskName"
              onChange={handleTaskNameChange}
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={taskDue}
                label="Due Date and Time"
                onError={console.log}
                minDate={new Date("2021-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setTaskDue}
                fullWidth
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={taskStart}
                label="Start at"
                onError={console.log}
                minDate={new Date("2021-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setTaskStart}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={taskEnd}
                label="End at"
                onError={console.log}
                minDate={new Date("2021-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setTaskEnd}
              />
            </MuiPickersUtilsProvider>

            <TextField
              autoFocus
              margin="dense"
              id="weitage"
              label="Weightage (optional)"
              fullWidth
              onChange={handleTaskWeightChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddTask} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default TaskManagerAddTask;
