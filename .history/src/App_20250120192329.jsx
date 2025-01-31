import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import { useContext } from 'react';
import Home from './frontend/components/Home';
import { AuthContext } from './frontend/context/AuthContext';

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
    // errorElement: <ErrorPage />,
    children: [
      //children routes
    ],
  },
  {
    path: '/register',
    element:  <RegistrationForm /> 
  },
  {
    path: '/login',
    element:  <LoginForm />
  }, 
  
]);

function App() {
  return (
    <>
    <UserDataContext>
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
    </UserDataContext>
     
    </>
  );
}

export default App;
