import axios from 'axios';
import useAuth from '../hooks/useAuth'
import nextCookies from 'next-cookies'
// axios.defaults.withCredentials = true
// import { useState } from 'react'
function AddLanguages({ languages}) {
  console.log(languages);
  const { IsLoggedIn, getAuthHeaders } = useAuth()
// display old languages first 
//   const [toggle, setToggle] = useState(false)
//   const [loading, setLoading] = useState()
  async function handleClick(id) {
    const headers = getAuthHeaders()
    try {
      const response = await axios.post('http://localhost:3000/userlangs', {
        language_id: id, }, {
        headers: headers
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  console.log(getAuthHeaders())
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
      {languages.length > 0 ? languages.map((language) => (
        <div
          onClick={() => handleClick(language.id)}
          key={language.id}
          className="index_item_container"
        >
          <p>{language.language}</p>
          {language.is_currently_learning && <button>peut-etre</button>}
        </div>
      )): <p>uhoh it looks like there's an error</p>
    }
    </div>
  );
}

export default AddLanguages;

// user language here input into id - 1 spot
// if headers route to normal route
// else route to just new languages for un logged in users
export async function getServerSideProps(ctx) {
  const cookies = nextCookies(ctx)
 
  const authTokens = cookies.authTokens ? cookies.authTokens : {};

  const authHeaders = {
    'access-token': authTokens['access-token'],
    client: authTokens.client,
    expiry: authTokens.expiry,
    uid: authTokens.uid,
    'token-type': authTokens['token-type'],
  };
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
