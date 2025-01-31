import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';



import 'react-toastify/dist/ReactToastify.css';


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
