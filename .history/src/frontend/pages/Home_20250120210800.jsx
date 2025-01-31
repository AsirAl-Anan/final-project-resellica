import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';


import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex">
     
      
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
