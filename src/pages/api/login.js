import axios from 'axios';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { email, password } = req.body;

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
      const headers = {
        'access-token': response.headers['access-token'],
        client: response.headers['client'],
        expiry: response.headers['expiry'],
        uid: response.headers['uid'],
        'token-type': response.headers['token-type'],
      };

      // Set the HttpOnly cookie
      res.setHeader(
        'Set-Cookie',
        serialize('authTokens', JSON.stringify(headers), {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
      );

      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
  }
}
