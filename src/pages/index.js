
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
function Home() {
const {t} = useTranslation('common')

  return (
    <div>
      <Link href="/Signup">
      <button> Sign up! </button>
      </Link>
        <p>{t('title')}</p>
        <p>Hello je suis la</p>

        </div>

  )
  }

  
  export default Home  
  export async function getServerSideProps(context) {
    const { req, res } = context;
    const sessionCookie = req.cookies.session;
  
    if (sessionCookie) {
      try {
        const response = await axios.post('http://localhost:3000/sessions/validate', {
          session_cookie: sessionCookie,
        });
  
        if (response.data && response.data.valid) {
          // User is valid
          res.statusCode = 302; // redirection
          res.setHeader('Location', '/home_content'); // redirect to
          res.end(); // complete the redirect
        }
      } catch (error) {
        console.error('Error validating user:', error);
      }
    }
  
    // render the home page normally
    return {
      props: {},
    };
  }