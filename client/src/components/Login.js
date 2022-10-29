import React, {useState} from 'react'
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';



function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const login = (username, password) => {
        if (!username || !password) {
            setError("Username and password are required");
        }else{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({  
                  username:  password,
                  password: username,
                })
              };
            fetch('/api/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg === 'you have logged in succesfully'){
                    props.setLogged(true);
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
                    label="username"
                    onChange={(ee) => {
                        setUsername(ee.target.value);
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
                            login(password, username);
                        }
                    }
                >
                    Log in
                </Button>
                <Typography
                    endDecorator={<Link href="/sign-up">Sign up</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                    >
                    Don't have an account?
                </Typography>
            </Sheet>
        </CssVarsProvider>
    </div>
  )
}

export default Login