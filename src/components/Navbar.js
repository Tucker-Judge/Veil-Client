import Link from 'next/link'
import { useTranslation } from 'next-i18next';
import styles from './styles/Navbar.module.css'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import { useState, useEffect } from 'react'
const Navbar = ({user}) => {
  const { t } = useTranslation('navbar')
  const { isLoggedIn,logout, isAdmin} = useAuth()
  console.log(isAdmin)
  useEffect(() => {
    if(sessionStorage.getItem('title')) console.log(sessionStorage.getItem('title'))
    return 
  },[isLoggedIn, logout])
  
  console.log(t)
  
  return (
    <div className={styles.navbar}>
      <div className={styles.nav_logo}>
        <Link href="/">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYctcCNdEo8tPvMXckYVI7kehiKtMd6sBRQ&usqp=CAU"
            alt="Earth-logo"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <div className={styles.nav_name}>
        <h1>{t('title')}</h1>
      </div>
      <div className={styles.nav_courses}>
        <Link href="/languages">
          <p>{t('myLanguages')}</p>
        </Link>
      </div>
      <div className={styles.nav_home}>
        <Link href="/addlanguages">
          <p>{t('newLanguages')}</p>
        </Link>
      </div>
      <div className={styles.login}>
        {isLoggedIn ? (
        <p onClick = {logout}>{t('logout')}</p>) : (
        <Link href="/Login">
          <p>{t('login')}</p>
        </Link>
        )}
      </div>
      <div>
        {isAdmin && isAdmin === true && (
            <Link href="/cms">
              <p>CMS</p>
            </Link>
        )}
      </div>
    </div>
  );
};


export default Navbar;
