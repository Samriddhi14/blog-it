
import { useState, useContext } from 'react';
import { TextField, Box, Button, styled, Typography} from '@mui/material';
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

const Login = () => {
    const imageURL = loginImage;

    return (
        <Component> 
            <Image src = {imageURL} alt = "login" />
            {/*<Wrapper>
                <TextField variant='standard' label = 'Enter Username' />
                <TextField variant='standard' label = 'Enter Password' /> 
            </Wrapper>
            <Wrapper>
                <LoginButton variant='contained'>Login</LoginButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <SignupButton> Create an Account</SignupButton>
            </Wrapper> */}
            <Wrapper>
                <TextField variant='standard' label = 'Name' />
                <TextField variant='standard' label = 'Username' /> 
                <TextField variant='standard' label = 'Password' /> 
            </Wrapper>
            <Wrapper>
                <SignupButton>Sign Up</SignupButton>
                <Text style={{ textAlign: 'center' }}>OR</Text>
                <LoginButton variant='contained'> Already have an account?</LoginButton>
            </Wrapper>
            
        </Component>
        
    )
}
export default Login;