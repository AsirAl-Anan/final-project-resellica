import { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  reload,
  deleteUser,
} from 'firebase/auth';
import firebaseApp from '../../firebase/config.js';
import api from '../../server/utils/axios.js';

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

  // // Listen for auth state changes
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setSeller(user); // Set the user in state if logged in
  //       try {
  //         const response = await api.get('/users/api/v1/get-user-data'); // Fetch additional user data
  //         if (response.status === 200) {
  //           setDbSeller(response.data.data[0]); // Update dbSeller state
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user data:', error); // Handle error fetching data
  //       }
  //     } else {
  //       setSeller(null); // Clear seller state if not logged in
  //       setDbSeller(null); // Clear dbSeller state
  //     }
  //     setLoading(false); // Set loading to false after checking auth state
  //   });

  //   return () => unsubscribe(); // Cleanup listener on unmount
  // }, []);

  // Sign up new users
  const signupBussinessAccount = async (email, password, bussinessName, country) => {
    try {
      setEmailVerifying(false); // Reset email verifying state
      setError(null); // Clear errors
      setLoading(true); // Set loading while processing

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with business name if provided
      if (bussinessName) {
        await updateProfile(userCredential.user, { displayName: bussinessName });
      }

      const localUser = userCredential.user;
      await sendEmailVerification(localUser); // Send verification email
      setEmailVerificationSent(true); // Indicate verification email sent

      const checkEmailVerification = async () => {
        try {
          const currentUser = auth.currentUser; // Get the current user
          if (!currentUser) return;

          await reload(currentUser); // Reload the current user

          if (currentUser.emailVerified) {
            // If email verified
            setEmailVerificationSent(false); // Clear verification sent state
            setEmailVerifying(false); // Clear email verifying state
            setMessage('Email verified and business account created successfully');

            // Register business account in database
            const response = await api.post(
              '/sellers/api/v1/register',
              { email, bussinessName, country, password },
              { credentials: 'include' }
            );

            // Update user profile picture if provided by server
            if (!currentUser.photoURL && response.data.data.avatar) {
              await updateProfile(currentUser, { photoURL: response.data.data.avatar });
            }
          } else {
            // Poll for email verification if not verified yet
            setTimeout(checkEmailVerification, 5000);
          }
        } catch (error) {
          console.error('Email verification check failed:', error); // Handle errors in verification polling
        }
      };

      checkEmailVerification(); // Start verification polling
    } catch (error) {
      console.error('Error during signup:', error); // Log error
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  // Sign in existing users
  const signin = async (email, password) => {
    try {
      setLoading(true); // Set loading while processing
      setError(null); // Clear errors

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await api.post('/sellers/api/v1/login', { email, password }, { credentials: 'include' });

      if (response.status === 200) {
        setDbSeller(response.data.data); // Update seller data from server
        setMessage('Login successful'); // Display success message
      }

      return userCredential.user; // Return authenticated user
    } catch (err) {
      console.error('Login failed:', err); // Log error
      setError(err.message || 'An error occurred during sign-in.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  // Sign out users
  const signout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setSeller(null); // Clear seller state
      setDbSeller(null); // Clear dbSeller state
    } catch (err) {
      console.error('Sign-out error:', err); // Log error
      setError(err.message || 'Failed to sign out.'); // Set error message
    }
  };

  // Define the context value
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
    signupBussinessAccount,
  };

  console.log(loading); // Debugging: Log loading state

  // Return the context provider
  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children} {/* Show loading state or children */}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerAuthProvider };
