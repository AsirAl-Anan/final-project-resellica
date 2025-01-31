import React, { useEffect, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './shared/Sidebar';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false)
  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      <div className="flex">
        {
          showSidebar ? <Sidebar setShowSidebar={setShowSidebar}/> : null
        }
      
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
 
    </>
  );
};

export default Home;
