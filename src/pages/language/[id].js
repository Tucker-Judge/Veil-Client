// component imports
// import Chatbot from '../../components/Chatbot';
import Review from '../../components/Review';
import Content from '../../components/Content';

// logic imports
import nextCookies from 'next-cookies'
import axios from 'axios'
import {useRouter} from 'next/router'
import styles from './Home.module.css'

import { LanguageContext } from '@/context/Language';
import { useContext } from 'react'
import dynamic from 'next/dynamic';
const Chatbot = dynamic(
  () => import('../../components/Chatbot'),
  { ssr: false }
);


function Home({types,language,reviewed}) {
    const router = useRouter()
    const { id } = router.query
    const {lang, setLang} = useContext(LanguageContext)
    console.log(language)
    console.log(lang)
    console.log(types)
  return (
    <div className={styles.homeContainer}>
      {/* <h1>Home</h1> state value of clicked*/}
      <div className={styles.container}>
      <ul className={styles.menu}>
        <li>Chatbot</li>
        <li>Short Stories</li>
      </ul>
      <Chatbot />
      {/* <ShortStories /> */}
      <Content id={id} types={types.data} meta={types.meta} />
      </div>
      <Review reviewed={reviewed}/>
    </div>
  );
}

export default Home;

export async function getServerSideProps(ctx){
  const cookies = nextCookies(ctx)
  const language = ctx.query

  console.log(language)
const authTokens = cookies.authTokens ? cookies.authTokens : {};

// make into value i bring in as middleware
const authHeaders = {
  'access-token': authTokens['access-token'],
  client: authTokens.client,
  expiry: authTokens.expiry,
  uid: authTokens.uid,
  'token-type': authTokens['token-type'],
};
const reqTypes = await axios.get('http://localhost:3000/types', {
headers: {
...authHeaders,
},
params: {
  language: language.id
}
});
const reqReviewed = await axios.get('http://localhost:3000/review_content', {
  headers: {
    ...authHeaders,
  },
  params: {
    language: language.id
  }
})
try {
  const [resTypes, resReviewed] = await Promise.all([reqTypes, reqReviewed])
  const types = resTypes.data
  console.log(types)
  const reviewed = resReviewed.data
  console.log(reviewed)
  return {
    props: {
      types,
      reviewed,
      language
    },
  };
} catch (error) {
  console.error(error);
  return {
    props: {
      types: [],
      meta: [],
      reviewed: []
    },
  };
}
}