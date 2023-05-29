

import styles from '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout'
function App({ Component, pageProps }) {

  return (
    
    <div className={styles.global}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </div>


  );
}

export default appWithTranslation(App);




