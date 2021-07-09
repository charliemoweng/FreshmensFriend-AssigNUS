import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import styles from "../TaskManagerAddMod/FormMod.module.css";
import ColorPicker from "./ColorPicker";

function FormMod(props) {
  const {
    moduleColor,
    setModuleColor,
    handleAddMod,
    handleNameInput,
    handleClose,
    scroll,
    errors,
    handleBlur,
    touched,
    values
  } = props;

  return (
    <>
      <form
        //id="modForm"
        onSubmit={handleAddMod}
        autoComplete="off"
      >
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
                required
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
              required
              name="modName"
              onBlur={handleBlur}
              value={values.moduleName}
            />
          </div>
          {touched.modName && errors.modName}
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
    </>
  );
}

export default FormMod;
