import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import RegisterPage from './Auth/RegisterPage';

const Home = () => {
  

  return (
    <>
      
      <div className="flex">
      
      RegisterPage/>          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
