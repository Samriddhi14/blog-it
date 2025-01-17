
import { AppBar, Toolbar, styled } from '@mui/material'; 
import { Link } from 'react-router-dom';

//import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: #3E5879;
    color: black;
`;

const Container = styled(Toolbar)`
    & > a {
        padding: 20px;
        color: #fff;
        text-decoration: none;
    }
`

const Header = () => {

    //const navigate = useNavigate();
    //const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;