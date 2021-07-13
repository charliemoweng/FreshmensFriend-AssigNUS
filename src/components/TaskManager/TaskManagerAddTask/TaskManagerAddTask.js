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
  //console.log("AddTask called");
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
    taskComplete,
    setTaskComplete,
    taskRank,
    setTaskRank
  } = props;

  var newTaskId = taskId;
  const newTaskRank = taskRank;
  const newTaskMod = taskMod;
  const newTaskName = taskName;
  const newTaskDue = taskDue;
  const newTaskStart = taskStart;
  const newTaskEnd = taskEnd;

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

  const taskModValidate = (taskMod) => {
    if (!taskMod) {
      return "Please select a module for this task";
    }
    return null;
  };

  const taskNameValidate = (taskName) => {
    if (!taskName) {
      return "Task name is required";
    }
    if (
      tasks.some(
        (task) => task.taskMod === newTaskMod && task.taskName === taskName
      )
    ) {
      return "This Task is already present";
    }
    if (/^\d$/.test(taskName)) {
      return "Invalid Task name";
    }
    return null;
  };

  const validate = {
    taskMod: taskModValidate,
    taskName: taskNameValidate
  };

  const initialValues = {
    taskMod: "",
    taskName: ""
  };

  const [values, setValues] = React.useState(initialValues);

  const [errors, setErrors] = React.useState({});

  const [touched, setTouched] = React.useState({});

  // Handlers (handle change)
  const handleTaskModChange = (event) => {
    setTaskMod(event.target.value);

    const { name, value: newValue, type } = event.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);

    const { name, value: newValue, type } = event.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true
    });
  };

  function hashCode(str) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  var arrayLength = tasks.length;
  const result = newTaskMod.concat(newTaskName);
  newTaskId = hashCode(result);

  while (true) {
    if (tasks.find((element) => element.taskId === newTaskId)) {
      newTaskId++;
    } else {
      break;
    }
  }
  setTaskId(newTaskId);
  setTaskRank(arrayLength + 1);
  useEffect(() => {}, [tasks]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newTaskText, setNewTaskText] = useState("");

  const [selectedDate, handleDateChange] = useState(new Date());

  //handle submit
  function handleAddTask(event) {
    event.preventDefault();
    console.log(
      "New Task(id,mod,name): " + newTaskId + newTaskMod + newTaskName
    );

    // validate the form
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      //alert(JSON.stringify(values, null, 2));
      addTask(
        newTaskId,
        newTaskRank,
        newTaskMod,
        newTaskName,
        newTaskDue,
        newTaskStart,
        newTaskEnd,
        taskComplete,
        firebase
      );
      setOpen(false);
    }
  }

  function addTask(
    taskId,
    taskRank,
    taskMod,
    taskName,
    taskDue,
    taskStart,
    taskEnd,
    taskComplete
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
        taskComplete: taskComplete
      }
    ];
    setTasks(newTasks);
  }

  const handleBlur = (evt) => {
    const { name, value } = evt.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    });
  };

  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   db.collection("/tasks").doc(uid).set({ tasks: tasks });
  // }, [tasks]);

  // function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
  //   const newTasks = [
  //     ...tasks.slice(0, toToggleTaskIndex),
  //     {
  //       description: toToggleTask.description,
  //       isComplete: !toToggleTask.isComplete
  //     },
  //     ...tasks.slice(toToggleTaskIndex + 1)
  //   ];

  //   setTasks(newTasks);
  // }

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
                value={values.taskMod}
                onChange={handleTaskModChange}
                variant="outlined"
                name="taskMod"
                onBlur={handleBlur}
                required
              >
                {modArray.map((option) => (
                  <MenuItem key={option.modId} value={option.modName}>
                    {option.modName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div style={{ color: "red" }}>
              {touched.taskMod && errors.taskMod}
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              label="Name of Task"
              type="taskName"
              onChange={handleTaskNameChange}
              fullWidth
              name="taskName"
              onBlur={handleBlur}
              value={values.taskName}
              required
            />
            <div style={{ color: "red" }}>
              {touched.taskName && errors.taskName}
            </div>

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
