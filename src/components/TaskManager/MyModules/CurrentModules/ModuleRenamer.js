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

function ModuleRenamer(props) {
  const {
    modId,
    modules,
    setModules,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank
  } = props;

  const [newModName, setNewModName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleRenameOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRenameInput = (e) => {
    // console.log("handleName is called");
    setNewModName(e.target.value);
  };

  function handleRename(event, modId) {
    event.preventDefault();

    // local copy of modules array for renaming module with modId
    const arrayForRenaming = [...modules];
    // if undefined, throw error
    if (arrayForRenaming.find((element) => element.modId === undefined)) {
      alert("Error: modId not found");
    }
    const currMod = arrayForRenaming.find((element) => element.modId === modId);
    //const copyForRenaming = { ...arrayForRenaming[modId] };
    console.log("modId: " + modId + "local copy: " + arrayForRenaming);
    currMod.modName = newModName;
    //arrayForRenaming[modId] = copyForRenaming;
    // updates the modules array using the updated local copy
    setModules(arrayForRenaming);
    setOpen(false);
  }

  return (
    <div>
      <IconButton aria-label="rename">
        <CreateIcon
          fontSize="small"
          onClick={() => {
            handleRenameOpen(module);
          }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        //actions={actions}
      >
        <DialogTitle id="scroll-dialog-title">Rename Module</DialogTitle>
        <form
          id="modRenameForm"
          onSubmit={(event) => handleRename(event, modId)}
        >
          <DialogContent
            style={{ height: "400px" }}
            dividers={scroll === "paper"}
          >
            <DialogContentText>Rename Your Module!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="moduleName"
              label="New Module Name"
              type="moduleName"
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
              onClick={(event) => handleRename(event, modId)}
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

export default ModuleRenamer;
