

import styles from '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import Layout from '../components/Layout'
import { LanguageProvider } from '../context/Language'
function App({ Component, pageProps }) {

  return (
    
    <div className={styles.global}>
        <Layout>
        <LanguageProvider>
          <Component {...pageProps} />
        </LanguageProvider>
        </Layout>
      </div>

  );
}

export default appWithTranslation(App);




