import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './Login.module.css';

function LoginPage({ facts, random }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState([]);
  const [currentFact, setCurrentFact] = useState(null);
  const [passwordType, setPasswordType] = useState('password');

  // render random fact every 7 seconds
  useEffect(() => {
    setInterval(() => {
      setCurrentFact(Math.floor(Math.random() * facts.length));
    }, 10000);

  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/login',
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
        // route to home user page
        console.log(response.data);
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  function handleType() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.input}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password:</label>
          <div className={styles.inputContainer}>
            <input
              id="password"
              type={passwordType}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className={styles.showHideButton}
              onClick={handleType}
            >
              {passwordType === 'password' ? 'Show' : 'Hide'}
            </button>
          </div>
          <p><a>Forgot your password?</a></p>
        </div>
        <div className={styles.checkboxInput}>
          <label htmlFor="remember-me">Remember me:</label>
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
        </div>
        <button className={styles.button} type="submit">
          Login
        </button>
        {errorMessage && (
          <p className={styles.error}>{errorMessage}</p>
        )}
      </form>
      <div className={styles.facts}>
        <p>Fun Facts</p>
        {currentFact ? (
          <>
            <p>{facts[currentFact].sentence}</p>
            <p>{facts[currentFact].description}</p>
          </>
        ) : (
          <>
            <p>{facts[random].sentence}</p>
            <p>{facts[random].description}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

export async function getStaticProps() {
  const res = await fetch('http://localhost:3002/languageFacts.json');
  const facts = await res.json();
  let random = Math.floor(Math.random() *facts.length)
  return {
    props: {
      facts,
      random
    },
  };
}