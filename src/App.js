import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import AppShell from "./components/AppShell/AppShell";
import PageAssigNUS from "./pages/PageAssigNUS";
import PageLogin from "./pages/PageLogin";
import "./styles.css";
import { Notifications } from "react-push-notification";

export default function App() {
  return (
    <div className="App">
      <Notifications />
      <AppShell />
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed>
          <PageAssigNUS />
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          <PageLogin />
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}
