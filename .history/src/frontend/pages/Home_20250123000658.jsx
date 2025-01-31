import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TopNav from '../components/common/TopNav';
import CategoryNav from '../components/common/CategoryNav';

const Home = () => {
  

  return (
    <>
      
      <div className="max-w-[1440px] mx-auto">
        <TopNav></TopNav>
       <Navbar></Navbar>
       <CategoryNav />
      <Slider></Slider>
          <Outlet />
      
      </div>
 
    </>
  );
};

export default Home;
