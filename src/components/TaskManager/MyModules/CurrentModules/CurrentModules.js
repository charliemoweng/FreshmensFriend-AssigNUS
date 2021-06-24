import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { firebase } from "@firebase/app";

import styles from "./CurrentModules.module.css";

function CurrentModules(props) {
  const { modules, setModules } = props;

  const handleDelete = (index) => {
    var array = modules; // creates local copy

    array.splice(index, 1);
    setModules(array);
    console.log(modules);
  };

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/modules").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setModules(doc.data().modules);
      } else {
        setModules([]);
      }
    });
  }, []);

  return (
    <table
      className={styles.paddingBetweenCols}
      style={{ margin: "0 auto", width: "100%" }}
    >
      <thead>
        <tr>
          <th>No.</th>
          <th>Task</th>
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
            <td>{module.modRank}</td>
            <td>{module.modColor}</td>
            <IconButton aria-label="delete">
              <DeleteIcon
                fontSize="small"
                onClick={() => {
                  alert("clicked");
                  handleDelete(index);
                  console.log(modules);
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
