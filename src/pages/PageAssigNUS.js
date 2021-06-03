import Header from "../components/Header/Header";
import Calendar from "../components/Calendar/Calendar";
import TaskManager from "../components/TaskManager/TaskManager";

function PageAssigNUS() {
  return (
    <>
      <Header />
      <main>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          <Calendar />
          <TaskManager />
        </div>
      </main>
    </>
  );
}

export default PageAssigNUS;
