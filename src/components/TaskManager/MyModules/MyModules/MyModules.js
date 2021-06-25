import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CurrentModules from "../CurrentModules/CurrentModules";
import styles from "./MyModules.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: "center"
  }
}));

export default function MyModules(props) {
  const {
    modules,
    setModules,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank
  } = props;

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
            <b>Current Modules</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.ModTables}>
            <Typography>
              <CurrentModules
                modules={modules}
                setModules={setModules}
                moduleName={moduleName}
                setModuleName={setModuleName}
                moduleColor={moduleColor}
                setModuleColor={setModuleColor}
                moduleRank={moduleRank}
                setModuleRank={setModuleRank}
              />
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
