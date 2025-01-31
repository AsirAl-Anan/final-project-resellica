import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/authContext';


const Home = () => {
  

  return (
    <>
      
      <div className="flex">
      
        
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
