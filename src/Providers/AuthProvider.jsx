import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';
import { AuthContext } from '../Contexts/AuthContext';


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Store current user info
  // console.log(user)
  const [loading, setLoading] = useState(true);   // Track loading state during auth check
  const provider = new GoogleAuthProvider();
  // Monitor authentication state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);    // Update user state
      setLoading(false);      // Set loading to false once state is known
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);
	
	//Your features here ...
    // Register new user with email and password
  const registerWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile name and photo
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

//   Login with email and password 
  const loginWithEmailPassword =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

//   Login with Google
  const handelLoginWithGoogle =()=>{
    setLoading(true)
    return signInWithPopup(auth,provider)
  }

	
  // Sign out the current user
  const logout = () => signOut(auth);
  

  // Shared authentication context value
  const authInfo = { user,setUser, loading, logout, registerWithEmailPassword, updateUserProfile,loginWithEmailPassword,handelLoginWithGoogle };

  // Provide authentication info to child components
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

