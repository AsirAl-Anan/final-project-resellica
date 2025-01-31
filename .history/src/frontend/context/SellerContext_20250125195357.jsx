import { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
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
  const [message, setMessage] = useState('');

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (seller) => {
      if (seller) {
        setSeller(seller);
        try {
          // If email is not verified, don't proceed with database fetch
          if (!seller.emailVerified) {
            setEmailVerificationSent(true);
            return;
          }

          const response = await api.get("/sellers/api/v1/get-seller-data");
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

  const signin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      let sellerCredential = await signInWithEmailAndPassword(auth, email, password);
      let currentSeller = sellerCredential.user;
      const sellerResponse = await api.get('/sellers/api/v1/get-seller', {email})
      if( sellerResponse.status === 404){
        setError('Seller not found')
        
        return null
      }
      if(sellerResponse.status === 200)
      if (!currentSeller.emailVerified) {
        await sendEmailVerification(currentSeller);
        setEmailVerificationSent(true);
        return null;
      }

      const response = await api.post("/sellers/api/v1/login", {
        email,
        password,
      }, { credentials: 'include' });

      if (response.status === 200) {
        setDbSeller(response.data.data);
        setMessage("Login successful");
      }

      return sellerCredential.user;
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setError(null);
      await signOut(auth);
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
    dbSeller,
    setEmailVerificationSent
  };

  return (
    <SellerContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </SellerContext.Provider>
  );
};

export { SellerContext, SellerAuthProvider };