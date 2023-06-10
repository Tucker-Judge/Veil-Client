
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import times from 'lodash.times'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/index.module.css'
import Image from 'next/image'
function Home() {
  const {t} = useTranslation('common')
  const [showPopup, setShowPopup] = useState(false) //

  useEffect(() => {
    const checkCookies = localStorage.getItem('accept-cookies')
    !checkCookies && setShowPopup(true)
  },[])

  const acceptCookies = () => {
    localStorage.setItem('accept-cookies',true)
    setShowPopup(false)
  }
  return (
    <div className = {styles.container}>
      <Link href="/Signup">
      <button> Sign up! </button>
      </Link>
        <p>{t('title')}</p>
        <p>Hello je suis la</p>

        <div className={styles.flagIntro}>
        <div className={styles.languageFlags}>
          <Image src='/germany.png' alt='germany flag' width={200} height={110}/>
          <Image src='/i speak american how bout u.png' alt='germany flag' width={200} height={110}/>
          <Image src='/Je parle le seul langue de le monde.png' alt='germany flag' width={200} height={110}/>
        </div>
        <div className={styles.languageSpiel}>
            <p>At our platform, we celebrate the diversity of our user base and understand the importance of catering to their unique needs. It is with this in mind that we proudly offer our content in three key global languages - English, French, and German.</p>
        </div>
        </div>
        <div className={styles.sentenceShow}>
          <div className={styles.examples}>
            <p>Coffee Shop</p>
            <p>example sentence</p>
          </div>
          <p>Learn Sentences for general interactions as well as specific</p>
        </div>
        <div className={styles.chatGpt}>
          <div className={styles.chatShowcase}>
            <p>Practice </p>
          </div>
          <div className={styles.chatMessage}>
            <p> Practice with chatGpt speaking on typing ur language. Get the ability to be corrected on sentences that you speak or type.</p>
          </div>
        </div>
        <p>People love Veil</p>
        <p>MILLIONS OF 5-STAR REVIEWS</p>
        {/* <ReviewsCarousel/> */}

       {showPopup && 
        <div className="popup">
        <div className="popup-content">
          <h2>Cookie Consent</h2>
          <p>This website uses necessary cookies to ensure you get the best experience. By continuing to use the site, you agree to our use of cookies.</p>
          <button onClick={acceptCookies}>Accept all Cookies</button>
          <button onClick={acceptCookies}>Necessary Cookies only</button>
          <a href="terms.html" target="_blank">View Terms and Conditions</a>
        </div>
      </div>
        }
        </div>

  )
  }

  
  export default Home  
  export async function getServerSideProps(context) {
    const { req, res } = context;
    const sessionCookie = req.cookies.session;
  
    if (sessionCookie) {
      try {
        const response = await axios.post('http://localhost:3000/sessions/validate', {
          session_cookie: sessionCookie,
        });
  
        if (response.data && response.data.valid) {
          // User is valid
          res.statusCode = 302; // redirection
          res.setHeader('Location', '/home_content'); // redirect to
          res.end(); // complete the redirect
        }
      } catch (error) {
        console.error('Error validating user:', error);
      }
    }
  
    // render the home page normally
    return {
      props: {},
    };
  }

function ReviewsCarousel() {
  const reviews = [
          {
              id: 1,
              name: 'John Doe',
              text: 'This is a great product. I would definitely buy it again.',
          },
          {
              id: 2,
              name: 'Jane Smith',
              text: 'Fantastic service, I am very satisfied.',
          },
          {
              id: 3,
              name: 'Bob Johnson',
              text: 'Quick delivery and friendly customer service.',
          },
          {
              id: 4,
              name: 'Alice Williams',
              text: 'High quality products at a great price.',
          },
          {
              id: 5,
              name: 'Charlie Brown',
              text: 'I love this store! I will definitely be a return customer.',
          },
      ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => {
              if(prevIndex === reviews.length - 1) return 0;
              return prevIndex + 1;
          });
      }, 2000); // adjust this value as needed

      return () => {
          clearInterval(intervalId);
      };
  }, [reviews.length]);

  const updatedReviews = [...reviews.slice(currentIndex, reviews.length), ...reviews.slice(0, currentIndex)];

  return (
      <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div
              style={{
                  display: 'flex',
                  transition: 'transform 1s',
                  transform: `translateX(-${100 / reviews.length}%)`,
              }}
          >
              {updatedReviews.map((review, index) => (
                  <div
                      key={review.id}
                      style={{
                          flex: '0 0 auto',
                          width: `${100 / reviews.length}%`,
                          opacity: index === 0 ? 1 : 0.5,
                          transition: 'opacity 1s',
                      }}
                  >
                      {/* <h3>{review.name}</h3> */}
                      <FontAwesomeIcon key={index} icon={faQuoteLeft} />
                      {/* <FontAwesomeIcon icon={faQuoteRight} /> */}
                      <p>{review.text}</p>
                      <p>{review.name}  |  Excellent  {times(5,(i) => <FontAwesomeIcon key={i} icon={faStar} />)}</p>
                  </div>
              ))}
          </div>
      </div>
  );
}