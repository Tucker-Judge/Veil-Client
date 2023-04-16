import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function LoginPage({facts}) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState([]);
  console.log(facts)
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200){
        console.log(response.data)
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
      <p>{facts[0].sentence}</p>
      </form>
 )  
}
export default LoginPage

export async function getStaticProps() {
  const res = await fetch('http://localhost:3002/languageFacts.json');
  const facts = await res.json();
  console.log(facts)
  return {
    props: {
      facts,
    },
  };
}
