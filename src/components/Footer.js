import React from 'react';
import styles from './styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faInstagram } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerSection}>
        <h4>Explore</h4>
        <ul>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/languages">Languages</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Support</h4>
        <ul>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Follow us</h4>
        <a><Image className={styles.whatevaa} src="/Instagram_icon.png" width={30} height={30}/> </a>
        <a href="http://www.facebook.com/yourpage"><Image width={30} height={30} className={styles.footerSectionImages}src="/f_logo_RGB-Blue_58.png" alt="Facebook"/></a>
        <a href="http://www.twitter.com/yourpage"><Image width={30} height={30} className={styles.footerSectionImages} src="/twitterIcon.png" alt="Twitter"/></a>
        <div className={styles.circleCrop}>
            <a href="http://www.instagram.com/yourpage">
                <Image width={45} height={32} className={styles.footerSectionGithubIcon} src="/githubIcon.png" alt="Github"/>
                </a>
        </div>
      </div>
      <div className={styles.footerSection}>
        <h4>Contact</h4>
        <p>Wherevaa</p>
        <p>support@Veil.com</p>
        <p>+1 (447) 363-8345</p>
        {/* secret message
            hiremeVeil

        */}
      </div>
      <div className={styles.copyrightSection}>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
