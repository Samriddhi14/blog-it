import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import Login from "./components/account/Login"
import Home from "./home/Home"
import Header from './components/header/Header';
import DataProvider from './context/DataProvider';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
//import { UpdateDisabled } from '@mui/icons-material';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/login' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{marginTop: 64}}>
          <Routes>

            <Route path = '/login' element = {<Login isUserAuthenticated ={isUserAuthenticated} />} />
            <Route path = '/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path = '/' element = {<Home />} />
            </Route>

            <Route path = '/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path = '/create' element = {<CreatePost />} />
            </Route>

            <Route path = '/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path = '/details/:id' element = {<DetailView />} />
            </Route>

            <Route path = '/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path = '/update/:id' element = {<Update />} />
            </Route>

          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;