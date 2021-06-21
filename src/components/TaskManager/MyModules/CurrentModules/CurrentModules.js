import React, { useState } from "react";
import { Button, Checkbox } from "@material-ui/core";

import styles from "./CurrentModules.module.css";

{
  /* checking the Completed box in TaskListToDo lead to this place */
}

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
          <th>Completed</th>
          <th>Add to Calendar</th>
        </tr>
      </thead>
      <tbody className={styles.tableContent}></tbody>
    </table>
  );
}

export default CurrentModules;
