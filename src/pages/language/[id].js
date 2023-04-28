// component imports
import Chatbot from '../../components/Chatbot';
import Review from '../../components/Review';
import Content from '../../components/Content';

// logic imports
import nextCookies from 'next-cookies'
import axios from 'axios'
import {useRouter} from 'next/router'

function Home({types,language}) {
    const router = useRouter()
    const { id } = router.query
    console.log(language)
    console.log(types)
  return (
    <div>
      <h1>Home</h1>
      <Chatbot />
      <Review />
      <Content id={id} types={types.data} meta={types.meta} />
    </div>
  );
}

export default Home;

export async function getServerSideProps(ctx){
  const cookies = nextCookies(ctx)
  const language = ctx.query
  console.log(language)
const authTokens = cookies.authTokens ? cookies.authTokens : {};

const authHeaders = {
  'access-token': authTokens['access-token'],
  client: authTokens.client,
  expiry: authTokens.expiry,
  uid: authTokens.uid,
  'token-type': authTokens['token-type'],
};
try {
  const response = await axios.get('http://localhost:3000/types', {
  headers: {
  ...authHeaders,
},
  params: {
    language: language.id
  }
});
  const types = response.data
  console.log(types);
  return {
    props: {
      types,
      language
    },
  };
} catch (error) {
  console.error(error);
  return {
    props: {
      types: [],
      meta: [],
      language: language
    },
  };
}
}
