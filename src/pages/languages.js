import nextCookies from 'next-cookies'
import Link from 'next/link'
import { useContext } from 'react'
import { LanguageContext } from '../context/Language'

function UserLanguages({languages}){
// if one language reroute to next page
// page styling will be ads on left and right
// languages represented by flag images with the text over them

const { lang, setLang } = useContext(LanguageContext)
console.log(lang)

    return (
        <div>
            {languages.length > 0 ? languages.map((language) => {
                return (
                <div key = {language.id}>
                    <Link onClick = {() => {setLang(language.language)}} href={`/language/${language.id}`}>
                        <p>{language.language}</p>
                    </Link>
                </div>
                )
            }): <p>this is the part where you get gaslighted</p>
            }
        </div>
    )
}
export default UserLanguages

export async function getServerSideProps(ctx) {
  // moving on!!!!
  // switch from cookies to grabbing headers from browser
    const cookies = nextCookies(ctx)
    const { req } = ctx
   
    const authTokens = cookies.authTokens ? cookies.authTokens : {};
  
    const authHeaders = {
      'access-token': authTokens['access-token'],
      client: authTokens.client,
      expiry: authTokens.expiry,
      uid: authTokens.uid,
      'token-type': authTokens['token-type'],
    };
    try {
      const response = await fetch('http://localhost:3000/userlangs', {
      headers: {
      ...authHeaders
      }});
      const languages = await response.json()
      // if(languages.length === 1){
      //   // console.log(languages);

      // }
    //   filter here
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