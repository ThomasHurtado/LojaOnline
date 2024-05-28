import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//layouts
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Message from './layout/Message';

//pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Inicial from './pages/Inicial';

//context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    
    <Router>
      <UserProvider>
        <Message />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Inicial />} />  
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  
  );

}

export default App;
