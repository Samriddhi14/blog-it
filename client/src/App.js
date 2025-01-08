import './App.css';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

//components
import Login from "./components/account/Login"
import Home from "./home/Home"
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop: 64}}>
          <Routes>
            <Route path = '/login' element = {<Login />} />
            <Route path = '/' element = {<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
