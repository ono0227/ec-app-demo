import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = (props) => {
    return (
        <TextField
          fullWidth={props.fullWidth}
          label={props.label}
          margin="dense"
          multiline={props.multiline}
          required={props.required}
          row={props.row}
          value={props.row}
          type={props.type}
          onChange={props.onChange}
        />
    )
}

export default TextInput
