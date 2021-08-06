import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function CustomSettingsGroup(props) {
  const { test, setTest } = props;
  const [value, setValue] = React.useState("0");

  // does smth only when value changes
  useEffect(() => {
    console.log("value is: " + value);
    setTest(value);
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const settingOptions = ["Female", "Male", "Other"];
  var radioArray = [];

  for (var i = 0; i < 3; i++) {
    var iStringified = i.toString();
    radioArray.push(
      <FormControlLabel
        value={iStringified}
        control={<Radio />}
        label={settingOptions[i]}
      />
    );
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        {/* <FormControlLabel value="0" control={<Radio />} label="Female" />
        <FormControlLabel value="1" control={<Radio />} label="Male" />
        <FormControlLabel value="2" control={<Radio />} label="Other" /> */}
        {radioArray}
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="(Disabled option)"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default CustomSettingsGroup;
