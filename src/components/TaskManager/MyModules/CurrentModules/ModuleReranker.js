import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

function ModuleReranker(props) {
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

  // local copies
  const arrayForReranking = [...modules];
  const lowestRank = arrayForReranking.length;

  /**
   * This helper function swaps the ranks of the 2 mods.
   *
   * @param {Current Module being reranked} currMod
   * @param {Other Module being swapped} swappedMod
   */
  function swapRank(currMod, swappedMod) {
    const currRank = currMod.modRank;
    const swappedRank = swappedMod.modRank;
    currMod.modRank = swappedRank;
    swappedMod.modRank = currRank;
    // call sort here to resort entire array by modRank
    // list.sort((a, b) => (a.color > b.color) ? 1 : -1)
    arrayForReranking.sort((a, b) => (a.modRank > b.modRank ? 1 : -1));
  }

  function handleUprank(modId) {
    // if undefined, throw error
    if (arrayForReranking.find((element) => element.modId === undefined)) {
      alert("Error: modId not found");
    }
    const currMod = arrayForReranking.find(
      (element) => element.modId === modId
    );
    // if already highest rank, alert
    if (currMod.modRank === 1) {
      console.log("This is the highest rank!");
    } else {
      const currRank = currMod.modRank;
      arrayForReranking.forEach((element) => {
        if (element.modRank === currRank - 1) {
          swapRank(currMod, element);
          setModules(arrayForReranking);
        }
      });
    }
  }

  function handleDownrank(modId) {
    // if undefined, throw error
    if (arrayForReranking.find((element) => element.modId === undefined)) {
      alert("Error: modId not found");
    }
    const currMod = arrayForReranking.find(
      (element) => element.modId === modId
    );
    // if already lowest rank, alert
    if (currMod.modRank === lowestRank) {
      console.log("This is the lowest rank!");
    } else {
      const currRank = currMod.modRank;
      arrayForReranking.forEach((element) => {
        if (element.modRank === currRank + 1) {
          swapRank(currMod, element);
          setModules(arrayForReranking);
        }
      });
    }
  }

  return (
    <div>
      <IconButton aria-label="uprank">
        <KeyboardArrowUpIcon
          fontSize="small"
          onClick={() => {
            handleUprank(modId);
          }}
        />
      </IconButton>

      <IconButton aria-label="downrank">
        <KeyboardArrowDownIcon
          fontSize="small"
          onClick={() => {
            handleDownrank(modId);
          }}
        />
      </IconButton>
    </div>
  );
}

export default ModuleReranker;
