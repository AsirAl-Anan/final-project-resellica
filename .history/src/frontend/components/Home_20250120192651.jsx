import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { AuthContext } from '../contextAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './shared/Sidebar';

const Home = () => {
 

  return (
    <>
     
      
        <div >
          <Outlet />
        </div>
    
 
    </>
  );
};

export default Home;
