import { useState } from 'react';
import axios from 'axios'
import redis from 'redis'
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('');

  const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
  }); 
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
    // post the user and then display a confirmation page until 
    // redis asynchronously tells them they are confirmed
    // then show login page
    // Display a message based on whether the email address has been confirmed
    const redisKey = `user:${response.data.userId}:confirmation_token`;
    redisClient.get(redisKey, (error, confirmationToken) => {
      if (error) {
        setMessage('Error checking confirmation status');
      } else if (confirmationToken) {
        setMessage('Your email address has been confirmed. Please log in.');
      } else {
        setMessage('Please check your email to confirm your email address.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Password Confirmation:
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        First Language:
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="">-- Select a language --</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup