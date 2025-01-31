import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';


const Home = () => {
  

  return (
    <>
      
      <div className="">
      
      
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
