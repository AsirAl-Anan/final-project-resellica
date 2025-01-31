import { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  updateEmail,
  updateProfile,
  onAuthStateChanged,
  reload,
  deleteUser,
  
} from 'firebase/auth';
import firebaseApp from '../../firebase/config.js';
import api from '../../server/utils/axios.js';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const SellerContext = createContext(null);



const SellerAuthProvider = ({ children }) => {

  
  const [seller, setSeller] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [message , setMessage] = useState('')
  const [dbUser, setDbUser] = useState(null)

  
  const auth = getAuth(firebaseApp);
 
  // Listen for auth state changes
 

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await api.get("/users/api/v1/get-user-data");
          console.log(response);
          if (response.status === 200) {
            setDbUser(response.data.data[0]); // Update dbUser
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    
    fetchUserData();
  }, [user]); // Only run when `user` changes
  
  
   const value = {
    user,
    emailVerificationSent,
    loading,
    error,
    signup,
    signin,
    signout,
    resetPassword,
    updateUserPassword,
    updateUserEmail,
    updateUserProfile,
    resendVerificationEmail,
    message,
    emailVerifying,
    setError,
    dbUser,
    signupBussinessAccount
  };

  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>loading</div> : children}
    </SellerContext.Provider>
  );

};

export { SellerContext, SellerAuthProvider };