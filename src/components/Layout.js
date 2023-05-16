
import Navbar from './Navbar';
import Footer from './Footer';
import useAuth from '../hooks/useAuth'
const Layout = ({ children }) => {
  const { user } = useAuth()
  return (
    <div>
      <Navbar user = {user}/>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
