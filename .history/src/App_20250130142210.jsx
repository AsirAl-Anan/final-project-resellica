import React, { useState , useEffect} from 'react';
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
import AdminLogin from './frontend/pages/Admin/AdminComponents/AdminLoginPage';
import AddCategory from './frontend/pages/Admin/AddCategory';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SingleProductPage from './frontend/pages/Products/SingeProduct/Product';
const AppLayout = ({ children }) => {
  const {user, dbUser,getUserData ,reloadUserData} = useContext(AuthContext);
  
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    if(user){
     reloadUserData()
    }
  },[user]) 
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
      path: '/category/:id',  // /product will be replaced by :id
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
      },
      {
        path:'/admin/add-category',
        element:<AddCategory />
      },
      

    ]
  }, 
  {
    path:'/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/seller-panel',
    element: <SellerPanelLayout />,
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
     
    ]
  }, 
]);
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
export default App;
