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
} from '@tanstack/react-query';

const SellerContext = createContext(null);

const SellerAuthProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [dbSeller, setDbSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(true);
  const [message, setMessage] = useState('');

  const auth = getAuth(firebaseApp);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      setSeller(user);
      console.log("state: ",user)
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);
  

  // Sign up new users
  const signupBussinessAccount = async (email, password, bussinessName, country) => {
    try {
      setEmailVerifying(false);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (bussinessName) {
        await updateProfile(userCredential.user, { displayName: bussinessName });
      }

      const localUser = userCredential.user;
      await sendEmailVerification(localUser);
      setEmailVerificationSent(true);
      setEmailVerifying(true);

      const checkEmailVerification = async () => {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) return;

          await reload(currentUser);

          if (currentUser.emailVerified) {
            setEmailVerificationSent(false);
            setEmailVerifying(false);
            setMessage('Email verified and business account created successfully');

            const response = await api.post("/sellers/api/v1/register", {
              email,
              bussinessName,
              country,
              password,
            }, { credentials: 'include' });

            if (!currentUser.photoURL && response.data.data.avatar) {
              await updateProfile(currentUser, {
                photoURL: response.data.data.avatar
              });
            }
            setLoading(false);
            return response;
          } else {
            // Continue polling if email isn't verified
            setLoading(false);
            setTimeout(checkEmailVerification, 5000);
          }
        } catch (error) {
          if (error.code === 'auth/user-token-expired') {
            // Stop polling if token expired
            setEmailVerifying(false);
            setError('Email verification session expired. Please sign in again.');
            return;
          }
          console.error('Email verification check failed:', error);
        }
      };

      checkEmailVerification();

      // Separate timeout for account deletion
      setTimeout(() => {
        const currentUser = auth.currentUser;
        if (currentUser && !currentUser.emailVerified) {
          deleteUser(currentUser);
        }
      }, 300000); // 5 minutes

      return userCredential.user;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailVerifying(true);
        setError("This email is already in use. Please try another.");
      } else if (error.code === "auth/weak-password") {
        setEmailVerifying(true);
        setError("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        setEmailVerifying(true);
        setError("Invalid email address. Please check and try again.");
      } else {
        setEmailVerifying(true);
        setError("An error occurred during sign-up. Please try again.");
      }
    }
  };

  // Sign in existing users
  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await api.post("/sellers/api/v1/login", {
        email,
        password,
      }, { credentials: 'include' });

      if (response.status === 200) {
        setDbSeller(response.data.data);
        setMessage("Login successful");
      }

      return userCredential.user;
    } catch (err) {
      // Error handling...
    } finally {
      setLoading(false);
    }
  };

  // Sign out users
  const signout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
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
    seller,
    emailVerificationSent,
    loading,
    error,
    signin,
    signout,
    message,
    emailVerifying,
    setError,
    dbSeller,
    signupBussinessAccount
  };

  console.log(loading);
  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>loading</div> : children}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerAuthProvider };