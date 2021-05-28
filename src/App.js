import Header from "./components/Header/Header";
import Calendar from "react-calendar";
import TaskManager from "./components/TaskManager/TaskManager";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <div className="Calendar">
            <h2>Calendar</h2>
            <Calendar />
          </div>
          <TaskManager />
        </div>
      </main>
    </div>
  );
}
