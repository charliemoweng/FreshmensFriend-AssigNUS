import React, { useState, useEffect } from "react";
import reactCSS from "reactcss";
import { TwitterPicker } from "react-color";

function ColorPicker(props) {
  const {
    key,
    modId,
    modules,
    setModules,
    moduleColor,
    setModuleColor
  } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  useEffect(() => {
    // action on update of modules
    // console.log("modules array changed");
    // console.log("modules: " + modules + "length: " + modules.length);
    // handleChange;
  }, [modules]);

  function hexToRgbA(hex) {
    var c, r, g, b;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      r = [(c >> 16) & 255];
      g = [(c >> 8) & 255];
      b = [c & 255];

      return (
        // "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
        "{ r: " + r + ", g: " + g + ", b: " + b + ', a: "1" }'
      );
    }
    throw new Error("Bad Hex");
  }

  function hexToR(hex) {
    var c, r, g, b;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      r = [(c >> 16) & 255];
      g = [(c >> 8) & 255];
      b = [c & 255];

      return r;
    }
    throw new Error("Bad Hex");
  }

  function hexToG(hex) {
    var c, r, g, b;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      r = [(c >> 16) & 255];
      g = [(c >> 8) & 255];
      b = [c & 255];

      return g;
    }
    throw new Error("Bad Hex");
  }

  function hexToB(hex) {
    var c, r, g, b;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      r = [(c >> 16) & 255];
      g = [(c >> 8) & 255];
      b = [c & 255];

      return b;
    }
    throw new Error("Bad Hex");
  }

  const [color, setColor] = useState({
    r: hexToR(moduleColor),
    g: hexToG(moduleColor),
    b: hexToB(moduleColor),
    a: "1"
  });
  // console.log("hexToR: " + hexToR(moduleColor));

  const handleChange = (color, event) => {
    setColor(color.rgb);
    setModuleColor(color.hex);
    // console.log("Color.rgb is: " + color.rgb);
    // console.log("Color.hex is: " + color.hex);
    console.log("modId is: " + modId);
    const arrayForRecoloring = [...modules];

    // only executes when editing color of already existing mod
    if (arrayForRecoloring.find((element) => element.modId === modId)) {
      console.log(JSON.stringify(arrayForRecoloring));
      const currMod = arrayForRecoloring.find(
        (element) => element.modId === modId
      );
      currMod.modColor = color.hex; // change modColor to be new color
      setModules(arrayForRecoloring);
    }
    handleClose();
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "30px",
        borderRadius: "5px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer"
      },
      popover: {
        position: "absolute",
        zIndex: "2"
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    }
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <TwitterPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;
