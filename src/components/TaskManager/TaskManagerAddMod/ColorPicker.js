// //"use strict";

// import React, { useState } from "react";
// import reactCSS from "reactcss";
// import { TwitterPicker } from "react-color";

// function ColorPicker(props) {
//   const { moduleColor, setModuleColor } = props;

//   const [displayColorPicker, setDisplayColorPicker] = useState(false);
//   const [color, setColor] = useState({ r: "241", g: "112", b: "19", a: "1" });

//   const handleClick = () => {
//     setDisplayColorPicker({ displayColorPicker: !displayColorPicker });
//   };
//   const handleClose = () => {
//     setDisplayColorPicker({ displayColorPicker: false });
//   };

//   const handleChange = (color) => {
//     setColor({ color: color.rgb });
//     setModuleColor({
//       ...moduleColor,
//       color: {
//         r: color.r,
//         g: color.g,
//         b: color.b,
//         a: color.a
//       }
//     });
//   };

//   const styles = reactCSS({
//     default: {
//       color: {
//         width: "36px",
//         height: "14px",
//         borderRadius: "2px",
//         background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
//       },
//       swatch: {
//         padding: "5px",
//         background: "#fff",
//         borderRadius: "1px",
//         boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
//         display: "inline-block",
//         cursor: "pointer"
//       },
//       popover: {
//         position: "absolute",
//         zIndex: "2"
//       },
//       cover: {
//         position: "fixed",
//         top: "0px",
//         right: "0px",
//         bottom: "0px",
//         left: "0px"
//       }
//     }
//   });

//   return (
//     <div>
//       <div style={styles.swatch} onClick={handleClick}>
//         <div style={styles.color} />
//       </div>
//       {displayColorPicker ? (
//         <div style={styles.popover}>
//           <div style={styles.cover} onClick={handleClose} />
//           <TwitterPicker color={color} onChangeComplete={handleChange} />
//         </div>
//       ) : null}
//     </div>
//   );
// }

// export default ColorPicker;

import React from "react";
import reactCSS from "reactcss";
import { TwitterPicker } from "react-color";

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    // How to pass this color state up? Need to use same color for other components
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    }
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
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

    const handleChange = (color, event) => {
      this.setState({ color: color.rgb });
      this.props.setModuleColor({ color: { hex: color.hex } });
      console.log("Color.rgb is: " + color.rgb);
      console.log("Color.hex is: " + color.hex);
    };

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <TwitterPicker
              color={this.state.color}
              onChangeComplete={handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
