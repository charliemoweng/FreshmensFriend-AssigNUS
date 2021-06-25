import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { firebase } from "@firebase/app";
import ColorPicker from "../../TaskManagerAddMod/ColorPicker";

import styles from "./CurrentModules.module.css";

function CurrentModules(props) {
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

  function handleDelete() {
    // var array = modules; // creates local copy
    // // array.splice(index, 1);
    // setModules(array.splice(index, 1));
    // console.log(modules);

    // currently only supports Delete ALL
    setModules([]);
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
                  handleDelete();
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
