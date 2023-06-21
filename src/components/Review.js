import styles from './styles/Review.module.css'
import { useState } from 'react'
function Review({reviewed}) {
  console.log(reviewed)
  const [selected, setSelected] = useState(null)
    return (
      <div className={styles.container}>
        <ul className = {styles.header}>
          <li>N</li>
          <li>Type</li>
          <li>Title</li>
          <li>Cont.</li>
        </ul>
        <div className={styles.grid_reviews}>
         {selected === null ? reviewed.map((review, index) => {
          return (
            <ul onClick={()=> setSelected(index)} key = {review.id} className={styles.reviews}>
              <li>{review.review_count}</li>
              <li>{review.card_type}</li>
              <li>{review.title}</li>
              <li><button className={styles.listBtn}>
                cont...</button></li>
            </ul>
          )
        }): <div>
          <p onClick={()=> setSelected(null)}>X</p>
          {reviewed[selected].flashcards.map((card, index)=> {
            return (
              <div key={index}>
              <p>{card.front}</p>
              <p>{card.back}</p>
              </div>
              )
          })}
        
        
        </div>
      }
        </div>
      </div>
    );
  }
  
  export default Review;