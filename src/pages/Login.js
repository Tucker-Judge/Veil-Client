
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles/Login.module.css';
import { useTranslation } from 'next-i18next';
import useAuth from '../hooks/useAuth';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
function LoginPage({ facts, random}) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFact, setCurrentFact] = useState(null);
  const [passwordType, setPasswordType] = useState('password');
 
  const { t } = useTranslation('login')
  // make context to use in Navbar as well
  const { login, isLoggedIn } = useAuth();

  useEffect(()=> {
    let num = Math.floor(Math.random() * facts.length)
    console.log((facts[num].description.length))
    setTimeout(() => {
      setCurrentFact(num)
    }, facts[num].description.length / 30);
    return
  },currentFact,facts, isLoggedIn)


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
      setErrorMessage('Invalid email or password');
    }
  };

  function handleType() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  }
  function handleGoToDashboard(){
    router.push('/')
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Login Form */}
        {isLoggedIn ? (
          <div>
            <p>{t('AlreadyLoggedIn')}</p>
            <button onClick={handleGoToDashboard}>{t('GoToDashboard')}</button>
          </div>
        ):(
          <>
          <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.input}>
            <label htmlFor="email"></label>
            <div className={styles.inputContainer}>

            <FontAwesomeIcon className={styles.passwordIcon}icon={faEnvelope} />
            <input
              id="email"
              type="email"
              value={email}
              placeholder={t('Email')}
              onChange={(event) => setEmail(event.target.value)}
              />
              {email.length > 0 && (
                <button className = {styles.showHideButton} onClick = {()=>setEmail('')}>X</button>
                )}
                </div>
          </div>
          <div className={styles.input}>
            <label htmlFor="password"></label>
            <div className={styles.inputContainer}>
            <FontAwesomeIcon className= {styles.passwordIcon}icon={faKey} />
              <input
                id="password"
                type={passwordType}
                value={password}
                placeholder={t('Password')}
                onChange={(event) => setPassword(event.target.value)}
                />
              <button
                type="button"
                className={styles.showHideButton}
                onClick={handleType}
                >
                {passwordType === 'password' ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
              </button>
             
            </div>
            <p><a className={styles.forgotPassword}>{t("ForgotPassword")}</a></p>
          </div>
          <div className={styles.checkboxInput}>
            <label htmlFor="remember-me">{t("RememberMe")}:</label>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              />
          </div>
          <button disabled={email.includes('@') && password.length > 0 ? false : true} className={styles.button} type="submit">
            {t('Login')}
          </button>
          {errorMessage && (
            <p className={styles.error}>{errorMessage}</p>
            )}
        </form>
              <div>
                <p><span>---- or log in with ----</span></p>
                <div className = {styles.OAuth}>
                  <button><Image height = "50" alt = "Apple Logo"width="50"src = "/Logo - SIWA - Left-aligned - Black - Medium.svg"/></button>
                  <button><Image height = "50" alt = "Apple Logo"width="50"src = "/btn_google_signin_light_focus_web.png"/></button>
                  <button><Image height = "50" alt = "Apple Logo"width="50"src = "/f_logo_RGB-Blue_58.png"/></button>
                </div>
              </div>
            </>
          )}

        {/* End of Login Form */}

        <div className={styles.facts}>
          <p>{t("FunFacts")}</p>
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
    </div>
  );
}

export default LoginPage;

import fs from 'fs';
import path from 'path';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ req }) {
  // Extract the Accept-Language header from the request object
  const acceptLanguageHeader = req.headers['accept-language'];

  // Define a function to parse the header and get the preferred language
  const getPreferredLanguage = (header) => {
    const languages = header.split(',').map((lang) => lang.split(';')[0]);
    return languages[0];
  };
  
  // Get the preferred language
  const preferredLanguage = getPreferredLanguage(acceptLanguageHeader).slice(0, 2);

  // Read the JSON file from the public folder
  const filePath = path.join(process.cwd(), 'public', 'locales', preferredLanguage, 'facts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const facts = JSON.parse(fileContents);

  let random = Math.floor(Math.random() * facts.length);

  
  return {
    props: {
      facts,
      random,
      ...(await serverSideTranslations(preferredLanguage, ['navbar', 'login', 'facts'])),
    }
  };
}
