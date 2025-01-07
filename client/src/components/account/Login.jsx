
import { TextField, Box, Button, styled} from '@mui/material';
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

const Login = () => {
    const imageURL = loginImage;

    return (
        <Component> 
            <Image src = {imageURL} alt = "login" />
            <Wrapper>
                <TextField variant='standard' />
                <TextField variant='standard' /> 
            </Wrapper>
            <Wrapper>
                <LoginButton variant='contained'>Login</LoginButton>
                <Button> Create an Account</Button>
            </Wrapper>
        </Component>
        
    )
}
export default Login;