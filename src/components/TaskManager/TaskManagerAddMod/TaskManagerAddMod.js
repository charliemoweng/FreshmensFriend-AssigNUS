import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../TaskManagerAddMod/TaskManagerAddMod.module.css";
import AddIcon from "@material-ui/icons/Add";
import ColorPicker from "material-ui-color-picker";

function TaskManagerAddMod(props) {
  const { modules, setModules } = props;

  const [newModText, setNewModText] = useState("");

  function handleAddMod(event) {
    event.preventDefault();
    addMod(newModText);
  }

  function addMod(description) {
    const newMods = [
      //...modules,
      {
        description: description
      }
    ];
    //setModules(newMods);
    console.log(newMods);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [scroll, setScroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [newTaskText, setNewTaskText] = useState("");

  const [selectedDate, handleDateChange] = useState(new Date());

  const actions = [
    <Button label="Cancel" onClick={handleClose} color="primary" />,
    <Button
      label="Confirm"
      onClick={handleClose}
      color="primary"
      type="submit"
      form="modform"
    />
  ];

  return (
    <div>
      <div className={styles.TMButtonParent}>
        <div className={styles.TMButtonLeft}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            <AddIcon /> Module
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        actions={actions}
      >
        <DialogTitle id="scroll-dialog-title">Module Details</DialogTitle>
        <form id="modform" onSubmit={handleAddMod}>
          <DialogContent
            style={{ height: "400px" }}
            dividers={scroll === "paper"}
          >
            <DialogContentText>
              Add a Module! Color Selection to be added in a future update.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="moduleName"
              label="Module"
              type="moduleName"
              fullWidth
            />

            <ColorPicker
              name="colour"
              margin="dense"
              defaultValue="Select Module Colour"
              // value={this.state.color} - for controlled component
              onChange={(color) => console.log(color)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              //onClick={handleClose}
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

export default TaskManagerAddMod;
