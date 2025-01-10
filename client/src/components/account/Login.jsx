
import { useState, useContext, useEffect  } from 'react';
import { TextField, Box, Button, styled, Typography} from '@mui/material';
import { API } from '../../service/api';
import loginImage from '../account/logo.png';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';


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
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
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

const loginInitialValues = {
    username: '',
    password: ''
};
const signupInitialValues = {
    name: "",
    username: "",
    password: ""
}

const Login = ({isUserAuthenticated}) => {
    const imageURL = loginImage;
    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const [signup, setSignup] = useState(signupInitialValues);

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        setError(false);
    }, [login])

    
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username }); 
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            setError('Something went wrong! please try again later');
            console.log(error);
        }
    }
    
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong! please try again later');
        }
    }
    return (
        <Component> 
            <Box>
            <Image src = {imageURL} alt = "login" />
            {
                account === 'login' ? 
                <Wrapper>
                    <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name = "username" label = 'Enter Username' />
                    <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name = "password" label = 'Enter Password' type="password"  />  

                    {error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={() => loginUser()} >Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={() => toggleSignup()}> Create an Account</SignupButton>
                </Wrapper> 
                :
                <Wrapper>
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='name' label = 'Name' />
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label = 'Username' /> 
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label = 'Password' type="password"  /> 

                    {error && <Error>{error}</Error>}

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