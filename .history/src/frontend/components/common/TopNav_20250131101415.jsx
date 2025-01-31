import React from 'react';
import { Bell, ShoppingCart, ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
const TopNav = () => {
  const {dbUser,signout,user, getUserData} = useContext(AuthContext)
  
 const handleLogout =()=>{
   signout()
 }

 console.log("dbUser",dbUser)
  return (
    <div className="w-full bg-white border-b text-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {
            !dbUser && !user ? <div className="flex items-center gap-1">
            <span>Hi!</span>
            <NavLink to={'/sign-in'} className="text-[#3665F3] hover:underline">Sign in</NavLink>
            <span>or</span>
            <NavLink to={'/user-register'} className="text-[#3665F3] hover:underline">register</NavLink>
          </div> : <div className="flex items-center gap-1">
         
         <NavLink onClick={()=>handleLogout()} className="text-[#3665F3] hover:underline">logout</NavLink>
       </div>
          }
          
   
          <div className="flex items-center gap-6">
            
            
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Help & Contact</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {
            dbUser &&
          <div>Hello! <h1 className='text-base inline text-cyan-500'>{dbUser?.username || "user"}</h1> </div>  
            
       
      
          }
          
   
        </div>
        <div className="flex items-center gap-6">
        {
  dbUser?.[0]?.role === "admin" ? (
    <>
    <NavLink to="/admin" className="hover:underline">
      Admin Panel
    </NavLink>
    <button className="flex items-center gap-1 hover:underline">
    Account
     
    </button>
    </>
    
  ) : null
}
{
  dbUser?.[0]?.role === "seller" || dbUser?.[0]?.role === "user" ? (
    <>
    <NavLink to="/business-register" className="hover:underline">
      sell
    </NavLink>
    <button className="flex items-center gap-1 hover:underline">
    Account
     
    </button>
    </>
    
  ) : null
}

          
          <Bell className="w-5 h-5" />
         <NavLink className={"hover:underline"} to={'/watchlist'}>Watch list</NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopNav;