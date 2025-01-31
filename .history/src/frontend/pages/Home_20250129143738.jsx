import  { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TopNav from '../components/common/TopNav';
import CategoryNav from '../components/common/CategoryNav';
import Footer from '../components/common/Footer';
import { AuthContext } from '../context/AuthContext';
const Home = () => {
  
  const { getUserData,dbUser,user,reloadUserData} = useContext(AuthContext)
   console.log("user",user)
   useEffect(()=>{
    console.log("inside useffect")
    if(user){

    //  (async function getData() {
    //     console.log("inside if")
    //     await  reloadUserData()
    //   })
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
       <CategoryNav />
      
          <Outlet />
          <Footer />
      </div>
 
    </>
  );
};

export default Home;
