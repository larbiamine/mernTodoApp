import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Stack  from '@mui/material/Stack';
// import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
// import { textAlign } from '@mui/system';
// import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';


function Addtodo(props) {
  const [state, setState] = useState("");
  const [todo, setTodo] = useState("");


  const addTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({  
        user: props.currentuser,
        todo: todo,
        done: false,
      })
    }; 
    
    fetch('http://localhost:5000/createTodo', requestOptions)
    .then(response => response.json())
    .then(() =>  props.setAdded(true));
  }


  return (
    <Box 
      mt={4}
      sx={{ flexGrow: 1 }}
    >
    
          <Grid 
            justifyContent="center" 
            container direction={"row"} 
            spacing={2}
          >
            <Grid xs={4} item>
              <TextField 
                sx={{ width : "100%"}}
                helperText=" "
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
                  setTodo(e.target.value);
                } } 
            />
            </Grid>
            <Grid xs={2} item>
              <Button 
              sx={{width: "100%"}}
              size="medium" 
              variant="contained" 
              onClick={ () => {
                  if (props.editing) {
                    props.f_editTodo(props.edittodo._id, props.edittodo.todo, props.done);
                  }
                    else {
                    addTodo();
                    }
                  } 
                } 
              >
              {props.editing ? "Save" :  "Add"}
            </Button>
            </Grid>
          </Grid>
    </Box>
    );
}

export default Addtodo;