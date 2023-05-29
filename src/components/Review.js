import styles from './styles/Review.module.css'

function Review({reviewed}) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Review</h2>
        <div className={styles.grid_reviews}>
        {reviewed.map((review) => {
          return (
            <div key = {review.id} className={styles.reviews}>
              <p>{review.review_count}</p>
              <p>{review.card_type}</p>
              <p>{review.title}</p>
            </div>
          )
          
        })}
        </div>
      </div>
    );
  }
  
  export default Review;