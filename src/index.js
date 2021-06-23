import { CssBaseline } from "@material-ui/core";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { FirebaseAuthProvider } from "@react-firebase/auth";

import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

import { config } from "./config/firebase";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <CssBaseline />
      <App />
    </FirebaseAuthProvider>
  </StrictMode>,
  rootElement
);
