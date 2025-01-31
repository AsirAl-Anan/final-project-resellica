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

const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {

  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false)
  const [emailVerifying, setEmailVerifying] = useState(true)
  const [message , setMessage] = useState('')
  const [dbUser, setDbUser] = useState(null)

  
  const auth = getAuth(firebaseApp);
 
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
       
          const fetchUserData = async () => {
            if (user) {
              try {
                const response = await api.get("/users/api/v1/get-user-data");
                console.log(response);
                if (response.status === 200) {
                  setDbUser(response.data.data);
                }
              } catch (error) {
                console.error("Error fetching user data:", error);
              }
            }
        } 
        fetchUserData()
        setUser(user);
      console.log("state: ",user)
      setLoading(false);
      }
      
    });

    return unsubscribe;
  }, [auth]);
  
   console.log(user)

  // Sign up new users

  const signup = async (email, password, username ,fullname) => {
    try {
      setEmailVerifying(false);
    setError(null);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (username) {
      await updateProfile(userCredential.user, { displayName: username });
    }

    const localUser = userCredential.user;
    await sendEmailVerification(localUser);
    setEmailVerificationSent(true);
    setEmailVerifying(true);
    
    // Modified email verification check
    const checkEmailVerification = async () => {
      try {
        // Get fresh user instance before checking
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        
        await reload(currentUser);
        
        if (currentUser.emailVerified) {
          setEmailVerificationSent(false);
          setEmailVerifying(false);
          setMessage('Email verified and account created successfully');
          
          const response = await api.post("/users/api/v1/register", {
            email,
            username,
            fullname,
            password,
          }, {credentials: 'include'});
          
          if (!currentUser.photoURL && response.data.data.avatar) {
            await updateProfile(currentUser, { 
              photoURL: response.data.data.avatar 
            });
          }
          return response;
        } else {
          // Continue polling if email isn't verified
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
        setEmailVerifying(true)
        setError("This email is already in use. Please try another.");
      } else if (error.code === "auth/weak-password") {
        setEmailVerifying(true)
        setError("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        setEmailVerifying(true)
        setError("Invalid email address. Please check and try again.");
      } else {
        setEmailVerifying(true)
        setError("An error occurred during sign-up. Please try again.");
      }
    }
  };
  // Sign in existing users
  const signin = async (email, password,) => {
    try {
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const response = await api.post("/users/api/v1/login", {
        email,
        password,
      }, {credentials: 'include'});
      
      if(response.status === 404){
        setError("User not found")
      }
      if(response.status === 403){ 
        setError("Incorrect password")
      }
      if(response.status === 200){
        setDbUser(response.data.data)
        setMessage("Login successful")
      }
  
      return userCredential.user;
    } catch (err) {
      // Handle Firebase authentication errors
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection');
          break;
        case 'auth/user-mismatch':
          setError('User mismatch');
          break;
        case "auth/invalid-credential":
          setError('Invalid email or password');
          break;
        default:
          setError('An error occurred during sign in. Please try again');
      }
      throw err;
    }
  };
  // Sign out users
  const signout = async () => {
    try {
      setError(null);
      await api.post('/users/api/v1/logout')
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user's password
  const updateUserPassword = async (newPassword) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updatePassword(user, newPassword);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user's email
  const updateUserEmail = async (newEmail) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updateEmail(user, newEmail);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user's profile
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await updateProfile(user, updates);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Resend verification email
  const resendVerificationEmail = async () => {
    try {
      setError(null);
      if (!user) throw new Error('No user logged in');
      await sendEmailVerification(user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  
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
   
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>loading</div> : children}
    </AuthContext.Provider>
  );

};

export { AuthContext, AuthProvider };