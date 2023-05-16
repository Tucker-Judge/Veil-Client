import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './Study.module.css';

function Study() {
  const router = useRouter();
  const { studyId } = router.query;
  const [flashcards, setFlashcards] = useState([]);
  const [idx, setIdx] = useState(0);
  const { getAuthHeaders } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false)
  const [truth, setTruth] = useState(false)

  useEffect(() => {
    if (studyId) {
      const fetchData = async () => {
        try {
          const req = await axios.get('http://localhost:3000/flashcards', {
            headers: getAuthHeaders(),
            params: {
              id: studyId
            }
          });
          const cards = req.data.map(card => ({ ...card, frontHidden: false, backHidden: false }));
          setFlashcards(cards);
          console.log(cards);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [studyId]);
  useEffect(() => {
    if(truth === false) {
      const timer = setTimeout(() => {
        CompletionHandler()
      },[3000])
      
      return () => {
        setTruth(true)
        clearTimeout(timer)
      }
    }
    },[])
function CompletionHandler() {
  axios
    .patch(`http://localhost:3000/complete`, null, {
      headers: getAuthHeaders(),
      params: {
        id: studyId
      }
    })
    .then((response) => {
      console.log('FlashcardSet updated:', response.data);
    })
    .catch((error) => {
      console.error('Failed to update FlashcardSet:', error.message);
    });
}

  const toggleCardContent = (index, side) => {
    setFlashcards((prevCards) => {
      return prevCards.map((card, cardIndex) => {
        if (cardIndex === index) {
          return {
            ...card,
            [side]: !card[side],
          };
        } else {
          return card;
        }
      });
    });
  };

  const toggleAll = (side) => {
    setFlashcards((prevCards) => {
      return prevCards.map(card => ({ ...card, [side]: !card[side] }));
    });
  }
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const changeIdx = (type) => {
    let min = idx - 1 < 0
    let plus = idx + 1 >= flashcards.length

    if (type === 'prev' && min){
      setIdx(flashcards.length - 1)
    }
    else if(type === 'next' && plus){
      setIdx(0)
    }
    else if(type === 'prev' && !min){
      setIdx((prev) => prev - 1)
    }
    else if(type === 'next' && !plus){
      setIdx((prev) => prev + 1) 
    }
    if (isFlipped === true) {
      flipCard()
    }
    return
  }
  const goBack = () => {
    router.back()
  }
  return (
    <div>
      <button onClick = {goBack}>X</button>
      {flashcards.length > 0 ? (
        <>
          <div className={styles.cardContainer}>
            <div className={styles.card} onClick={flipCard}>
              <div className={`${styles.cardSide} ${isFlipped ? styles.cardBack : styles.cardFront}`}>
                <h2>{isFlipped ? flashcards[idx].back : flashcards[idx].front}</h2>
                <FontAwesomeIcon icon={faMicrophone} />
              </div>
            </div>
            <button onClick={() => changeIdx('prev')}>Prev</button>
            <button onClick={() => changeIdx('next')}>Next</button>
          </div>
          <div>
            <button onClick={() => toggleAll('frontHidden')}>Toggle All Fronts</button>
            <button onClick={() => toggleAll('backHidden')}>Toggle All Backs</button>
          </div>
          <ul>
            {flashcards.map((flashcard, index) => (
              <li key={flashcard.id}>
                <FontAwesomeIcon icon={faMicrophone} />
                <span className={flashcard.frontHidden ? styles.hidden : ''}>{flashcard.front}</span>
                <button onClick={() => toggleCardContent(index, 'frontHidden')}>
                  <FontAwesomeIcon icon={flashcard.frontHidden ? faEye : faEyeSlash} />
                </button>
                <span className={flashcard.backHidden ? styles.hidden : ''}>{flashcard.back}</span>
                <button onClick={() => toggleCardContent(index, 'backHidden')}>
                  <FontAwesomeIcon icon={flashcard.backHidden ? faEye : faEyeSlash} />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
}

export default Study;
