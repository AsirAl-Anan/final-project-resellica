import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import { useContext } from 'react';


const AppLayout = ({ children }) => {
  const {user} = useContext(AuthContext);
  const {userData} = useContext(UserContext);
  const navigation = useNavigation(); // Hook to detect navigation state
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
      {loading && <TopBarProgress />}
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CheckUser >  <Feed /> </CheckUser>
      },
     
      {
        path: '/user/:email',
        element: <CheckUser><Profile /> </CheckUser> 
      },
      {
        path: '/videos/:videoId',
        element: <VideoPage />
      },
      {
        path:'/history',
        element:<HistoryPage/>
      }, {
        path: '/subscribedFeed',
        element: <SubscribedFeed />
      }
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
  {
    path: '/studio/dashboard/',
    element: <StudioDashboard />,
    
  }
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
