import nextCookies from 'next-cookies'
import Link from 'next/link'
function UserLanguages({languages}){
// if one language reroute to next page
// page styling will be ads on left and right
// languages represented by flag images with the text over them
console.log(languages)
    return (
        <div>
            <p>nouveau débuts</p>
            {languages.map((language) => {
                return (
                <div key = {language.id}>
                    <Link href={`/language/${language.id}`}>
                        <p>{language.language}</p>
                    </Link>
                </div>
                )
            })}
        </div>
    )
}
export default UserLanguages

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
      const response = await fetch('http://localhost:3000/userlangs', {
      headers: {
      ...authHeaders
      }});
      const languages = await response.json()
    //   filter here
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