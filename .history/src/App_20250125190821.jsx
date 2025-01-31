import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import { useContext } from 'react';
import Home from './frontend/pages/Home';
import { AuthContext } from './frontend/context/AuthContext';
import { ToastContainer ,Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegisterPage from './frontend/pages/Auth/UserRegisterPage';
import BussinessRegisterPage from './frontend/pages/Auth/BussinessRegisterPage';
import AdminDashboard from './frontend/pages/Admin/AdminComponents/AdminDashboard';
import ProductForm from './frontend/pages/Admin/AddProduct';
import AdminLayout from './frontend/pages/Admin/AdminLayout';
import CentralAdminDashboard from './frontend/pages/Admin/AdminComponents/Central-Admin/Dashboard';
import ProductListings from './frontend/pages/Products/Product-Listings';
import HomeLayout from './frontend/layouts/HomeLayout';
import SellerPanelLayout from './frontend/pages/SellerPanel/SellerPanelLayout';
import SellerDashboard from './frontend/pages/SellerPanel/SellerPanelComponents/SellerDashboard';
import SignIn from './frontend/pages/Auth/LoginPage';
import { SellerAuthProvider } from './frontend/context/SellerContext';
import SellerSignIn from './frontend/pages/Auth/SellerLoginPage';
const AppLayout = ({ children }) => {
  const {user, dbUser, } = useContext(AuthContext);
  console.log("d",dbUser)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);

  return (
    <>
      {/* {loading && <TopBarProgress />} */}
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
    children: [
     {
      path: '/category/product',  // /product will be replaced by :id
      element: <ProductListings />

     }, 
     {
      path: '/',
      element: <HomeLayout />
     }
    ],
  },
  {
    path: '/user-register',
    element: (
      <AppLayout>
        <UserRegisterPage />
      </AppLayout>
    )
  },
  {
    path: '/business-register',
    element: (
      <AppLayout>
        <BussinessRegisterPage />
      </AppLayout>
    )
  },
  {
    path: '/sign-in',
    element: (
      <AppLayout>
        <SignIn />
      </AppLayout>
    )
  },
  
  {
    path: '/admin',
    element: <AdminLayout />,
    children:[
      {
        path: '/admin',
        element: <AdminDashboard />
      },
      {
        path: '/admin/sellers',
        element: <ProductForm />
      },
      {
        path:'/admin/users',
        element:<CentralAdminDashboard/>
      }, {
        path:'/admin/products',
      }
    ]
  }, 
  {
    path: '/seller-panel',
    element: <SellerAuthProvider> <SellerPanelLayout /> </SellerAuthProvider> ,
    children:[
      {
        path: '/seller-panel',
        element: <SellerDashboard />
      },
      {
        path: '/seller-panel/add-product',
        element: <ProductForm />
      },
      {
        path:'/seller-panel/reviews',
        //add element
      }, {
        path:'/seller-panel/products',
        //add element
      },
       {
        path:'/seller-panel/orders',
        //add element
      }, {
        path:'/seller-panel/notifications',
        //add element
      },
      {
        path:"/seller-panel/inbox"
        //add element
      }, 
      {
        path:"/seller/login",
        element: <SellerSignIn></SellerSignIn>
      }
    ]
  }, 
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
