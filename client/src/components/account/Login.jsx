
import { TextField, Box, Button } from '@mui/material';
import loginImage from '../account/logo.png';

const Login = () => {
    const imageURL = loginImage;

    return (
        <Box> 
            <img src = {imageURL} alt = "login" />
            <TextField variant='standard' />
            <TextField variant='standard' />
            <Button variant='contained'>Login</Button>
            <Button> Create Account</Button>
        </Box>
        
    )
}
export default Login;