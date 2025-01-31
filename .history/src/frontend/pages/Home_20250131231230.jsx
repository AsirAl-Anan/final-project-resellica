import  { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TopNav from '../components/common/TopNav';

import Footer from '../components/common/Footer';
import { AuthContext } from '../context/AuthContext';
const Home = () => {
  
  const { getUserData,dbUser,user,reloadUserData} = useContext(AuthContext)
 
   useEffect(()=>{
  
    if(user){

 
     const getData =async ()=>{
        console.log("inside if")
      const data = await reloadUserData()
      console.log("data",data)
      return data
     }
     getData()
    }
   },[user])
  return (
    <>
      
      <div className="max-w-[1440px] mx-auto">
        <TopNav></TopNav>
       <Navbar></Navbar>
       
      
          <Outlet />
          <Footer />
      </div>
 
    </>
  );
};

export default Home;
