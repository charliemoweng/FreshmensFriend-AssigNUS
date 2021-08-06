import React, { useState, useEffect } from "react";
import { firebase } from "@firebase/app";

function Header(props) {
  //console.log("header called");
  // const { modules, setModulesState } = props;

  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   const docRef = db.collection("/modules").doc(uid);

  //   docRef.get().then((doc) => {
  //     if (doc.exists) {
  //       setModulesState(doc.data().modules);
  //       console.log("old user data retrieved");
  //       // Need to call this before Taskmanager Fires
  //     } else {
  //       setModulesState([]);
  //       console.log("new user");
  //     }
  //   });
  // }, []);

  return (
    <header>
      <div className={Header}>
        <h1>Welcome to AssigNUS v1.1.0</h1>
      </div>
    </header>
  );
}

export default Header;
