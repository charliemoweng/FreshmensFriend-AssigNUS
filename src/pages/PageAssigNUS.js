import Header from "../components/Header/Header";
import Calendar from "react-calendar";
import TaskManager from "../components/TaskManager/TaskManager";

function PageAssigNUS() {
  return (
    <>
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
    </>
  );
}

export default PageAssigNUS;
