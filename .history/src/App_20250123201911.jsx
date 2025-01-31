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
const AppLayout = ({ children }) => {
  const {user} = useContext(AuthContext);
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
  }, {
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
    element: <AdminLayout />,
    children:[
      {
        path: '/seller-panel',
        element: <AdminDashboard />
      },
      {
        path: '/seller-panel/add-product',
        element: <ProductForm />
      },
      {
        path:'/seller-panel/reviews',
        element:<CentralAdminDashboard/>
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
