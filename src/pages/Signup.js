import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Signup.module.css';
import Link from 'next/link'
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


function Signup() {
  // get primary language
  const [browserLanguage, setBrowserLanguage] = useState(typeof navigator !== 'undefined' ? navigator.language.slice(0,2) : 'en');
  const [type, setType] = useState('password')
  const [confirmType, setConfirmType] = useState('password')

  // first username, second and third passwords, 4th email 
  const [error, setError] = useState(['','','',''])

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    language: browserLanguage,
  });
  
  // handle form data changes
  const handleChange =(event) => {
    const {name,value} = event.target
    setFormData((prevState)=> ({
      ...prevState,
      [name]: value
  }))
  }
  const validateForm = (formdata) => {
    console.log(error)
    let errorCopy = ['','','','']
    const hasNumber = /\d/;
    let idx = 0
    for (const key in formdata) {

      if(formdata[key] === "" || formdata[key] === undefined){
        errorCopy[idx] = `${key} is not valid`
        // setError(`${key} is not valid`)
        // return false
      }
      idx++
    }
    if(!formdata.email.includes('@')){
      // setError("Is that sposed to be a valid email address?")
      errorCopy[3] = "Is that sposed to be a valid email address?"
    }
    if(formdata.password !== formdata.passwordConfirmation){
      errorCopy[2] = "Passwords do not match"
      // setError('Passwords do not match')
      // return false
    }
    if(formdata.password.length < 6){
      errorCopy[1] = "Password too short"
      // setError('Password too short')
      // return false
    }
    // if(hasNumber.test(formdata.password)){
    //   errorCopy[2] = "Password does not include a number"
    //   // setError("Please include a number")
    // }
    if(errorCopy.some((item) => item !== '')){
      setError(errorCopy)
      return false
    }
    return true
  }
  // post user
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(validateForm(formData) === false){
      return
    }
    try {
      const response = await axios.post('http://localhost:3000/signup', formData)
      console.log(response.data)
    }
    catch (err) {
    console.error(err)
    }
  }

// handle show password
function handleType(stateName){
  if (stateName === 'password') {
    setType((prevType) => prevType === 'password' ? 'text' : 'password')
  }
  else if (stateName === 'passwordConfirmation') {
    setConfirmType((prevType) => prevType === 'password' ? 'text' : 'password')
  }
}
  return (
    <div className={styles.container}>
    <form className = {styles.form} onSubmit={handleSubmit}>
      <label>Username</label>
        <input
          type="text"
          name="username"
          className={formData.username ? styles.coolcola:''}
          value={formData.username}
          onChange={(e) => handleChange(e)}
          />
        {error[0] && <p>{error[0]}</p>}
<label>Email</label>
  <input
    type="email"
    name="email"
    className={formData.email ? styles.coolcola:''}
    placeholder="example@example.com"
    value={formData.email}
    onChange={handleChange}
    />
    {error[3] && <p>{error[3]}</p>}
      <label>Password</label>
      <div className={styles.doesthiswork}>
        <input
          type={type}
          name="password"
          className={formData.password ? styles.coolcola:''}
          placeholder='At least 6 characters'
          value={formData.password}
          onChange={(event) => handleChange(event)}
          />
        {error[1] && <p>{error[1]}</p>}
        <button type = "button" className={styles.jadenSmith} onClick = {() => handleType('password')}>
          {type === 'password' ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
        </button>
      </div>
      <label>Re-enter password</label>
      <div className={styles.doesthiswork}>
        <input
          type={confirmType}
          name="passwordConfirmation"
          className={formData.passwordConfirmation ? styles.coolcola:''}
          value={formData.passwordConfirmation}
          onChange={handleChange}
          />
          {error[2] && <p>{error[2]}</p>}
        <button type="button" className={styles.jadenSmith} onClick = {() => handleType('passwordConfirmation')}>
          {confirmType === 'password' ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
        </button>
          </div>
      {/* <label>First Language:</label>
        <select 
        name = "language"
        value={browserLanguage} 
        onChange={(e)=> setBrowserLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select> */}
      
      <button type="submit">Continue</button>
    </form>
    <div className = {styles.afterForm}>
      <p>By creating an account, you agree to Veil's <a>Conditions of Use</a> and <a>Privacy Notice.</a></p>
    </div>
    <div className = {styles.login}>
      <p>Already have an account? <Link href="/login">Sign in</Link></p>
    </div>
          </div>

  );
}

export default Signup


// function convertBrowserLanguageToName(langCode) {
//   const firstTwo = langCode.toFixed(2);
//   const languageMapping = {
//     'en': 'English',
//     'es': 'Spanish',
//     'fr': 'French',
//   };

//   return languageMapping[firstTwo] || 'Unknown language';
// }

// // automatically put the browser language in input form