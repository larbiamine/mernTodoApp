import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import Login from './Login';


export default function Navbar(props) {

    const logout = () =>{
        fetch('/api/logout', {method: 'GET'})
        .then(() => {
            props.setLogged(false)
        })
    }
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >

            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List
            </Typography>
            <Button 
                color="inherit"
                onClick={()=>{
                    if(props.logged){
                        logout();
                    }
                }}
            >
                {props.logged ? "Logout" : ""}
            </Button>
        </Toolbar>
        </AppBar>
    </Box>
    );
}
