
import { useState /*useContext*/ } from 'react';
import { TextField, Box, Button, styled, Typography} from '@mui/material';
import { API } from '../../service/api';
import loginImage from '../account/logo.png';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    padding: 50px;
`;
const Image = styled('img')({ //image treated as variable
    width: 200,
    display: 'flex',
    margin: 'auto',
    padding: '0 50px 0',
    borderRadius: '30% 0% 30% 0%'
  });

  const Text = styled(Typography)`
    color: #213555;
    font-size: 14px;
`;

  const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1; 
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
  const LoginButton = styled(Button)`
    text-transform: none;
    background: #3E5879 ;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #213555;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const signupInitialValues = {
    name: "",
    username: "",
    password: ""
}

const Login = () => {
    const imageURL = loginImage;
    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    const signupUser = async () => {
        let response = await API.userSignup(signup);
    }
    return (
        <Component> 
            <Box>
            <Image src = {imageURL} alt = "login" />
            {
                account === 'login' ? 
                <Wrapper>
                    <TextField variant='standard' label = 'Enter Username' />
                    <TextField variant='standard' label = 'Enter Password' /> 
                    <LoginButton variant='contained'>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}> Create an Account</SignupButton>
                </Wrapper> 
                :
                <Wrapper>
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='name' label = 'Name' />
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label = 'Username' /> 
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label = 'Password' /> 
                    <SignupButton onClick={() => signupUser()}>Sign Up</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant='contained' onClick={() => toggleSignup()}> Already have an account?</LoginButton>
                </Wrapper>
            }
            </Box>
        </Component>
    )
}
export default Login;