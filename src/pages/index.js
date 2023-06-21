
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
  const {t} = useTranslation('index')
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
    // cant wait for tailwind life ripssss
    <div className={styles.adsContainer}>
      <div style={{ margin: "0", left: 0, width: "13vw", top: 0, bottom: 0, position: 'relative', backgroundColor: "white"}}><Image style={{width: "13vw"}} width="150" height="400" src = "/advertisement.jpeg"/></div>
    
      <div className = {styles.container}>
      {/* below fixes a bug im not questioning it rn */}
      {/* bug fixed yaatta */}
      {/* <br/> */}
      <div style={{margin: "0px"}}>

        <div className={styles.signupContainer}>
          <div className={styles.signupImage1}><Image src={"/leonardo-toshiro-okubo-jBSTNenQxok-unsplash.jpg"} height={100} width={100}/></div>
      <div className = {styles.signup}>
      <Image src={"/leonardo-toshiro-okubo-jBSTNenQxok-unsplash.jpg"} height={100} width={100}/>
        <p>Have a desire to travel or get closer to your culture? </p>
        <p>Maybe get even better at karaoke with some extra lungs practice trying to speak French Have a desire to travel? Start a language new or old and discover a whole new world</p>
        <p>Bon courage!</p>
        <p className={styles.lastChild}>↯</p>
          <div className={styles.signupButton}>
            <Link href="/Signup">
              <button className={styles.button}> Learn now </button>
            </Link>
          </div>
      </div>
      <div className={styles.signupImage}><Image src={"/leonardo-toshiro-okubo-jBSTNenQxok-unsplash.jpg"} height={100} width={100}/></div>
        </div>
      </div>

        <div className={styles.flagIntro}>
        <div className={styles.flagContainer}>

        <h1>The Veil Method</h1>
        <h3>Our Method...</h3>
        <div className={styles.flagIntroSecond}>
          <div>
          <Image src='/germany.png' alt='germany flag' width={200} height={100}/>
              <h2 className={styles.imageH}>Explore a new language</h2>
            <p>
              Learn everything you need to have real world conversations - from vocab words to culture. 10 minutes a day is all it takes.
            </p>
            <p>this willl be an image</p>
          </div>
          <div>
          <Image src='/Je parle le seul langue de le monde.png' alt='germany flag' width={200} height={110}/>
          <h2 className={styles.imageH}>Flexible lesson plans</h2>
            <p>blah blah blah blah</p>
            <p>this willl be an image</p>
          </div>
          <div>
          <Image src='/i speak american how bout u.png' alt='germany flag' width={200} height={75}/>
          <h2 className={styles.imageH}>More ways to learn</h2>
            <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
            <p>this willl be an image</p>
          </div>
        </div>
        </div>
        </div>
        <div className={styles.carousel}>
          <h1>People love Veil</h1>
          <h3>t("MILLIONS OF 5-STAR REVIEWS")</h3>
          <ReviewsCarousel/>
        </div>

       {showPopup && 
        <div className={styles.popupContent}>
          <h2>Cookie Consent</h2>
          <p>This website uses necessary cookies to ensure you get the best experience. By continuing to use the site, you agree to our use of cookies.</p>
          <button onClick={acceptCookies}>Accept all Cookies</button>
          <button onClick={acceptCookies}>Necessary Cookies only</button>
          <a href="terms.html" target="_blank">View Terms and Conditions</a>
        </div>
        }
        </div>
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
          const slideInterval = setInterval(updateIndex, 2000);
          return () => clearInterval(slideInterval);
        }, [reviews.length]);
      
        function updateIndex() {
          setCurrentIndex((prevIndex) => {
            const isLastReview = prevIndex === reviews.length - 1;
            return isLastReview ? 0 : prevIndex + 1;
          });
        }
      
        const updatedReviews = [
          ...reviews.slice(currentIndex, reviews.length),
          ...reviews.slice(0, currentIndex),
        ];
      
        return (
          <div className={styles.carouselContainer}>
            <div className={styles.updatedReviews}>
              {updatedReviews.map((review, index) => (
                <ReviewCard review={review} index={index} currentIndex={currentIndex} key={review.id} />
              ))}
            </div>
          </div>
        );
      }
      
      function ReviewCard({ review }) {
        return (
          <div className={styles.whatevaa}>
            <FontAwesomeIcon className={styles.carouselFontIcon} icon={faQuoteLeft} />
            <p className={styles.text}>{review.text} </p>
            <span>
            <p>{review.name}</p> 
            <p className = {styles.stars}>_| Excellent {times(5,(i) => <FontAwesomeIcon key={i} icon={faStar} />)}</p>
            </span>
          </div>
        );
      }
      