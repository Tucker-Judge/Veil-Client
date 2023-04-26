import axios from 'axios';
import useAuth from '../hooks/useAuth'
import nextCookies from 'next-cookies'
// axios.defaults.withCredentials = true
// import { useState } from 'react'
function AddLanguages({ languages,authHeaders }) {
  console.log(languages);
  const { IsLoggedIn, getAuthHeaders } = useAuth()
// display old languages first 
//   const [toggle, setToggle] = useState(false)
//   const [loading, setLoading] = useState()
  async function handleClick(id) {
    try {
      const response = await axios.post('http://localhost:3000/userlangs', {
        language_id: id, }, {
        headers: getAuthHeaders()
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(authHeaders)
//   users association does not show up anymore when index of userlangs is displayed
// update a owned section
async function handleDelete(id) {
    // setLoading(true)
    try {
        const response = await axios.patch('http://localhost:3000/userlangs',{
            language_id: id
        })
        console.log(response)
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className="index_container">
      {languages.map((language) => (
        <div
          onClick={() => handleClick(language.id)}
          key={language.id}
          className="index_item_container"
        >
          <p>{language.language}</p>
          {/* {language.is_currently_learning && <button>peut-etre</button>} */}
        </div>
      ))}
    </div>
  );
}

export default AddLanguages;

// user language here input into id - 1 spot
// if headers route to normal route
// else route to just new languages for un logged in users
export async function getServerSideProps(ctx) {
  const cookies = nextCookies(ctx)
  console.log("cookies:", cookies);
  const authTokens = cookies.authTokens ? cookies.authTokens : {};
  console.log("authTokens:", authTokens);
  const authHeaders = {
    'access-token': authTokens['access-token'],
    client: authTokens.client,
    expiry: authTokens.expiry,
    uid: authTokens.uid,
    'token-type': authTokens['token-type'],
  };
  console.log(authHeaders)
  try {
    const response = await fetch('http://localhost:3000/languages', {
    headers: {
    ...authHeaders
    }});
    const languages = await response.json()
    console.log(languages);
    return {
      props: {
        languages
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        languages: [],
      },
    };
  }
}
