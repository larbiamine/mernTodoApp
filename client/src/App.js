import React, {useState, useEffect} from 'react';
import './App.css'
import Addtodo from './components/Addtodo'
import TodoList from './components/TodoList'
import Navbar from './components/Navbar'
import Login from './components/Login'

function App() {

  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(false);

  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [editing, setEditing] = useState(false);
  const [edittodo, setEdittodo] = useState({});

  const [checked, setChecked] = useState(false);

  const [logged, setLogged] = useState(false);


  useEffect(() => {
    fetch('/api/checklogged', {method: 'GET'})
    .then(response => response.json())
    .then(data => {
      setLogged(data.logged)
    })
  }, [logged]);

  const f_editTodo = (id, todo, done) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
        todo: todo,
        done: done,
      })
    };
    fetch(`http://localhost:5000/editTodo/${id}`, requestOptions)
    .then(() => { setEditing(false);});
    
    
  }

  const addTodo = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
        todo: todo,
        done: done,
      })
    };
    
    fetch('http://localhost:5000/createTodo', requestOptions)
    .then(response => response.json())
    .then(() =>  setAdded(true));
  }


  const CheckLogg = () => {
    if (!logged) {
      return(
        <Login
        logged = {logged}
        setLogged = {setLogged}
        /> 
      )
    }else{
      return(
        <div>
          <Addtodo
            setDone = {setDone}
            setTodo = {setTodo}
            addTodo = {addTodo}
            setEditing = {setEditing}
            setEdittodo = {setEdittodo}
            f_editTodo = {f_editTodo}
            editing = {editing}
            edittodo = {edittodo}
          />
          <TodoList 
            setAdded = {setAdded}
            added = {added}
            setDeleted = {setDeleted}
            deleted = {deleted}
            setEditing = {setEditing}
            setEdittodo = {setEdittodo}
            editing = {editing}
            edittodo = {edittodo}
            setChecked = {setChecked}
            checked = {checked}
          />  
        </div>  
      )
    }
  }


  return (
    <div className='App'>

       <Navbar
        logged = {logged}
        setLogged = {setLogged}
      />
      <CheckLogg/>

    </div>
  )
}

export default App