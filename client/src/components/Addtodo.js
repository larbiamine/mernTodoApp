import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack  from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';
import Icon from '@mui/material/Icon';

function Addtodo(props) {
  const [state, setState] = useState("");
  return (
    <Box 
      mt={4}
    >
      <TextField 

        helperText="Enter Todo"
        size = "small"
        id="outlined-basic" 
        variant="outlined" 
        type="text" 
        placeholder='todo' 
        value={
          props.editing ? props.edittodo.todo :  state
        }
        onChange={ (e) => {
          setState(e.target.value);
          props.edittodo.todo = e.target.value;
          props.setEdittodo(props.edittodo);
          props.setTodo(e.target.value);
        } } 
      />

        
        <Button 
 
          size="medium" 
          variant="contained" 
          onClick={ () => {
            if (props.editing) {
              props.f_editTodo(props.edittodo._id, props.edittodo.todo, props.done);
            }
              else {
                props.addTodo();
              }
            } 
          } 
        >
          {props.editing ? "Save" :  "Add"}

        </Button>
    </Box>
    );
}

export default Addtodo;