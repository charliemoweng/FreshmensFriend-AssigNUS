import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { firebase } from "@firebase/app";
import ColorPicker from "../../TaskManagerAddMod/ColorPicker";
import ModuleRenamer from "./ModuleRenamer";
import ModuleReranker from "./ModuleReranker";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./CurrentModules.module.css";

function CurrentModules(props) {
  // console.log("current modules called");
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

  useEffect(() => {}, []); // need modules here?
  console.log("modules array is: " + JSON.stringify(modules));
  function handleDelete(mod) {
    // Delete ALL for quick debugging
    // setModules([]);

    // local copy for updating ranks
    const arrayToUpdateRanks = [...modules];

    // Saving rank of item being deleted in order to compare with and rerank other modules in the array
    const deletedRank = mod.modRank;
    // console.log("deletedRank is : " + deletedRank);

    // Logic for updating ranks of other items in the modules array upon the deletion of one item
    // Idea: upon deletion, check the modRank of all other items and update them one by one

    /* 3 possible cases: Deleted item is first in array, last in array, or somewhere in the middle

    In order to compare with other ranks, we need to save the rank of that module before deleting it (done)
    
    Case 1: deleted first in array (only ranks lower than it, lower meaning larger int value)
    Not too difficult, all other items' modRank will be subtracted by 1.

    Case 2: deleted last in array (only ranks higher than it, higher meaning smaller int value)
    Perfect! This is the most straightforward case, all other ranks are already correct so no need to update anything.

    Case 3: deleted middle in array
    All items with ranks lower than it (larger int value) will have their ranks subtracted by 1.
    All items with ranks higher than it (smaller int value) will already have the correct rank.   
    */

    // Case 1 (actually handled in case 3?)

    // Case 2 (nothing needed)
    // The mitochondria is the powerhouse of the cell.

    // Case 3 (handles case 1 as well!)
    // Helper to change rank
    function updateRankOnDeletion(modChecked) {
      if (modChecked.modRank > deletedRank) {
        // console.log("Need to update rank");
        modChecked.modRank--;
      }
    }

    arrayToUpdateRanks.forEach((element) => {
      updateRankOnDeletion(element);
    });

    // Good practice to keep original modules array immutable so create local copy
    const newArray = arrayToUpdateRanks.filter(
      (module) => module.modId !== mod.modId
    );
    // updates the modules array using the updated local copy
    setModules(newArray);
  }

  const [newModName, setNewModName] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [scroll, setScroll] = React.useState("paper");

  const handleRenameInput = (e) => {
    // console.log("handleName is called");
    setNewModName(e.target.value);
  };

  function handleRename(event, modId) {
    // local copy of modules array for renaming module with modId
    event.preventDefault();
    const arrayForRenaming = [...modules];
    const copyForRenaming = { ...arrayForRenaming[modId] };
    // console.log("local copy of array is : " + arrayForRenaming);
    copyForRenaming.modName = newModName;
    arrayForRenaming[modId] = copyForRenaming;
    // updates the modules array using the updated local copy
    setModules(arrayForRenaming);
    setOpen(false);
  }

  return (
    <div>
      <table
        className={styles.cmTable}
        style={{ margin: "0 auto", width: "100%" }}
      >
        {/* <thead> */}
        {/* <tr> */}
        {/* <th>No.</th> */}
        {/* <th>Rank</th> */}
        {/* <th>Module</th> */}
        {
          // <th>ID</th> uncomment only for debugging
        }
        {/* <th>Color</th> */}
        {/* </tr> */}
        {/* </thead> */}

        <tbody className={styles.tableContent}>
          {modules.map((module, index) => (
            // We should specify key here to help react identify
            // what has updated
            // https://reactjs.org/docs/lists-and-keys.html#keys
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td>{module.modRank}</td>
              <td>
                <ModuleReranker
                  modId={module.modId}
                  modules={modules}
                  setModules={setModules}
                />
              </td>
              <td>{module.modName}</td>
              {
                // <td>{module.modId}</td> ID hidden from user
              }
              <td>
                <ModuleRenamer
                  modId={module.modId}
                  modules={modules}
                  setModules={setModules}
                />
              </td>
              <td>
                {
                  <ColorPicker
                    // key uses the unique identifier for module, modId
                    key={module.modId}
                    modId={module.modId}
                    modules={modules}
                    setModules={setModules}
                    moduleColor={module.modColor}
                    setModuleColor={setModuleColor}
                  />
                }
              </td>
              <td>
                <IconButton aria-label="delete">
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => {
                      handleDelete(module);
                    }}
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentModules;
