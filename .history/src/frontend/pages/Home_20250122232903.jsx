import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const Home = () => {
  

  return (
    <>
      
      <div className="max-w-[1440px]">
      
      
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
