import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TaskListToDo from "../TaskListToDo/TaskListToDo";
import TaskListCompleted from "../TaskListCompleted/TaskListCompleted";
import styles from "./TaskList.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default function SimpleAccordion(props) {
  const { tasks, setTasks } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <b>To-do</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.TaskTables}>
            <Typography>
              <TaskListToDo tasks={tasks} setTasks={setTasks} />
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            <b>Completed</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.TaskTables}>
            <Typography>
              <TaskListCompleted tasks={tasks} setTasks={setTasks} />
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
