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
    setTaskRank
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

  const newTaskMod = taskMod;

  const [newTaskName, setNewTaskName] = useState(taskName);
  const [newTaskModEdited, setNewTaskModEdited] = useStateWithCallbackLazy(
    taskMod
  );

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const tasksArray = [...tasks];
  const modArray = [...modules];

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
          task.taskMod === newTaskModEdited && task.taskName === taskName
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

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
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

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    });
  };

  return (
    <div>
      <IconButton aria-label="rename">
        <CreateIcon fontSize="small" onClick={handleRenameOpen} />
      </IconButton>

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
              Rename Your Task and/or change its module!
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
            />
            <div style={{ color: "red" }}>
              {touched.taskName && errors.taskName}
            </div>
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
