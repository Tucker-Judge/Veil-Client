import styles from './styles/Review.module.css'
import { useState } from 'react'
function Review({reviewed}) {
  console.log(reviewed)
  const [selected, setSelected] = useState(null)
  console.log(selected)
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Review</h2>
        <div className={styles.grid_reviews}>
         {!selected ? reviewed.map((review, index) => {
          return (
            <div onClick={()=> setSelected(index)} key = {review.id} className={styles.reviews}>
              <p>{review.review_count}</p>
              <p>{review.card_type}</p>
              <p>{review.title}</p>
            </div>
          )
        }): <p onClick={()=> setSelected(null)}>{reviewed[selected].id}</p>
      }
        </div>
      </div>
    );
  }
  
  export default Review;