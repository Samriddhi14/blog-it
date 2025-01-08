import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import Login from "./components/account/Login"
import Home from "./home/Home"
import Header from './components/header/Header';
import DataProvider from './context/DataProvider';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated ? 
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
        <div style={{marginTop: 64}}>
          <Routes>
            <Route path = '/login' element = {<Login isUserAuthenticated ={isUserAuthenticated} />} />
            <Route path = '/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path = '/' element = {<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
