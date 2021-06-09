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

const rangeStrings = [];

const defaultSchedule = rangeStrings.map((range) =>
  range.map((dateString) => new Date(dateString))
);

function BaseCalendar(props) {
  const { tasks } = props;
  const [schedule, setSchedule] = useState(() => defaultSchedule);

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
        originDate={new Date("2019-03-04")}
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
