import { createContext, useCallback, useState, useEffect } from 'react';
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

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(true);
  const [message, setMessage] = useState('');
  const [dbUser, setDbUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const auth = getAuth(firebaseApp);
  const [shouldReloadUserData, setShouldReloadUserData] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      const response = await api.get("/users/api/v1/get-user-data");
      if (response.status === 200) {
        setDbUser(response.data.data);
        setShouldReloadUserData(false);
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setShouldReloadUserData(false);
    }
  }, []);

  const fetchAdminData = useCallback(async () => {
    try {
      const res = await api.get('/admins/api/v1/dashboard-stats');
      if (res.status === 200) {
        setAdmin(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          setLoading(true);
          await getUserData();
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setUser(currentUser);
          setLoading(false);
        }
      } else {
        setUser(null);
        setDbUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [auth, getUserData]);

  // Fetch user data when `shouldReloadUserData` is true
  useEffect(() => {
    if (shouldReloadUserData && user) {
      getUserData();
    }
  }, [shouldReloadUserData, user, getUserData]);

  // Fetch admin data only when `dbUser` changes and is an admin
  useEffect(() => {
    if (dbUser?.role === "admin") {
      fetchAdminData();
    }
  }, [dbUser, fetchAdminData]);

  const reloadUserData = () => {
    setShouldReloadUserData(true);
  };

  return (
    <AuthContext.Provider
      value={{
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
        getUserData,
        reloadUserData,
        admin,
      }}
    >
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
