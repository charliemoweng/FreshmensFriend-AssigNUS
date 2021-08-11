import React, { useState, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Tooltip from "@material-ui/core/Tooltip";

function TaskRenamer(props) {
  const {
    modules,
    setModules,
    moduleId,
    setModuleId,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank,
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
    setTaskRank,
    taskReminder,
    setTaskReminder,
    taskReminderExact,
    setTaskReminderExact
  } = props;

  //console.log("taskMod: " + taskMod + ", taskName: " + taskName);
  useEffect(() => {}, []);

  const initialValues = {
    taskMod: taskMod,
    taskName: taskName
  };

  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newTaskModEdited, setNewTaskModEdited] = useStateWithCallbackLazy(
    taskMod
  );
  const [newTaskReminder, setNewTaskReminder] = useState(taskReminder);
  const [newTaskReminderExact, setNewTaskReminderExact] = useState(
    taskReminderExact
  );
  const [newTaskStart, setNewTaskStart] = useState(taskStart);
  const [newTaskEnd, setNewTaskEnd] = useState(taskEnd);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const tasksArray = [...tasks];
  const modArray = [...modules];

  var hourArray = [];
  const currTime = new Date();
  if (taskDue > currTime) {
    var hours = (taskDue - currTime) / 36e5;
    // console.log(hours);
    if (hours >= 24) {
      // console.log("more than 24 hrs");
      for (var i = 0; i <= 23; i++) {
        hourArray.push({ value: i + 1 });
      }
    } else {
      // console.log("less than 24 hrs");
      for (var j = 0; j <= hours - 1; j++) {
        hourArray.push({ value: j + 1 });
      }
    }
  }

  const handleRenameOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskModValidate = (taskMod) => {
    if (modules.length === 0) {
      return "Please create a Module";
    }
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
      tasksArray.some(
        (task) =>
          task.taskMod === newTaskModEdited &&
          task.taskName === taskName &&
          // task.taskReminder === newTaskReminder &&
          task.taskReminderExact === newTaskReminderExact &&
          task.taskStart === newTaskStart &&
          task.taskEnd === newTaskEnd
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

  // handle change in task mod
  const handleRenameInputMod = (event) => {
    setNewTaskModEdited(event.target.value, () => {
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
    });
  };

  useEffect(() => {
    // console.log("useEffect newTaskModEdited is: " + newTaskModEdited);
  }, [newTaskModEdited]);

  // handle change in task name
  const handleRenameInput = (event) => {
    // console.log("handleName is called");
    setNewTaskName(event.target.value);
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

  // handle change in task reminder
  const handleRenameInputReminder = (event) => {
    setNewTaskReminder(event.target.value);
  };

  // handle submit
  function handleRename(event, taskId) {
    event.preventDefault();

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

    if (newTaskEnd < newTaskStart) {
      // throw error
      alert(
        "Task End cannot be before Task Start! Please select a valid Start and End time."
      );
    }

    if (
      tasks.some(
        (task) => newTaskStart >= task.taskStart && newTaskStart < task.taskEnd
      )
    ) {
      // console.log("task slot clash");
      alert(
        "Task Start clashes with existing task! Please select another time."
      );
    }

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) && // every touched field is true
      newTaskEnd >= newTaskStart && // taskEnd cannot be before taskStart
      !tasks.some(
        (task) => newTaskStart >= task.taskStart && newTaskStart < task.taskEnd // taskStart cannot clash with existing task slots
      )
    ) {
      // console.log("all pass can submit");

      // local copy of modules array for renaming module with modId
      const arrayForRenaming = [...tasks];
      // if undefined, throw error
      if (arrayForRenaming.find((element) => element.taskId === undefined)) {
        alert("Error: taskId not found");
      }
      const currTask = arrayForRenaming.find(
        (element) => element.taskId === taskId
      );
      currTask.taskMod = newTaskModEdited;
      currTask.taskName = newTaskName;
      currTask.taskReminder = newTaskReminder;
      currTask.taskReminderExact = newTaskReminderExact;
      currTask.taskStart = newTaskStart;
      currTask.taskEnd = newTaskEnd;
      setTasks(arrayForRenaming);
      setOpen(false);
    }
  }

  const handleBlur = (evt) => {
    const { name, value } = evt.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    });
  };

  return (
    <div>
      <Tooltip title="Edit task">
        <IconButton aria-label="rename">
          <CreateIcon fontSize="small" onClick={handleRenameOpen} />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        //actions={actions}
      >
        <DialogTitle id="scroll-dialog-title">Edit Task</DialogTitle>
        <form
          id="taskRenameForm"
          onSubmit={(event) => handleRename(event, taskId)}
          autoComplete="off"
        >
          <DialogContent
            style={{ height: "400px" }}
            dividers={scroll === "paper"}
          >
            <DialogContentText>
              <p>Edit your task name/module/reminder time. </p>
              <p> Please touch all fields. </p>
            </DialogContentText>

            <TextField
              id="standard-select-module"
              select
              label="Select Module"
              type="taskMod"
              fullWidth
              defaultValue={taskMod}
              value={values.taskMod}
              onChange={handleRenameInputMod}
              variant="outlined"
              name="taskMod"
              onBlur={handleBlur}
              required
              style={{ marginTop: "1rem" }}
            >
              {modArray.map((option) => (
                <MenuItem key={option.modId} value={option.modName}>
                  {option.modName}
                </MenuItem>
              ))}
            </TextField>
            <div style={{ color: "red" }}>
              {touched.taskMod && errors.taskMod}
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              label="New Task Name"
              type="taskName"
              fullWidth
              defaultValue={taskName}
              onChange={handleRenameInput}
              name="taskName"
              onBlur={handleBlur}
              value={values.taskName}
              required
              style={{ marginTop: "1rem" }}
            />
            <div style={{ color: "red" }}>
              {touched.taskName && errors.taskName}
            </div>

            {/* <TextField
              id="standard-select-reminder"
              select
              label="Set your reminder"
              value={newTaskReminder}
              variant="outlined"
              onChange={handleRenameInputReminder}
              helperText="hours before deadline"
              style={{ marginTop: "1.5rem" }}
            >
              {hourArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField> */}

            <MuiPickersUtilsProvider
              //className={styles.rowFooChild}
              utils={DateFnsUtils}
              autoComplete="off"
            >
              <KeyboardDateTimePicker
                value={newTaskReminderExact}
                label="Set your reminder"
                onError={console.log}
                minDate={new Date(new Date().toLocaleString())}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setNewTaskReminderExact}
                disablePast
                //disabled={taskReminder !== 0}
                //defaultValue={null}
                autoComplete="off"
                fullWidth
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={newTaskStart}
                label="Start at"
                onError={console.log}
                minDate={new Date("2021-01-01T00:00")}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setNewTaskStart}
                required
                style={{ marginRight: "1rem", marginTop: "1rem" }}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={newTaskEnd}
                label="End at"
                onError={console.log}
                minDate={taskStart}
                format="yyyy/MM/dd hh:mm a"
                margin="dense"
                onChange={setNewTaskEnd}
                name="taskEnd"
                required
                style={{ marginLeft: "1rem", marginTop: "1rem" }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(event) => handleRename(event, taskId)}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default TaskRenamer;
