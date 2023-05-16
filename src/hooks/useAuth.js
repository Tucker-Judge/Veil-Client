import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedTokens = Cookies.get('authTokens');
    if (storedTokens) {
      setIsLoggedIn(true);
    }
    const admin = Cookies.get('isAdmin');
    if (admin) {
      setIsAdmin(admin === 'true'); // Ensure that admin status is properly set
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

        // Store admin status in cookie and state
        const adminStatus = response.data.data.is_admin;
        Cookies.set('isAdmin', adminStatus, { expires: 7 });
        setIsAdmin(adminStatus);

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Invalid email or password');
    }
  };

  const logout = async () => {
    try {
      const authHeaders = getAuthHeaders();
      if (authHeaders) {
        await axios.delete('http://localhost:3000/auth/sign_out', {
          headers: {
            ...authHeaders,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Remove the tokens and admin status from cookies and reset the states
      Cookies.remove('authTokens');
      Cookies.remove('isAdmin');
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const getAuthHeaders = () => {
    const authTokensStr = Cookies.get('authTokens');
    if (authTokensStr) {
      const authTokens = JSON.parse(authTokensStr);
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
    isAdmin,
    login,
    logout,
    getAuthHeaders,
  };
};

export default useAuth;
