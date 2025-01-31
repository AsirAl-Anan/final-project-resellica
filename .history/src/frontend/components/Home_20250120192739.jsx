
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
 

  return (
    <>
     
      
        <div >
          <Outlet />
        </div>
    
 
    </>
  );
};

export default Home;
