
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedTokens = Cookies.get('authTokens');
    if (storedTokens) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/sign_in',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        // Extract the headers
        const headers = {
          'access-token': response.headers['access-token'],
          client: response.headers['client'],
          expiry: response.headers['expiry'],
          uid: response.headers['uid'],
          'token-type': response.headers['token-type'],
        };

        // Store the headers in cookies and set the expires property to 7 days
        Cookies.set('authTokens', JSON.stringify(headers), { expires: 7 });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Invalid email or password');
    }
  };

  const logout = () => {
    // Remove the tokens from cookies
    Cookies.remove('authTokens');
    setIsLoggedIn(false);
  };

  const getAuthHeaders = () => {
    const authTokens = Cookies.getJSON('authTokens');
    if (authTokens) {
      return {
        'access-token': authTokens['access-token'],
        client: authTokens.client,
        expiry: authTokens.expiry,
        uid: authTokens.uid,
        'token-type': authTokens['token-type'],
      };
    }
    return null;
  };

  return {
    isLoggedIn,
    login,
    logout,
    getAuthHeaders,
  };
};

export default useAuth;