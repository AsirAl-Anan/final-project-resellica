import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import { useContext } from 'react';
import Home from './frontend/pages/Home';
import { AuthContext } from './frontend/context/AuthContext';
import { ToastContainer ,Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegisterPage from './frontend/pages/Auth/UserRegisterPage';
import BussinessRegisterPage from './frontend/pages/Auth/BussinessRegisterPage';
import Dashboard from './frontend/pages/Admin/SellerDashboard';
import ProductForm from './frontend/pages/Admin/AddProduct';
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
      //children routes
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
    element: <Dashboard />
  }, {
    path: '/addProduct',
    element: <ProductForm />
  }
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
