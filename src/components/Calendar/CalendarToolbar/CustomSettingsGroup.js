import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function CustomSettingsGroup(props) {
  // Name, Number of settings (an integer), names of options (an array of strings), setter of hook
  const {
    settingName,
    settingNumber,
    settingOptions,
    settingValue,
    setSettingValue
  } = props;

  // useState hooks here for storing local and changing value of setting
  const [local, setLocal] = useState(settingValue.toString());

  // does smth only when local changes
  useEffect(() => {
    // console.log("local is: " + local + " type: " + typeof local);
    // const parsedLocal = parseInt(local, 10);
    // console.log(
    //   "parsedLocal is: " + parsedLocal + " type: " + typeof parsedLocal
    // );
    setSettingValue(local);
  }, [local]);

  const handleChange = (event) => {
    // event.preventDefault();
    setLocal(event.target.value);
  };

  var radioArray = [];

  for (var i = 0; i < settingNumber; i++) {
    var iStringified = i.toString();
    radioArray.push(
      <FormControlLabel
        value={iStringified}
        control={<Radio />}
        label={settingOptions[i]}
      />
    );
  }
  setSettingValue(local);
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{settingName}</FormLabel>
      <RadioGroup
        row
        aria-label={settingName}
        name={settingName}
        value={local}
        onChange={handleChange}
      >
        {radioArray}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomSettingsGroup;
