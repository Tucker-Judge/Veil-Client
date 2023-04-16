import { useState, useEffect } from 'react';
import axios from 'axios'

function Signup() {
  // get primary language
  const [browserLanguage, setBrowserLanguage] = useState(navigator.language.slice(0,2) || 'en')
  const [type, setType] = useState('password')
  const [confirmType, setConfirmType] = useState('password')
  // useEffect(()=> {
  //   setBrowserLanguage(navigator.language.slice(0,2) || 'en')
  //   console.log(navigator.language)
  // },[])

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

  // post user
  const handleSubmit = async(event) => {
    event.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Password:
        <input
          type={type}
          name="password"
          value={formData.password}
          onChange={(event) => handleChange(event)}
        />
        <button type = "button" onClick = {() => handleType('password')}>
          {type ? "Show" : "Hide"}
        </button>
      </label>
      <label>
        Password Confirmation:
        <input
          type={confirmType}
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        <button type="button" onClick = {() => handleType('passwordConfirmation')}>
          {confirmType ? "Show" : "Hide"}
        </button>
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        First Language:
        <select 
        name = "language"
        value={browserLanguage} 
        onChange={handleChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: 'en' } },
      { params: { locale: 'de' } },
      { params: { locale: 'fr' } },
    ],
    fallback: false,
  };
}
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