import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Schedule from "@material-ui/icons/Schedule";
import FontDownload from "@material-ui/icons/FontDownload";
import Stars from "@material-ui/icons/Stars";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { red, blue, green, yellow } from "@material-ui/core/colors";
import styles from "../TaskManager/TaskManager.module.css";

function TaskManagerRankTasks(props) {
  //console.log("RankTasks called");
  const { modules, setModules, tasks, setTasks } = props;

  const categories = ["Due Date", "Name", "Importance"];
  const useStyles = makeStyles({
    due: {
      backgroundColor: red[100],
      color: red[600]
    },
    name: {
      backgroundColor: blue[100],
      color: blue[600]
    },
    importance: {
      backgroundColor: green[600],
      color: yellow[600]
    }
  });

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Sort Tasks by</DialogTitle>
        <List>
          {/*}
          {categories.map((category) => (
            <ListItem
              button
              onClick={() => handleListItemClick(category)}
              key={category}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category} />
            </ListItem>
          ))}
          */}

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("Due Date")}
          >
            <ListItemAvatar>
              <Avatar className={classes.due}>
                <Schedule />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Due Date" />
          </ListItem>

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("Name")}
          >
            <ListItemAvatar>
              <Avatar className={classes.name}>
                <FontDownload />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Name" />
          </ListItem>

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("Importance")}
          >
            <ListItemAvatar>
              <Avatar className={classes.importance}>
                <Stars />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Importance" />
          </ListItem>

          <ListItem
            autoFocus
            button
            onClick={() => handleListItemClick("Custom")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Custom" />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(categories[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className={styles.TMButtonParent}>
        <div className={styles.TMButtonRight}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Rank Tasks
          </Button>
        </div>
      </div>
      <Typography variant="subtitle1">By: {selectedValue}</Typography>
      <div />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default TaskManagerRankTasks;
