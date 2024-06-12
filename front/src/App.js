import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useLocation } from 'react-router-dom';


//layouts
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Message from './layout/Message';

//pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Inicial from './pages/Inicial';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import UserMoney from './pages/user/UserMoney';
import CartProducts from './pages/user/CartProducts';

//context
import { UserProvider } from './context/UserContext';
import AddProduct from './pages/product/AddProduct';

function NavbarContainer() {
  const location = useLocation();
  const caminhosExcluidos = ['/', '/register', '/login'];

  return !caminhosExcluidos.includes(location.pathname)? <Navbar /> : null;
}
  
function App() {
  return (
    
    <Router>
      <UserProvider>
        <NavbarContainer />
        <Message />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Inicial />} />  
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/profile/edit" element={<EditProfile />} /> 
          <Route path="/money" element={<UserMoney />} /> 
          <Route path="/product/register" element={<AddProduct />} />
          <Route path="/cart" element={<CartProducts />} /> 

        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  
  );

}

export default App;
