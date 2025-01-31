import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Home = () => {
  

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-[1440px] mx-auto">
       
      
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
