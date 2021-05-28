import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import AppShell from "./components/AppShell/AppShell";
import PageAssigNUS from "./pages/PageAssigNUS";
import PageLogin from "./pages/PageLogin";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
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
