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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSeller(user);
        try {
          const response = await api.get('/users/api/v1/get-user-data');
          if (response.status === 200) {
            setDbSeller(response.data.data[0]);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setSeller(null);
        setDbSeller(null);
      }
      setLoading(false); // Ensure loading is false after initial check
    });

    return () => unsubscribe();
  }, []);

  const signupBussinessAccount = async (email, password, bussinessName, country) => {
    try {
      setEmailVerifying(false);
      setError(null);
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (bussinessName) {
        await updateProfile(userCredential.user, { displayName: bussinessName });
      }

      const localUser = userCredential.user;
      await sendEmailVerification(localUser);
      setEmailVerificationSent(true);

      const checkEmailVerification = async () => {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) return;

          await reload(currentUser);

          if (currentUser.emailVerified) {
            setEmailVerificationSent(false);
            setEmailVerifying(false);
            setMessage('Email verified and business account created successfully');

            const response = await api.post(
              '/sellers/api/v1/register',
              { email, bussinessName, country, password },
              { credentials: 'include' }
            );

            if (!currentUser.photoURL && response.data.data.avatar) {
              await updateProfile(currentUser, { photoURL: response.data.data.avatar });
            }
          } else {
            setTimeout(checkEmailVerification, 5000);
          }
        } catch (error) {
          console.error('Email verification check failed:', error);
        }
      };

      checkEmailVerification();
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await api.post('/sellers/api/v1/login', { email, password }, { credentials: 'include' });

      if (response.status === 200) {
        setDbSeller(response.data.data);
        setMessage('Login successful');
      }

      return userCredential.user;
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'An error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      setSeller(null);
      setDbSeller(null);
    } catch (err) {
      console.error('Sign-out error:', err);
      setError(err.message || 'Failed to sign out.');
    }
  };

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

  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerAuthProvider };
