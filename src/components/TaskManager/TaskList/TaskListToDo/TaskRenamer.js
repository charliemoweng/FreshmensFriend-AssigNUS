import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
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

  const [newTaskName, setNewTaskName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleRenameOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRenameInput = (event) => {
    // console.log("handleName is called");
    setNewTaskName(event.target.value);
  };

  function handleRename(event, taskId) {
    event.preventDefault();

    // local copy of modules array for renaming module with modId
    const arrayForRenaming = [...tasks];
    // if undefined, throw error
    if (arrayForRenaming.find((element) => element.taskId === undefined)) {
      alert("Error: taskId not found");
    }
    const currTask = arrayForRenaming.find(
      (element) => element.taskId === taskId
    );

    currTask.taskName = newTaskName;
    setTasks(arrayForRenaming);
    setOpen(false);
  }

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
        <DialogTitle id="scroll-dialog-title">Rename Task</DialogTitle>
        <form
          id="taskRenameForm"
          onSubmit={(event) => handleRename(event, taskId)}
        >
          <DialogContent
            style={{ height: "400px" }}
            dividers={scroll === "paper"}
          >
            <DialogContentText>Rename Your Task!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="taskName"
              label="New Task Name"
              type="taskName"
              fullWidth
              onChange={handleRenameInput}
            />
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
