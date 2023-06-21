import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './Study.module.css';

// !!!!!!!!!!!!!!!!!!
// must cache everything - strongly emphasized
// !!!!!!!!!
function Study() {

  const router = useRouter();
  const { studyId } = router.query;

  const [flashcards, setFlashcards] = useState([]);
  const [idx, setIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false)
  const [flashcardsCopy, setFlashcardsCopy] = useState([])
  const [dropCount, setDropCount] = useState(0)
  console.log(flashcards)
  const { getAuthHeaders } = useAuth();

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
          setFlashcardsCopy(cards)
          console.log(cards);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
  }, [studyId]);

const completionHandler = () => {
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
    setFlashcardsCopy((prevCards) => {
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
    // if true is more than false
    let cout = 0
    // debugger
    for(let i = 0; i < flashcardsCopy.length; i++) {
      if(flashcardsCopy[i][side]){
        cout++
      }
      else {
        cout--
      }
    }
    setFlashcardsCopy((prevCards) => {
      // think this code works will check later when on interweb whatever that is
      const leng = flashcardsCopy.length/2
      if (cout === flashcardsCopy.length){
        console.log("mys oul ")
        return prevCards.map(card => ({ ...card, [side]: !card[side] }));
      }
      else if (cout >= leng){
        console.log('this one here officer')
        return prevCards.map(card => ({ ...card, [side]: false}))
      }
      else if (cout < leng){
        console.log('this one here sleep deprivation')
        return prevCards.map(card => ({ ...card, [side]: true
      }))
    }})

  }
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  const changeIdx = (type) => {
    if(flashcards.length === 0){
      return
    }
    console.log('gotcha')
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
  useEffect(()=> {
    // cookie stuff
    setIsFlipped(true)
  },[idx,dropCount, flashcards])
  const goForward = () => {
    console.log('do gods pray or prey?')

  }
  const handleDrop = () => {
    if(flashcards.length === 1 || 0) {
      if(dropCount === 0){
        completionHandler()
      }
      console.log('wha the fuck')
      setIdx(0)
      setDropCount((prev)=> prev + 1)
      setFlashcards(flashcardsCopy)
    }
    else {
      // console.log(JSON.stringify(flashcards.slice(idx)))
      // const flashSnapshot = [...flashcards[idx]]
      const flashSnapshot = JSON.stringify(flashcards)
      console.log(flashSnapshot, 'snapshot stringified')
      const final = JSON.parse(flashSnapshot).splice(idx-1, 1)
      console.log(final, 'final stringified')
      setFlashcards(final)
      console.log(idx, 'current idx')
    }
  }
  // console.log(flashcardsCopy)

  return (

    <div className={styles.container}>
        <div className={styles.topInlined}>
          <button className={styles.backButton} onClick = {goBack}>⇤</button>
          <p>Drop Count: `${dropCount}`</p>
          <button className={styles.forwardButton} onClick = {goForward}>➟</button>
        </div>
      <div className={styles.topHalf}>
        <br/>
        <br/>
        <div className={styles.cardContainer}>
          
          {flashcards.length > 0 ? (
          <div className={styles.card} onClick={flipCard}>

            {isFlipped ? (
            <div className={styles.cardSideFront}>
              <h2>{flashcards[idx].front}</h2>
              {/* <FontAwesomeIcon icon={faMicrophone} /> */}
            </div>
            ): (
              <div className={styles.cardSideBack}>
                <h2>{flashcards[idx].back}</h2>
              </div>
                )
            }
              <div className ={styles.changeIdxBtns}>
                <button onClick={() => changeIdx('prev')}>Pr</button>
                <button onClick={()=> handleDrop()}>Drop</button>
                <button onClick={() => changeIdx('next')}>N</button>
              </div>
            </div>
        ): <p>queue modern warfare quote because the website has died... just kidding refresh or something help me out here</p>
        }
        </div>
      </div>
      <div className={styles.bottomHalf}> 
        <div className={styles.toggles}>
          <FontAwesomeIcon icon={faMicrophone} />
          <button onClick={() => toggleAll('frontHidden')}>Fronts</button>
          <button onClick={() => toggleAll('backHidden')}>Backs</button>
        </div>
          <div className={styles.deprivation}></div>
        {flashcardsCopy.map((flashcard, index) => (
        <ul key={flashcard.id} className={styles.toronto}>

          <li>
            <FontAwesomeIcon className={styles.microphoneee} icon={faMicrophone} />
          </li>

          <li className = {styles.toggleSpan}> 
            <span onClick={() => toggleCardContent(index, 'frontHidden')}><p className={flashcard.frontHidden ? styles.hidden: styles.showing}>{flashcard.front}</p></span>
          </li>
          
          <li>
            <span onClick={() => toggleCardContent(index, 'backHidden')}><p className={flashcard.backHidden ? styles.hidden: styles.showing}>{flashcard.back}</p></span>
          </li>
        
        </ul>
            ))}
      </div>
    </div>
  ) 
}
export default Study;
            