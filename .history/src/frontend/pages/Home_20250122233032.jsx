import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const Home = () => {
  

  return (
    <>
      
      <div className="max-w-[1440px] mx-auto">
       <Navbar></Navbar>
      
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
