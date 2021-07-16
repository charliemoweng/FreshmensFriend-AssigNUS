import React, { useState } from "react";
import {
  Cell,
  DefaultEventRootComponent,
  EventContent,
  RangeBox,
  Schedule,
  TimeGridScheduler,
  classes
} from "@remotelock/react-week-scheduler";
import "@remotelock/react-week-scheduler/index.css";
import { startOfWeek } from "date-fns";

const rangeStrings = [];

const defaultSchedule = rangeStrings.map((range) =>
  range.map((dateString) => new Date(dateString))
);

function BaseCalendar(props) {
  const { tasks, setTasks, modules, setModules } = props;
  const [schedule, setSchedule] = useState(() => defaultSchedule);

  // put into originDate to change which date to start with, let users input 'weekStartsOn' ?
  const startOnMonday = startOfWeek(new Date(), { weekStartsOn: 1 });
  return (
    <div
      className="root"
      style={{
        width: "100%",
        height: "600px",
        "--cell-height": "20px",
        "--cell-width": "50px"
      }}
    >
      <TimeGridScheduler
        classes={classes}
        style={{ width: "100%", height: "100%" }}
        originDate={startOnMonday}
        schedule={schedule}
        onChange={setSchedule}
        visualGridVerticalPrecision={15}
        verticalPrecision={15}
        cellClickPrecision={60}
      />
    </div>
  );
}

export default BaseCalendar;
