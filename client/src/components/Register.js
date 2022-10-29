import React, {useState} from 'react'
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { useNavigate } from "react-router-dom";


function Register(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const register = (username, password, email) => {
        if (!username || !password) {
            setError("Username, password and email are required");
        }else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({  
                  username:  username ,
                  password:  password,
                  email:  email,
                })
              };
            fetch('/api/register', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === 'user registred!!'){
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({  
                          username:  username ,
                          password:  password,

                        })
                    }
                    fetch('/api/login', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if(data.msg === 'you have logged in succesfully'){
                            props.setLogged(true);
                            navigate("/");
                        }
                    }
                    )
                    }else{
                        setError(data.msg);
                }
              
            })
        }

    }


  return (
    <div>
        <CssVarsProvider>
            <Sheet 
                sx={{
                    width: 300,
                    mx: 'auto', // margin left & right
                    my: 4, // margin top & botom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                
            >
                <div>
                    <Typography level="h4" component="h1">
                    Welcome!
                    </Typography>
                </div>
                <TextField
                    // html input attribute
                    name="username"
                    type="text"
                    
                    // pass down to FormLabel as children
                    label="Username"
                    onChange={(ee) => {
                        setUsername(ee.target.value);
                    }}
                    />
                <TextField
                    // html input attribute
                    name="email"
                    type="email"
                    
                    // pass down to FormLabel as children
                    label="Email"
                    onChange={(ee) => {
                        setEmail(ee.target.value);
                    }}
                    />
                <TextField
                    name="password"
                    type="password"
                    label="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);

                        
                    }}
                />
                <TextField
                    name="cpassword"
                    type="password"
                    label="Confirm password"
                    onChange={(e) => {
                        setCpassword(e.target.value)
                        if (e.target.value != password) {
                            setError("passwords dont match");
                        }else{
                            setError("");
                            setPassword(e.target.value); 
                        }
                        
                    }}
                />
                <Typography
                    color='danger'
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    {error}

                </Typography>
                <Button 
                    sx={{ mt: 1 /* margin top */ }}
                    onClick={ () => {
                        if (!cpassword) {
                            setError("Confirm password");
                        }else{
                            if (!error) {
                                register(username, password, email);
                            }
                        }
   
                        }
                    }
                >
                    Register
                </Button>
                <Typography
                    endDecorator={<Link href="/">Login</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                    >
                    Already have an account? 
                </Typography>
            </Sheet>
        </CssVarsProvider>
    </div>
  )
}

export default Register