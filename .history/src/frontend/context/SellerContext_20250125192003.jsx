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

const SellerContext = createContext(null);

const SellerAuthProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [dbSeller, setDbSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(true);
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const auth = getAuth(firebaseApp);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (seller) => {
      if (seller) {
        setSeller(seller);
        try {
          const response = await api.get("/sellers/api/v1/get-seller-data", {});
          if (response.status === 200) {
            setDbSeller(response.data.data[0]);
          }
        } catch (error) {
          console.error("Error fetching seller data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSeller(null);
        setDbSeller(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Sign up new sellers
  const signupBussinessAccount = async (email, password, bussinessName, country) => {
    try {
      setEmailVerifying(false);
      setError(null);
      const sellerCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (bussinessName) {
        await updateProfile(sellerCredential.seller, { displayName: bussinessName });
      }

      const localSeller = sellerCredential.seller;
      await sendEmailVerification(localSeller);
      setEmailVerificationSent(true);
      setEmailVerifying(true);

      const checkEmailVerification = async () => {
        try {
          const currentSeller = auth.currentUser;
          if (!currentSeller) return;

          await reload(currentSeller);

          if (currentSeller.emailVerified) {
            setEmailVerificationSent(false);
            setEmailVerifying(false);
            setMessage('Email verified and business account created successfully');

            const response = await api.post("/sellers/api/v1/register", {
              email,
              bussinessName,
              country,
              password,
            }, { credentials: 'include' });

            if (!currentSeller.photoURL && response.data.data.avatar) {
              await updateProfile(currentSeller, {
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
          if (error.code === 'auth/seller-token-expired') {
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
        const currentSeller = auth.currentUser;
        if (currentSeller && !currentSeller.emailVerified) {
          deleteUser(currentSeller);
        }
      }, 300000); // 5 minutes

      return sellerCredential.seller;
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

  // Sign in existing sellers
  const signin = async (email, password, verificationCode) => {
    try {
      setLoading(true);
      setError(null);
      setEmailVerifying(false);

      const sellerCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify email verification status
      const currentSeller = auth.currentUser;
      if (!currentSeller.emailVerified) {
        setEmailVerifying(true);
        setError('Please verify your email before signing in');
        return null;
      }

      // Verify database registration and verification code
      const response = await api.post("/sellers/api/v1/login", {
        email,
        password,
        verificationCode
      }, { credentials: 'include' });

      if (response.status === 200) {
        setDbSeller(response.data.data);
        setMessage("Login successful");
        setEmailVerificationSent(false);
        setEmailVerifying(false);
      } else {
        setEmailVerificationSent(false)
        setError("Login failed. Please check your credentials.");
        return null;
      }

      return sellerCredential.seller;
    } catch (err) {
      setEmailVerifying(true);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError("Invalid credentials. Please try again.");
            break;
          case 403:
            setError("Account not found or not verified.");
            break;
          default:
            setError("An error occurred during login. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Sign out sellers
  const signout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setDbSeller(null);
      setSeller(null);
    } catch (err) {
      setError(err.message);
      throw err;
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
    verificationCode,
    setVerificationCode
  };

  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerAuthProvider };