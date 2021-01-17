import React from 'react'
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

function Input(props) {
  const { label, name, classes, ...rest } = props;

  const [field, meta] = useField(name);

  return (
    <>
      <TextField
          id="outlined-password-input"
          error={meta.touched && !!meta.error}
          label={label}
          name={name}
          helperText={meta.touched && meta.error}
          className={classes}
          {...field} 
          {...rest}
        />
    </>
  )
}

export default Input
