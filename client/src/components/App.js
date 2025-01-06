import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';

import DataProvider from './context/DataProvider';

//components
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  //const token = sessionStorage.getItem('accessToken');
  return isAuthenticated  ? 
    <>
      <Header />
      <Outlet />
    </> 
    : <Navigate replace to='/login' />
};


function App(){

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return(
    
      <DataProvider>
        <BrowserRouter>
            <div style={{marginTop:60}}>
              <Routes>
                <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

                <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                  <Route path='/' element={<Home />} />
                </Route>

              </Routes>  

              
            </div>
          
        </BrowserRouter>
      </DataProvider>

  
  );
  
}

export default App;