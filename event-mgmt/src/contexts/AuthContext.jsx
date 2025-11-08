import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSessionWarning, setShowSessionWarning] = useState(false);


   const logoutTimerRef = useRef(null);
    const warningTimerRef = useRef(null);


useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        //to millisecond
     if (decoded.exp * 1000 > Date.now()) {
          setAuthToken(storedToken);
          setUser(decoded);
          scheduleAutoLogout(decoded.exp);
        } else {
           console.log('Token expired or invalid. Removing from localStorage.');
          localStorage.removeItem('authToken');
        }
      } catch (err) {
        console.error('Failed to decode token or invalid token:', err);
        localStorage.removeItem('authToken'); // Invalid token
      }
    }
     setLoading(false);
  }, []);


  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decoded = jwtDecode(token);
    setAuthToken(token);
    setUser(decoded);
    scheduleAutoLogout(decoded.exp);
  };


  const logout = () => {
    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
    setShowSessionWarning(false);
  };
    
    const scheduleAutoLogout = (exp) => {
    const expiryMs = exp * 2000 - Date.now();
    const warningBeforeMs = 60* 1000; //  minute before expiry


    if (expiryMs <= 0) {
      logout();
    } else {                   //scheduler
      logoutTimerRef.current = setTimeout(logout, expiryMs);


      if (expiryMs > warningBeforeMs) {
        warningTimerRef.current = setTimeout(() => {
          setShowSessionWarning(true);
        }, expiryMs - warningBeforeMs);
      }
    }
  };


   const isAuthenticated = !!authToken;


  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, isAuthenticated, loading, showSessionWarning, setShowSessionWarning }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
