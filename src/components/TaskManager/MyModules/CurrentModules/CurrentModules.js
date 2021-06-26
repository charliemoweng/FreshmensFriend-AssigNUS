import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { firebase } from "@firebase/app";
import ColorPicker from "../../TaskManagerAddMod/ColorPicker";

import styles from "./CurrentModules.module.css";

function CurrentModules(props) {
  console.log("current modules called");
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

  useEffect(() => {
    // action on update of modules
    // console.log("modules array changed");
    // console.log("modules: " + modules + "length: " + modules.length);
  }, [modules]);

  function handleDelete(mod) {
    // Delete ALL for quick debugging
    // setModules([]);

    // local copy for updating ranks
    const arrayToUpdateRanks = modules;

    // Saving rank of item being deleted in order to compare with and rerank other modules in the array
    const deletedRank = mod.modRank;
    console.log("deletedRank is : " + deletedRank);

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

  return (
    <table
      className={styles.paddingBetweenCols}
      style={{ margin: "0 auto", width: "100%" }}
    >
      <thead>
        <tr>
          <th>No.</th>
          <th>Mod</th>
          {
            //<th>ID</th> uncomment only for debugging
          }
          <th>Rank</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody className={styles.tableContent}>
        {modules.map((module, index) => (
          // We should specify key here to help react identify
          // what has updated
          // https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{module.modName}</td>
            {
              //<td>{module.modId}</td> ID hidden from user
            }
            <td>{module.modRank}</td>
            <td>
              {
                <ColorPicker
                  color={module.modColor}
                  moduleColor={moduleColor}
                  setModuleColor={setModuleColor}
                />
              }
            </td>
            <IconButton aria-label="delete">
              <DeleteIcon
                fontSize="small"
                onClick={() => {
                  handleDelete(module);
                }}
              />
            </IconButton>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CurrentModules;
