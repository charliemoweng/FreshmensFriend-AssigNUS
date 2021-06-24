import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./CurrentModules.module.css";

function CurrentModules(props) {
  const { modules, setModules } = props;

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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CurrentModules;
