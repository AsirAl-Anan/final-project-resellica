import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import RegistrationForm from './frontend/components/RegistrationForm';
import Home from './frontend/components/Home';
import Feed from './frontend/components/Feed';
import Profile from './frontend/components/Profile';
import ErrorPage from './frontend/components/ErrorPage';
import { AuthContext } from './frontend/context/authContext';
import { useContext } from 'react';
import CheckUser from './frontend/components/shared/CheckUser';
import { Slide, ToastContainer } from 'react-toastify';
import LoginForm from './frontend/components/LoginForm';
import StudioDashboard from './frontend/components/studio/Dashboard';
import VideoPage from './frontend/components/videoPage';
import HistoryPage from './frontend/components/HistoryPage';
import SubscribedFeed from './frontend/components/SubscribedFeed'
import UserDataContext, {UserContext} from './frontend/context/userDataContext';
TopBarProgress.config({
  barColors: {
    0: "#ff0000",
    0.5: "#ff9900",
    1.0: "#00ff00",
  },
  shadowBlur: 5,
});

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
