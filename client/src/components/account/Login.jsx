
import { TextField, Box, Button, styled} from '@mui/material';
import loginImage from '../account/logo.png';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Login = () => {
    const imageURL = loginImage;

    return (
        <Component> 
            <img src = {imageURL} alt = "login" /> <br></br>
            <TextField variant='standard' />
            <TextField variant='standard' /> 
            <br></br>
            <Button variant='contained'>Login</Button>
            <Button> Create an Account</Button>
        </Component>
        
    )
}
export default Login;