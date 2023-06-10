// auth
import nextCookies from 'next-cookies'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import styles from './styles/Content.module.css'
// axios
import axios from 'axios';

// react
import { useEffect, useState } from 'react'
import Link from 'next/link'

function Content({ id, types, meta }) {
  const { getAuthHeaders } = useAuth()
  const router = useRouter()
  const [titles, setTitles] = useState([])
  const [selectedCardType, setSelectedCardType] = useState(null)

  useEffect(() => {
    if (selectedCardType) {
      async function fetchData() {
        const headers = getAuthHeaders();
        try {
          const response = await axios.get('http://localhost:3000/titles', {
            headers: headers,
            params: {
              language: id,
              card_type: selectedCardType
            },
          });
          setTitles(response.data.data);
          console.log(response.data.data)
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }
  }, [selectedCardType]);

  async function handleNextPageTitles() {

  }
  async function handleNextPageTypes() {

  }

  return (
    <div className={styles.col}>
      <h2>Content for {id}</h2>
      {titles.length > 0 && (
      <div className={styles.aside}>
          {titles.map((title) => (
            <div key={title.id}>
              <Link href={`/language/study/${title.id}`}>
                <p>{title.title}</p>
              </Link>
            </div>
          ))}
          <p>
            Page {meta.current_page}/{meta.total_pages}
          </p>
          <button onClick={handleNextPageTitles}>Next</button>
          </div>
          )}
      {titles.length === 0 && (
        <div className={styles.aside}>
          {types.map((type) => (
            <div onClick={() => setSelectedCardType(type.card_type)} key={type.id}>
              <p>{type.card_type}</p>
            </div>
          ))}
          <div className={styles.container}>
            <button>Prev</button>
            <p>
              Page {meta.current_page}/{meta.total_type_pages}
            </p>
            <button onClick={handleNextPageTypes}>Next</button>
          </div>
        </div>
      )}
    </div>
  //   <div class="col-3 col-s-12">
  //   <div class="aside">
  //     <h2>What?</h2>
  //     <p>Chania is a city on the island of Crete.</p>
  //     <h2>Where?</h2>
  //     <p>Crete is a Greek island in the Mediterranean Sea.</p>
  //     <h2>How?</h2>
  //     <p>You can reach Chania airport from all over Europe.</p>
  //   </div>
  // </div>
  );
  
}

export default Content;
