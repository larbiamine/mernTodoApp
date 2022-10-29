import React, {useState, useEffect} from 'react';
import './App.css'
import Addtodo from './components/Addtodo'
import TodoList from './components/TodoList'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";




function App() {

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
            setAdded = {setAdded}
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CheckLogg/>,
    },
    {
      path: "/register",
      element: <Register
        logged = {logged}
        setLogged = {setLogged}
      />,
    },
  ]);

  return (
    <div className='App'>
      
      <Navbar
        logged = {logged}
        setLogged = {setLogged}
      />
      {/* <CheckLogg/> */}
      <RouterProvider router={router} />
      

    </div>
  )
}

export default App