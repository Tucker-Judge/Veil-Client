import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('/api/current_user').then((response) => {
      if (response.data.email) {
        router.push('/protected_page');
      }
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        remember_me: rememberMe,
      });

      if (response.status === 200) {
        router.push('/protected_page');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Remember me:
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Log in</button>
      {errorMessage && <p>{errorMessage}</p>}
 )  
}