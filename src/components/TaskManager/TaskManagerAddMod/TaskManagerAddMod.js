import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "../TaskManagerAddMod/TaskManagerAddMod.module.css";
import AddIcon from "@material-ui/icons/Add";
import ColorPicker from "./ColorPicker";
import { firebase } from "@firebase/app";

function TaskManagerAddMod(props) {
  const {
    modules,
    setModules,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank
  } = props;

  // const [newModName, setNewModName] = useState("");
  // const [newModColor, setNewModColor] = useState();
  const newModName = moduleName;
  function setNewModName(name) {
    setModuleName(name);
  }
  const newModColor = moduleColor;

  //unused
  // function setNewModColor(color) {
  //   setModuleColor(color);
  // }

  const handleNameInput = (e) => {
    // console.log("handleName is called");
    setNewModName(e.target.value);
  };

  //unused
  // const handleColorInput = (event, color) => {
  //   console.log("handleColor is called");
  //   setModuleColor({
  //     ...moduleColor,
  //     color: {
  //       hex: color.hex
  //     }
  //   });

  //   // console.log(event.target.value);
  // };

  function handleAddMod(event) {
    event.preventDefault();
    // console.log("handleAddMod Function:" + newModName + newModColor);

    // console.log("Length of modules Array is: " + arrLength);
    // if (modules.length === -1) {
    //   console.log("Base Case occured: Length of modules Array is 0");
    //   setModuleRank(1);
    // } else {
    //   setModuleRank(arrLength + 2);
    // }
    setModuleRank(modules.length + 2);
    addMod(newModName, newModColor, moduleRank);

    setOpen(false);
  }

  function addMod(modName, modColor, modRank) {
    const newMods = [
      ...modules,
      {
        modName: modName,
        modColor: modColor,
        modRank: modRank
      }
    ];

    setModules(newMods);
    // var pos = newMods.length - 1;
    // const stg = JSON.stringify(newMods[pos].modColor);
    console.log(newMods);
    // console.log("Name is: " + newMods[pos].modName);
    // console.log("Color is: " + newMods[pos].modColor);
    // console.log("Rank is: " + newMods[pos].modRank);
  }

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    db.collection("/modules").doc(uid).set({ modules: modules });
  }, [modules]);

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

  //const [newTaskText, setNewTaskText] = useState("");

  //const [selectedDate, handleDateChange] = useState(new Date());
  /*
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
*/
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
        //actions={actions}
      >
        <DialogTitle id="scroll-dialog-title">Module Details</DialogTitle>
        <form id="modform" onSubmit={handleAddMod}>
          <DialogContent
            style={{ height: "400px" }}
            dividers={scroll === "paper"}
          >
            <DialogContentText>
              Add a Module and select a Color for it!
            </DialogContentText>
            <div className={styles.rowA}>
              <div className={styles.objA}>
                <ColorPicker
                  moduleColor={moduleColor}
                  setModuleColor={setModuleColor}
                  // onChange={handleColorInput}
                />
              </div>
              <TextField
                autoFocus
                margin="dense"
                id="moduleName"
                label="Module"
                type="moduleName"
                fullWidth
                onChange={handleNameInput}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddMod} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default TaskManagerAddMod;
