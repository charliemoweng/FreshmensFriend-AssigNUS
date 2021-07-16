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
    setModuleRank,
    tasks,
    setTasks
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

  const modNameValidate = (modName) => {
    if (!modName) {
      return "Module name is required";
    }
    if (modules.some((module) => modName === module.modName)) {
      return "This Module is already present";
    }
    // module naming convention:
    // 2/3/4 capitalised letters + 4 numerals + 0/1/2/3/4 capitalised letters
    // if (/[A-Z]{2,4}[0-9]{4}[A-Z]{0,4}/.test(modName)) {
    //   return null;
    // }
    if (/[a-zA-Z0-9]/.test(modName)) {
      return null;
    }
    return "Not a valid Module name";
  };

  const validate = {
    modName: modNameValidate
  };

  const initialValue = {
    modName: moduleName
  };

  const [values, setValues] = React.useState(initialValue);

  const [errors, setErrors] = React.useState({});

  const [touched, setTouched] = React.useState({});

  // handle change
  const handleRenameInput = (e) => {
    // console.log("handleName is called");
    setNewModName(e.target.value);

    const { name, value: newValue, type } = e.target;

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
  function handleRename(event, modId) {
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
      const arrayForRenaming = [...modules];
      // if undefined, throw error
      if (arrayForRenaming.find((element) => element.modId === undefined)) {
        alert("Error: modId not found");
      }
      const currMod = arrayForRenaming.find(
        (element) => element.modId === modId
      );
      //const copyForRenaming = { ...arrayForRenaming[modId] };
      //console.log("modId: " + modId + "local copy: " + arrayForRenaming);

      // stores a copy of old mod name that's being replaced
      const currModName = currMod.modName;

      // updates the mod name with the new mod name
      currMod.modName = newModName;
      //arrayForRenaming[modId] = copyForRenaming;

      // renaming modules means all tasks for that module need to be checked
      const taskArrayForModRenaming = [...tasks];
      if (taskArrayForModRenaming !== []) {
        taskArrayForModRenaming.forEach((element) => {
          if (element.taskMod === currModName) {
            // task found with old mod name, set name to new name
            element.taskMod = newModName;
          }
        });
      }

      // updates the modules array using the updated local copy
      setModules(arrayForRenaming);
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
        <DialogTitle id="scroll-dialog-title">Rename Module</DialogTitle>
        <form
          id="modRenameForm"
          onSubmit={(event) => handleRename(event, modId)}
          autoComplete="off"
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
              defaultValue={moduleName}
              onChange={handleRenameInput}
              required
              name="modName"
              onBlur={handleBlur}
              value={values.moduleName}
            />
            <div style={{ color: "red" }}>
              {touched.modName && errors.modName}
            </div>
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
