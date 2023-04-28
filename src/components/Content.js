// auth
import nextCookies from 'next-cookies'
import useAuth from '../hooks/useAuth'

// axios
import axios from 'axios';


function Content({id, types, meta}) {
    return (
      <div>
        <h2>Content for {id}</h2>
        {types.map((type) => {
          return (
            <div key = {type.id}>
              <p>{type.card_type}</p>
            </div>
          )
        })}
        <p>{meta.current_page}</p>
      </div>
    );
  }
  
  export default Content;


  // export async function getServerSideProps(){
  //   const cookies = nextCookies(ctx)
  //   const language = ctx.query
  //   console.log(language)
  // const authTokens = cookies.authTokens ? cookies.authTokens : {};

  // const authHeaders = {
  //   'access-token': authTokens['access-token'],
  //   client: authTokens.client,
  //   expiry: authTokens.expiry,
  //   uid: authTokens.uid,
  //   'token-type': authTokens['token-type'],
  // };
  // try {
  //   const response = await axios.get('http://localhost:3000/types', {
  //   headers: {
  //   ...authHeaders,
  //   language: language
  //   }});
  //   const types = await response.json()
  //   console.log(types);
  //   return {
  //     props: {
  //       types
  //     },
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     props: {
  //       types: [],
  //     },
  //   };
  // }
  // }
  