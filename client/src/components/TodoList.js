import React, {useState, useEffect} from 'react'
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import  DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function TodoList(props) {

  const [todoList, setTodoList] = useState([]);

  const checkDone = (id) => {
    fetch(`http://localhost:5000/checkDone/${id}`, {method: 'GET'})
    props.setChecked(true);
  }

  const deleteTodo = (id) => {

    fetch(`http://localhost:5000/deleteTodo/${id}`, {method: 'DELETE'})
    .then(response => response.json())
    props.setDeleted(true) ;

  }

  const editTodo = (id) => {
    props.setEditing(true);
    props.setEdittodo(id);
   
  }


  useEffect(() => {
    fetch("/getTodos").then(
      response => response.json()
    ).then(
      data => {
        setTodoList(data);
        props.setAdded(false);
        props.setDeleted(false);
        props.setChecked(false);

      }
    )
    // eslint-disable-next-line
  }, [props.added, props.deleted, props.checked]);



  return (
      <TableContainer component={Paper}>
        <Table align="center" sx={{ maxWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell align="center">Todo</TableCell>
                <TableCell align="center">Done</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>    
            {
              todoList.map((todo) => {
                return (
                  <>
                    <TableRow key={todo._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} ></TableRow>
                      <TableCell sx={{ width: "50%" }} align="right">
                        {todo.todo} 
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox 
                        
                          checkedIcon = {<DoneIcon/>}
                          icon = {<CloseIcon/>}
                          checked={
                            todo.done ? true : false
                          }
                          onChange={() => {
                            checkDone(todo._id);
                            
                          }}  
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          size="small"
                          variant="contained"
                          onClick = { () => {
                            editTodo(todo);
                          } }
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          startIcon = {<DeleteIcon/>}
                          size="small" 
                          color="error" 
                          variant="contained" 
                          onClick = { () => {
                            deleteTodo(todo._id);
                          } }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    
                  </>
                );
              }
              )
            }
        
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default TodoList



// <List sx={{ bgcolor: 'background.paper' }}>
      //   {
      //     todoList.map((todo) => {
      //       if (todo.done) {
      //         return (
      //           <ListItemText 
      //             key={todo.id} 
      //             primary={todo.todo} 
      //             style = {{ color: '#87CBAC' }}
      //           />
      //         )
      //       }else{
      //         return (
      //           <ListItemText 
      //             key={todo.id} 
      //             primary={todo.todo} 
      //             style = {{ color: '#E00' }}
      //           />
      //         )
      //       }
            
      //     })        
      //   }
      // </List>