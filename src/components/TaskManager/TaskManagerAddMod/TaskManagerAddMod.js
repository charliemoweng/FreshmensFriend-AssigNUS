import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { firebase } from "@firebase/app";
import FormMod from "./FormMod";

function TaskManagerAddMod(props) {
  //console.log("AddMod called");
  const {
    modules,
    setModules,
    moduleId,
    setModuleId,
    moduleName,
    setModuleName,
    moduleColor,
    setModuleColor,
    moduleRank,
    setModuleRank
  } = props;

  // const [newModName, setNewModName] = useState("");
  // const [newModColor, setNewModColor] = useState();
  var newModId = moduleId;

  const newModName = moduleName;
  function setNewModName(name) {
    setModuleName(name);
  }
  const newModColor = moduleColor;
  const newModRank = moduleRank;

  const modNameValidate = (modName) => {
    if (!modName) {
      return "Module name is required";
    }
    if (modules.some((module) => modName === module.modName)) {
      return "This Module is already present";
    }
    // module naming convention:
    // 2/3/4 capitalised letters + 4 numerals + 0/1/2/3/4 capitalised letters
    if (/[A-Z]{2,4}[0-9]{4}[A-Z]{0,4}/.test(modName)) {
      return null;
    }
    // if (/[a-zA-Z0-9]/.test(modName)) {
    //   return null;
    // }
    return "Not a valid Module name";
  };

  const validate = {
    modName: modNameValidate
  };

  const initialValue = {
    modName: ""
  };

  const [values, setValues] = React.useState(initialValue);

  const [errors, setErrors] = React.useState({});

  const [touched, setTouched] = React.useState({});

  // handleChange
  const handleNameInput = (e) => {
    //console.log("handleName is called");
    setNewModName(e.target.value);

    const { name, value: newValue, type } = e.target;

    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true
    });
  };

  function hashCode(str) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  var arrayLength = modules.length;
  newModId = hashCode(newModName);

  while (true) {
    if (modules.find((element) => element.modId === newModId)) {
      newModId++;
    } else {
      break;
    }
  }
  setModuleId(newModId);
  setModuleRank(arrayLength + 1); // this is a default rank assigned upon creation of the module, to be updated
  useEffect(() => {
    // action on update of modules
    // console.log("modules: " + modules + "length: " + modules.length);
  }, [modules]);

  // handleSubmit
  function handleAddMod(event) {
    // if (newModName == null) {
    //   event.preventDefault();
    //   alert("Module name cannot be empty.");
    //   setOpen(false);
    // }
    event.preventDefault();

    // validate the form
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
    ) {
      //alert(JSON.stringify(values, null, 2));
      addMod(newModId, newModName, newModColor, newModRank, firebase);
      setOpen(false);
    }
  }

  function addMod(modId, modName, modColor, modRank) {
    const newMods = [
      ...modules,
      {
        modId: modId,
        modName: modName,
        modColor: modColor,
        modRank: modRank
      }
    ];

    setModules(newMods);
    // var pos = newMods.length - 1;
    // const stg = JSON.stringify(newMods[pos].modColor);
    // console.log("modules is now: " + modules);
    // console.log("Name is: " + newMods[pos].modName);
    // console.log("Color is: " + newMods[pos].modColor);
    // console.log("Rank is: " + newMods[pos].modRank);
  }

  const handleBlur = (evt) => {
    const { name, value } = evt.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error })
    });
  };

  // useEffect(() => {
  //   const uid = firebase.auth().currentUser?.uid;
  //   const db = firebase.firestore();
  //   const doc = db.collection("/modules").doc(uid);
  //   // if (doc == null) {
  //   //   doc.set({ modules: modules }, { merge: true });
  //   // } else {

  //   // }
  //   db.collection("/modules")
  //     .doc(uid)
  //     .set({ modules: modules }, { merge: true });

  //   console.log("useEffect in AddMod called");
  //   // console.log("Task manager overriding modules");
  // }, [modules]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [scroll, setScroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //const [newTaskText, setNewTaskText] = useState("");

  //const [selectedDate, handleDateChange] = useState(new Date());
  /*
  const actions = [
    <Button label="Cancel" onClick={handleClose} color="primary" />,
    <Button
      label="Confirm"
      onClick={handleClose}
      color="primary"
      type="submit"
      form="modform"
    />
  ];
*/

  return (
    <div>
      <div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            <AddIcon /> Module
          </Button>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        //actions={actions}
      >
        <DialogTitle id="scroll-dialog-title">Module Details</DialogTitle>

        <FormMod
          modules={modules}
          setModules={setModules}
          moduleColor={moduleColor}
          setModuleColor={setModuleColor}
          handleAddMod={handleAddMod} //handleSubmit
          handleNameInput={handleNameInput} //handleChange
          handleClose={handleClose}
          scroll={scroll}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          values={values}
        />
      </Dialog>
    </div>
  );
}

export default TaskManagerAddMod;
