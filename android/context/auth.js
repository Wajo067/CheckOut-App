import { createContext, useContext, useState,useEffect} from "react";
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
    }

    useEffect(() => {
      auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside the AuthProvider");
    }

    return context;
  };