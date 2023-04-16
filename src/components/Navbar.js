import Link from 'next/link'
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const { t } = useTranslation('navbar')
  // console.log(t)
  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link href="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYctcCNdEo8tPvMXckYVI7kehiKtMd6sBRQ&usqp=CAU" />
        </Link>
      </div>
      <div className="nav-name">
        <h1>{t('title')}</h1>
      </div>
      <div className="nav-courses">
        <Link href="/languages">
          <p>{t('myLanguages')}</p>
        </Link>
      </div>
      <div className="nav-home">
        <Link href="/addlanguages">
          <p>{t('newLanguages')}</p>
        </Link>
      </div>
      <div className="login">
        <Link href="/Login">
          <p>{t('login')}</p>
        </Link>
      </div>
    </div>
  );
};


export default Navbar;
